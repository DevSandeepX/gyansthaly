"use client"

import { Pagination } from "@/modules/students/ui/components/Pagination"

interface Result {
    rollNumber: string
    exam: string
    grade: string,
    totalQuestions: number
    percentage: number
    result: string
    correct: number
}

export default function ResultsPage({ results, hasNextPage }: { results: Result[], hasNextPage: boolean }) {
    return (
        <>

            <div className="py-6">
                <div className="bg-white shadow-md rounded-xl border overflow-hidden">

                    <div className="px-6 py-4 border-b bg-gray-50">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Exam Results
                        </h2>
                        <p className="text-sm text-gray-500">
                            Students performance summary
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">

                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="p-4 text-left font-semibold">Roll No / Name</th>
                                    <th className="p-4 text-left font-semibold">Exam</th>
                                    <th className="p-4 text-center font-semibold">Correct</th>
                                    <th className="p-4 text-center font-semibold">Total</th>
                                    <th className="p-4 text-center font-semibold">Percentage</th>
                                    <th className="p-4 text-center font-semibold">Grade</th>
                                    <th className="p-4 text-center font-semibold">Result</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">

                                {results.map((r, i) => {

                                    const pass = r.result === "PASS"

                                    return (
                                        <tr
                                            key={i}
                                            className="hover:bg-gray-50 transition"
                                        >

                                            <td className="p-4 font-medium text-gray-800">
                                                {r.rollNumber}
                                            </td>

                                            <td className="p-4 text-gray-600">
                                                {r.exam}
                                            </td>

                                            <td className="p-4 text-center font-medium">
                                                {r.correct}
                                            </td>

                                            <td className="p-4 text-center text-gray-600">
                                                {r.totalQuestions}
                                            </td>

                                            <td className="p-4 text-center">
                                                <span className="font-semibold text-blue-600">
                                                    {r.percentage.toFixed(2)}%
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="font-semibold text-blue-600">
                                                    {r.grade}
                                                </span>
                                            </td>

                                            <td className="p-4 text-center">

                                                <span
                                                    className={`px-3 py-1 text-xs font-semibold rounded-full
                        ${pass
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {r.result}
                                                </span>

                                            </td>

                                        </tr>
                                    )
                                })}

                            </tbody>

                        </table>
                    </div>

                </div>
            </div>
            <Pagination hasNextPage={hasNextPage} />

        </>
    )
}