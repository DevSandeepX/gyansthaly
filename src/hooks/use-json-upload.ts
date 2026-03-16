import { useState } from "react";

export function useJsonUpload<T>() {
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<T | null>(null)

    function handleFile(file: File) {

        if (!file.name.endsWith(".json")) {
            setError("Only JSON files are allowed")
            return
        }

        const reader = new FileReader()

        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string)

                if (!Array.isArray(json)) {
                    setError("JSON must be an array")
                    return
                }

                setData(json as T)
                setError(null)

            } catch {
                setError("Invalid JSON file")
            }
        }

        reader.readAsText(file)
    }

    return {
        data,
        error,
        handleFile
    }
}