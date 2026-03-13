"use client"

import { actionToast } from "@/lib/action-toast"
import { useState } from "react"
import { createQuestionsBulk } from "../../server"

interface QuestionFileUploaderProps {
    exams: {
        duration: number
        id: string
        name: string
        totalQuestions: number
    }[]
}

export default function QuestionFileUploader({ exams }: QuestionFileUploaderProps) {

    const [selectedExam, setSelectedExam] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)
    const [questions, setQuestions] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]

        if (!selectedFile) return

        setFile(selectedFile)

        const reader = new FileReader()

        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string)
                setQuestions(json)
            } catch (error) {
                alert("Invalid JSON file")
            }
        }

        reader.readAsText(selectedFile)
    }

    const handleUpload = async () => {
        setLoading(true)
        if (!selectedExam) {
            alert("Please select exam")
            return
        }

        if (questions.length === 0) {
            alert("No questions found")
            return
        }

        console.log("Exam ID:", selectedExam)
        console.log("Questions:", questions)

        // TODO: call server action / API
        const res = await createQuestionsBulk(selectedExam, questions)
        setLoading(false)
        actionToast({ ...res })
    }

    return (
        <div className="max-w-lg p-6 border rounded-lg space-y-4">

            <h2 className="text-xl font-semibold">
                Upload Questions JSON
            </h2>

            {/* Exam Dropdown */}
            <div>
                <label className="block mb-1">Select Exam</label>
                <select
                    className="w-full border p-2 rounded"
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                >
                    <option value="">Select Exam</option>

                    {exams.map((exam) => (
                        <option key={exam.id} value={exam.id}>
                            {exam.name} ({exam.totalQuestions} questions)
                        </option>
                    ))}
                </select>
            </div>

            {/* File Upload */}
            <div>
                <label className="block mb-1">Upload JSON File</label>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    className="w-full"
                />
            </div>

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Upload Questions
            </button>

            {/* Preview */}
            {questions.length > 0 && (
                <div className="text-sm bg-gray-100 p-3 rounded">
                    <p>Questions Loaded: {questions.length}</p>
                </div>
            )}

        </div>
    )
}