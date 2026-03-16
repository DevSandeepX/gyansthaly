"use client"

import { usePagination } from "@/hooks/use-pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Exam {
    id: string;
    name: string;
}

export function ExamDropdown({ exams }: { exams: Exam[] }) {
    const searchParams = useSearchParams()
    const [selectedExam, setSelectedExam] = useState(searchParams.get("examId") ?? exams[0]?.id);
    const router = useRouter()
    const pathname = usePathname()
    const { setPage } = usePagination()


    function onDropdownChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedExam(e.target.value);

    }

    function updateParams(key: string, value: string) {
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })

    }

    useEffect(() => {
        updateParams("examId", selectedExam)
        setPage(1)
    }, [selectedExam])

    return (
        <div className="max-w-md w-full mt-4">

            <select
                value={selectedExam}
                onChange={onDropdownChange}
                className="border p-2 rounded w-full"
            >
                {exams.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                        {exam.name}
                    </option>

                ))}
            </select>
        </div>
    );
}

export function QuestionFileUploaderSkeleton() {
    return (
        <div className="max-w-lg p-6 border rounded-lg space-y-4 animate-pulse">

            {/* Title */}
            <div className="h-6 w-48 bg-gray-200 rounded"></div>

            {/* File label */}
            <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>

                {/* File input */}
                <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>

            {/* Button */}
            <div className="h-10 w-full bg-gray-200 rounded"></div>

            {/* Preview box */}
            <div className="h-12 w-full bg-gray-200 rounded"></div>

        </div>
    )
}