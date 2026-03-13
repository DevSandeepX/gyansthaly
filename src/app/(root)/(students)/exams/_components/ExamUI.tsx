"use client"

import { useEffect, useState } from "react"

interface Option {
    id: string
    text: string
}

interface Question {
    id: string
    text: string
    options: Option[]
}

export default function ExamUI({
    examId,
    studentId,
    duration,
    limit
}: {
    examId: string
    studentId: string,
    duration: number,
    limit: number
}) {

    const [questions, setQuestions] = useState<Question[]>([])
    const [current, setCurrent] = useState(0)
    const [loading, setLoading] = useState(false)

    // questionId -> optionId
    const [answers, setAnswers] = useState<Record<string, string>>({})

    const [timeLeft, setTimeLeft] = useState(duration * 60)

    useEffect(() => {
        loadQuestions()
    }, [])

    const loadQuestions = async () => {
        try {

            setLoading(true)
            const res = await fetch(`/api/questions?examId=${examId}&limit=${limit}`)
            const data = await res.json()
            setQuestions(data.questions)
            if (!res.ok) {
                alert("Something went wrong when trying to load questions.")
            }
        } finally {
            setLoading(false)
        }


    }

    // timer
    useEffect(() => {

        const timer = setInterval(() => {

            setTimeLeft((prev) => {

                if (prev <= 1) {
                    clearInterval(timer)
                    handleSubmit()
                    return 0
                }

                return prev - 1
            })

        }, 1000)

        return () => clearInterval(timer)

    }, [])

    const selectOption = (optionId: string) => {

        const questionId = questions[current].id

        setAnswers({
            ...answers,
            [questionId]: optionId
        })

    }

    const next = () => {
        if (current < questions.length - 1) {
            setCurrent(current + 1)
        }
    }

    const prev = () => {
        if (current > 0) {
            setCurrent(current - 1)
        }
    }

    const handleSubmit = async () => {

        await fetch("/api/exam/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                examId,
                userId: studentId,
                answers
            })
        })

        alert("Exam submitted")

        window.location.href = "/results"

    }

    if (loading) {
        return (
            <LoadingState />
        )
    }
    if (!questions.length && !loading) {
        return (
            <NoQuestionState />
        )
    }

    const q = questions[current]

    return (

        <div className="max-w-5xl mx-auto p-6">

            {/* Header */}

            <div className="flex justify-between mb-6">

                <h2 className="text-xl font-bold">
                    Question {current + 1} / {questions.length}
                </h2>

                <div className="text-red-600 font-semibold">
                    Time Left: {Math.floor(timeLeft / 60)}:
                    {(timeLeft % 60).toString().padStart(2, "0")}
                </div>

            </div>

            {/* Question */}

            <div className="border p-6 rounded mb-6">

                <h3 className="text-lg font-medium mb-4">
                    {q.text}
                </h3>

                <div className="space-y-3">

                    {q.options.map((opt) => (

                        <label
                            key={opt.id}
                            className="flex items-center gap-3 border p-3 rounded cursor-pointer"
                        >

                            <input
                                type="radio"
                                checked={answers[q.id] === opt.id}
                                onChange={() => selectOption(opt.id)}
                            />

                            {opt.text}

                        </label>

                    ))}

                </div>

            </div>

            {/* Navigation */}

            <div className="flex justify-between">

                <button
                    onClick={prev}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                    Previous
                </button>

                <button
                    onClick={next}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Next
                </button>

                <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>

            </div>

            {/* Question Navigator */}

            <div className="grid grid-cols-10 gap-2 mt-10">

                {questions.map((q, i) => (

                    <button
                        key={q.id}
                        onClick={() => setCurrent(i)}
                        className={`p-2 rounded text-sm
              ${answers[q.id]
                                ? "bg-green-500 text-white"
                                : "bg-gray-300"}
            `}
                    >
                        {i + 1}
                    </button>

                ))}

            </div>

        </div>
    )
}


function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 animate-pulse">
                Loading questions...
            </p>
        </div>
    )

}

function NoQuestionState() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-fadeIn">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-xl font-semibold text-gray-700">
                No Questions Found
            </h2>
            <p className="text-gray-500 mt-2">
                This exam does not have any questions yet.
            </p>
        </div>
    )
}