import { db } from "@/db"
import { exams, options, userExam } from "@/db/schema"
import ResultsPage from "../../_components/ExamResult"
import { Suspense } from "react"
import { ExamDropdown } from "@/modules/exams/ui/components/ExamDropdown"
import { eq } from "drizzle-orm"
import { TableSkeleton } from "@/components/skeleton/TableSkeleton"
import { RESULT_LIMIT } from "@/settings"

export default async function Page({ searchParams }: {
    searchParams: Promise<{ examId: string, page: string }>
}) {

    const { examId, page } = await searchParams

    return (
        <div>
            <Suspense fallback={<TableSkeleton rows={1} cols={1} />}>
                <SuspendedExamDropdown />
            </Suspense>
            <Suspense fallback={<TableSkeleton rows={5} cols={5} />}>
                <SuspendedResultTabe examId={examId} page={page} />
            </Suspense>
        </div>
    )
}


async function SuspendedResultTabe({ examId, page }: {
    examId: string,
    page: string,
    // TODO: Fetch all attempts with user
    // fetch all options by users answers
    // check if options.isCorrect is true 
}) {
    const { attempts, hasNextPage } = await getExamAttempts({ examId, page })
    const results = await Promise.all(attempts.map(async (attempt) => {
        return calculateResult({ attempt })
    }))

    return (
        <ResultsPage results={results} hasNextPage={hasNextPage} />
    )
}

async function getExamAttempts({ examId, page }: {
    examId: string,
    page: string
}) {
    const currentPage = Number(page) || 1

    const res = await db.query.userExam.findMany({
        limit: RESULT_LIMIT,
        offset: (currentPage - 1) * RESULT_LIMIT,
        where: examId ? eq(userExam.examId, examId) : undefined,
        columns: { answers: true, id: true },
        with: {
            user: {
                columns: { id: true, rollNumber: true }
            },
            exam: {
                columns: { id: true, name: true, totalQuestions: true }
            }
        }
    })

    const hasNextPage = res.length === RESULT_LIMIT

    return {
        attempts: res,
        hasNextPage
    }
}

async function calculateResult({ attempt }: {
    attempt: {
        id: string
        answers: Record<string, string>
        user: { id: string; rollNumber: string }
        exam: { id: string; name: string; totalQuestions: number }
    }
}) {
    const optionIds = Object.values(attempt.answers)
    const correctOptionIds = await db.query.options.findMany({
        where: (options, { inArray, and, eq }) => (
            and(
                inArray(options.id, optionIds),
                eq(options.isCorrect, true)
            )
        ),
        columns: { id: true }
    })

    const percentage = (correctOptionIds.length / attempt.exam.totalQuestions) * 100 || 0
    let grade = "F"

    if (percentage >= 85) grade = "S"
    else if (percentage >= 75) grade = "A"
    else if (percentage >= 65) grade = "B"
    else if (percentage >= 55) grade = "C"
    else if (percentage >= 50) grade = "D"

    return {
        rollNumber: attempt.user.rollNumber,
        exam: attempt.exam.name,
        totalQuestions: attempt.exam.totalQuestions,
        percentage,
        grade,
        result: percentage >= 50 ? "PASS" : "FAIL",
        correct: correctOptionIds.length
    }

}

async function SuspendedExamDropdown() {
    const allExams = await db.select({
        id: exams.id,
        name: exams.name
    }).from(exams)
    return (
        <ExamDropdown exams={allExams} />
    )
}