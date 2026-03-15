import { Pagination } from "@/modules/students/ui/components/Pagination"

export function QuestionsList({
    questions,
    hasNextPage
}: {
    questions: { id: string, text: string }[],
    hasNextPage: boolean
}) {

    return (
        <div className="w-full space-y-6">

            <div className="bg-white border rounded-xl shadow-sm divide-y">
                {questions.length ? (
                    questions.map((q, i) => (
                        <div
                            key={q.id}
                            className="flex items-start gap-4 p-5 hover:bg-gray-50 transition"
                        >
                            <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-white bg-blue-600 rounded-full">
                                {i + 1}
                            </div>

                            <p className="text-gray-800 leading-relaxed">
                                {q.text}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        No Questions Found
                    </div>
                )}
            </div>

            <Pagination hasNextPage={hasNextPage} />

        </div>
    )
}


export function QuestionsListSkeleton() {
    return (
        <div className="w-full space-y-6">

            <div className="bg-white border rounded-xl shadow-sm divide-y">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 animate-pulse">

                        <div className="w-8 h-8 rounded-full bg-gray-200" />

                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-4 bg-gray-200 rounded w-1/2" />
                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
}