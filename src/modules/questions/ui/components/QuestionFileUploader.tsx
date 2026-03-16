"use client"

import { actionToast } from "@/lib/action-toast"
import { useState } from "react"
import { createQuestionsBulk } from "../../server"
import { Button } from "@/components/ui/button"
import { useJsonUpload } from "@/hooks/use-json-upload"


interface Question {
    text: string,
    options: { text: string, isCorrect: boolean }[]
}


export default function QuestionFileUploader({ examId }: { examId: string }) {

    const { data, error, handleFile } = useJsonUpload<Question[]>()

    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    const handleUpload = async () => {

        if (!examId) {
            actionToast({
                success: false,
                message: "Exam not selected"
            })
            return
        }

        if (!data || data.length === 0) {
            actionToast({
                success: false,
                message: "No questions found"
            })
            return
        }

        setLoading(true)

        try {

            const res = await createQuestionsBulk(examId, data)

            actionToast({ ...res })

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-lg p-6 border rounded-lg space-y-4 bg-white">

            <h2 className="text-xl font-semibold">
                Upload Questions JSON
            </h2>

            {/* Upload */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Upload JSON File
                </label>

                <input
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                            handleFile(file)
                            setFile(file)
                        }
                    }}
                    className="w-full border rounded p-2"
                />
            </div>

            {/* Error */}
            {error && (
                <p className="text-red-500 text-sm">
                    {error}
                </p>
            )}

            {/* Upload Button */}
            <Button
                onClick={handleUpload}
                disabled={loading || !file || !examId}
                className="w-full"
            >
                {loading ? "Uploading..." : "Upload Questions"}
            </Button>

            {/* Preview */}
            {data && (
                <div className="text-sm bg-gray-100 p-3 rounded">
                    Questions Loaded: {data.length}
                </div>
            )}

        </div>
    )
}