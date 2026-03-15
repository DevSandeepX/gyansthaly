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
        <div className="max-w-md mt-4">

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