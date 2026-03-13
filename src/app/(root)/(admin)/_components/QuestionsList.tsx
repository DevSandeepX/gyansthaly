"use client"

import InfiniteScroll from "@/components/InfiniteScroll"
import { QUESTIONS_LIMIT } from "@/settings"
import { useEffect, useState, useCallback } from "react"

interface Question {
    id: string
    text: string
}

interface Exam {
    id: string
    name: string
}

export default function QuestionsList() {

    const [questions, setQuestions] = useState<Question[]>([])
    const [exams, setExams] = useState<Exam[]>([])
    const [selectedExam, setSelectedExam] = useState<string | null>(null)

    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(true)
    const [loading, setLoading] = useState(false)

    // Fetch exams
    async function fetchExams() {
        try {
            const res = await fetch("/api/exam")
            const data = await res.json()

            setExams(data)

            if (data.length > 0) {
                setSelectedExam(data[0].id)
            }
        } catch (err) {
            console.log("Error fetching exams:", err)
        }
    }

    // Load questions
    const loadMore = useCallback(async () => {

        if (!selectedExam || loading || !hasNextPage) return

        try {
            setLoading(true)

            const res = await fetch(
                `/api/questions?examId=${selectedExam}&page=${page}&limit=${QUESTIONS_LIMIT}`
            )

            const data = await res.json()

            setQuestions((prev) => [...prev, ...data.questions])
            setHasNextPage(data.hasNextPage)

            setPage((prev) => prev + 1)

        } catch (err) {
            console.log("Error:", err)
        } finally {
            setLoading(false)
        }

    }, [selectedExam, page, hasNextPage, loading])

    // Fetch exams on mount
    useEffect(() => {
        fetchExams()
    }, [])

    // Reset when exam changes
    useEffect(() => {

        if (!selectedExam) return

        setQuestions([])
        setPage(1)
        setHasNextPage(true)

    }, [selectedExam])

    // Load first page after reset
    useEffect(() => {

        if (!selectedExam) return
        loadMore()

    }, [selectedExam])

    return (
        <div className="space-y-6">

            {/* Exam Dropdown */}
            <select
                value={selectedExam ?? ""}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="border p-2 rounded"
            >
                {exams.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                        {exam.name}
                    </option>
                ))}
            </select>

            {/* Questions */}
            <div className="space-y-4">
                {questions.map((q) => (
                    <div key={q.id} className="p-3 border rounded">
                        {q.text}
                    </div>
                ))}
            </div>

            {/* Infinite Scroll */}
            <InfiniteScroll
                hasNextPage={hasNextPage}
                loadMore={loadMore}
                loading={loading}
                isManual={true}
            />

        </div>
    )
}