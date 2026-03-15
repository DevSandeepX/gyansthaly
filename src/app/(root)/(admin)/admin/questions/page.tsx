import { db } from "@/db";
import { exams, questions } from "@/db/schema";
import { ExamDropdown } from "@/modules/exams/ui/components/ExamDropdown";
import { QUESTIONS_LIMIT } from "@/settings";
import { eq } from "drizzle-orm";
import { Suspense } from "react";
import { QuestionsList, QuestionsListSkeleton } from "../../_components/QuestionsList";

export default async function Questions({ searchParams }: {
    searchParams: Promise<{ page: string, examId: string, search: string }>
}) {

    const { examId, page, search } = await searchParams
    return (
        <div className="space-y-6">
            <Suspense fallback={<DropdownSkeleton />}>
                <SuspendedExamDropdown />
            </Suspense>
            <Suspense fallback={<QuestionsListSkeleton />}>
                <SuspendedQuestions
                    examId={examId}
                    search={search}
                    page={page}

                />
            </Suspense>
        </div>
    )
}


async function SuspendedQuestions({ examId, search, page }: {
    examId: string,
    search: string,
    page: string
}) {
    const data = await getExamQuestions({ examId, search, page })
    return (
        <QuestionsList
            questions={data.questions}
            hasNextPage={data.hasNextPage}
        />
    )
}



async function getExamQuestions({ examId, search, page }: {
    examId: string,
    search: string,
    page: string
}) {
    const res = await db.query.questions.findMany({
        where: examId ? eq(questions.examId, examId) : undefined,
        limit: QUESTIONS_LIMIT,
        offset: (Number(page) - 1) * QUESTIONS_LIMIT,

        columns: { id: true, text: true }
    })

    return {
        questions: res,
        hasNextPage: res.length === QUESTIONS_LIMIT,
    }
}

async function SuspendedExamDropdown() {
    const allExams = await db.query.exams.findMany({
        columns: { id: true, name: true }
    })
    return (
        <ExamDropdown exams={allExams} />
    )
}

export function DropdownSkeleton() {
    return (
        <div className="w-[220px] h-10 rounded-md border bg-gray-100 animate-pulse flex items-center justify-between px-3">

            <div className="h-4 w-24 bg-gray-200 rounded" />

            <div className="h-4 w-4 bg-gray-200 rounded" />

        </div>
    )
}