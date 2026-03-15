import { Suspense } from "react";
import { DashboardInfoCard, DashboardInfoCardSkeleton } from "../_components/DashboardInfoCard";
import { db } from "@/db";
import { and, count, desc, eq, inArray } from "drizzle-orm";
import { exams, options, questions, userExam, users } from "@/db/schema";
import { BarChart, FileText, HelpCircle, User2Icon, Users } from "lucide-react";
import PopularExamList, { PopularExamsSkeleton } from "../_components/PopularExamList";
import TopStudents, { TopStudentsSkeleton } from "../_components/TopStudents";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<DashboardInfoCardSkeleton />}>
                    <SuspendedUserInfo />
                </Suspense>
                <Suspense fallback={<DashboardInfoCardSkeleton />}>
                    <SuspendedExamInfo />
                </Suspense>
                <Suspense fallback={<DashboardInfoCardSkeleton />}>
                    <SuspendedQuestionInfo />
                </Suspense>
                <Suspense fallback={<DashboardInfoCardSkeleton />}>
                    <SuspendedAttemptInfo />
                </Suspense>
            </div>

            <div className="space-y-8">
                <Suspense fallback={<PopularExamsSkeleton />}>
                    <SuspendedPopularExams />
                </Suspense>
            </div>
            <div className="space-y-8">
                <Suspense fallback={<TopStudentsSkeleton />}>
                    <SuspendedTopStudents />
                </Suspense>
            </div>
        </div >
    )
}



async function SuspendedPopularExams() {
    const popularExams = await getPopularExams()
    return (
        <PopularExamList
            exams={popularExams}
        />
    )
}

async function SuspendedTopStudents() {

    const attempts = await getUserAttempts()
    const studentsResults = await Promise.all(
        attempts.map((attempt) => {
            return calculatePercentage(attempt)
        })
    )

    const topStudents = studentsResults.sort((a, b) => b.percentage - a.percentage).slice(0, 5)
    return (
        <TopStudents
            results={topStudents}
        />
    )
}



async function SuspendedUserInfo() {
    const userCount = await db.select({ count: count() }).from(users)

    return (
        <DashboardInfoCard
            title="Total Users"
            value={userCount[0].count}
            icon={<Users className="h-5 w-5 text-muted-foreground" />}

        />
    )
}

async function SuspendedExamInfo() {
    const examCount = await db.select({ count: count() }).from(exams)
    return (
        <DashboardInfoCard
            title="Total Exams"
            value={examCount[0].count}
            icon={<FileText className="h-5 w-5 text-muted-foreground" />}

        />
    )
}

async function SuspendedQuestionInfo() {
    const questionCount = await db.select({ count: count() }).from(questions)
    return (
        <DashboardInfoCard
            title="Total Questions"
            value={questionCount[0].count}
            icon={< HelpCircle className="h-5 w-5 text-muted-foreground" />}
        />
    )
}

async function SuspendedAttemptInfo() {
    const attemptCount = await db.select({ count: count() }).from(userExam)
    return (
        <DashboardInfoCard
            title="Total Attempts"
            value={attemptCount[0].count}
            icon={<BarChart className="h-5 w-5 text-muted-foreground" />}
        />
    )
}

async function calculatePercentage(attempt: {
    id: string;
    answers: Record<string, string>;
    user: {
        rollNumber: string;
    };
    exam: {
        name: string;
        totalQuestions: number;
    };
}) {

    const optionIds = Object.values(attempt.answers)
    const correctCount = await getCorrectCount(optionIds)
    const percentage = Math.round((correctCount / attempt.exam.totalQuestions) * 100)

    return {
        exam: attempt.exam.name,
        student: attempt.user.rollNumber,
        percentage,
        correct: correctCount,
        total: attempt.exam.totalQuestions
    }
}


async function getCorrectCount(optionIds: string[]) {
    const result = await db
        .select({ correct: count() })
        .from(options)
        .where(
            and(
                inArray(options.id, optionIds),
                eq(options.isCorrect, true)
            )
        )

    return result[0].correct
}
async function getUserAttempts() {
    return db.query.userExam.findMany({
        orderBy: desc(userExam.createdAt),
        with: {
            exam: true,
            user: true
        }
    })
}

async function getPopularExams() {
    return db
        .select({
            id: exams.id,
            name: exams.name,
            attempts: count(userExam.id)
        })
        .from(exams)
        .leftJoin(userExam, eq(exams.id, userExam.examId))
        .groupBy(exams.id)
        .orderBy(desc(count(userExam.id)))
        .limit(5)
}
