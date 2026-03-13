"use client"

import { useEffect, useState } from "react"

interface Exam {
    id: string
    name: string
}

interface Result {
    name: string
    score: number
    total: number
}

export default function ResultsPage({ exams }: { exams: Exam[] }) {

    const [selectedExam, setSelectedExam] = useState<string | null>(null)
    const [results, setResults] = useState<Result[]>([])
    const [loading, setLoading] = useState(false)

    // default first exam
    useEffect(() => {
        if (exams.length > 0) {
            setSelectedExam(exams[0].id)
        }
    }, [exams])

    // fetch results
    useEffect(() => {
        if (!selectedExam) return
        fetchResults(selectedExam)
    }, [selectedExam])

    const fetchResults = async (examId: string) => {

        setLoading(true)

        const res = await fetch("/api/exam/results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ examId })
        })

        const data = await res.json()
        console.log(data)

        if (data.success) {
            setResults(data.results)
        }

        setLoading(false)
    }



    return (
        <div className="p-6 space-y-6">

            <h1 className="text-2xl font-bold">
                Exam Results
            </h1>

            {/* Exam Select */}

            <select
                className="border p-2 rounded"
                value={selectedExam ?? ""}
                onChange={(e) => setSelectedExam(e.target.value)}
            >

                {exams.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                        {exam.name}
                    </option>
                ))}

            </select>

            {/* Results Table */}

            {loading ? (
                <p>Loading...</p>
            ) : (

                <div className="border rounded-lg overflow-hidden">

                    <table className="w-full text-sm">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Student</th>
                                <th className="p-3 text-left">Score</th>
                                <th className="p-3 text-left">Total</th>
                                <th className="p-3 text-left">Percentage</th>
                                <th className="p-3 text-left">Result</th>
                            </tr>
                        </thead>

                        <tbody>

                            {results.map((r, i) => {

                                const percent = ((r.score / r.total) * 100).toFixed(2)
                                const pass = Number(percent) >= 40

                                return (
                                    <tr key={i} className="border-t">

                                        <td className="p-3">
                                            {r.name}
                                        </td>

                                        <td className="p-3">
                                            {r.score}
                                        </td>

                                        <td className="p-3">
                                            {r.total}
                                        </td>

                                        <td className="p-3">
                                            {percent}%
                                        </td>

                                        <td className="p-3">

                                            <span
                                                className={`px-2 py-1 rounded text-white text-xs ${pass ? "bg-green-600" : "bg-red-600"
                                                    }`}
                                            >
                                                {pass ? "PASS" : "FAIL"}
                                            </span>

                                        </td>

                                    </tr>
                                )
                            })}

                        </tbody>

                    </table>

                </div>
            )}

        </div>
    )
}