"use client"

import { Button } from "@/components/ui/button"
import { useJsonUpload } from "@/hooks/use-json-upload"
import { Dispatch, SetStateAction, useState } from "react"
import { uploadStudentsInBulk } from "../../server"
import { actionToast } from "@/lib/action-toast"

interface User {
    rollNumber: string
}

export default function StudentBulkUploader({
    setBulkOpen,
}: {
    setBulkOpen: Dispatch<SetStateAction<boolean>>
}) {
    const { data, error, handleFile } = useJsonUpload<User[]>()

    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    async function onSubmit() {
        if (!file) {
            actionToast({
                success: false,
                message: "Please upload a JSON file",
            })
            return
        }

        if (!data || data.length === 0) {
            actionToast({
                success: false,
                message: "Invalid or empty JSON data",
            })
            return
        }

        setLoading(true)

        try {
            const res = await uploadStudentsInBulk(data)
            actionToast(res)

            if (res.success) {
                setBulkOpen(false)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full space-y-4">

            <div className="space-y-2">
                <input
                    type="file"
                    accept=".json"
                    className="w-full border rounded-md p-2 text-sm"
                    onChange={(e) => {
                        const file = e.target.files?.[0] || null
                        setFile(file)
                        if (file) handleFile(file)
                    }}
                />

                {error && (
                    <p className="text-sm text-red-500">
                        {error}
                    </p>
                )}
            </div>

            <Button
                onClick={onSubmit}
                disabled={loading}
                className="w-full"
            >
                {loading ? "Uploading..." : "Upload Students"}
            </Button>

        </div>
    )
}