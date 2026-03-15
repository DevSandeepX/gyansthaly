"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"

interface Result {
    exam: string
    student: string
    percentage: number
    correct: number
    total: number
}

export default function TopStudents({ results }: { results: Result[] }) {
    return (
        <Card className="border shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="text-yellow-500" size={20} />
                    Top Students
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                {results.map((r, index) => {

                    const colors = [
                        "bg-yellow-50 border-yellow-200",
                        "bg-gray-50 border-gray-200",
                        "bg-orange-50 border-orange-200",
                        "bg-blue-50 border-blue-200",
                        "bg-green-50 border-green-200"
                    ]

                    return (
                        <div
                            key={index}
                            className={`p-4 rounded-xl border flex items-center justify-between ${colors[index]}`}
                        >

                            {/* left side */}
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm">
                                    {r.student}
                                </span>

                                <span className="text-xs text-muted-foreground">
                                    {r.exam}
                                </span>
                            </div>

                            {/* center */}
                            <div className="text-sm text-muted-foreground">
                                {r.correct}/{r.total}
                            </div>

                            {/* right */}
                            <div className="text-lg font-bold text-primary">
                                {r.percentage}%
                            </div>

                        </div>
                    )
                })}

            </CardContent>
        </Card>
    )
}


import { Skeleton } from "@/components/ui/skeleton"

export function TopStudentsSkeleton() {
    return (
        <Card className="border shadow-sm">

            {/* title */}
            <CardHeader className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-5 w-32" />
            </CardHeader>

            <CardContent className="space-y-4">

                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-4 border rounded-xl"
                    >

                        {/* student + exam */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32" />
                        </div>

                        {/* correct / total */}
                        <Skeleton className="h-4 w-12" />

                        {/* percentage */}
                        <Skeleton className="h-6 w-12 rounded-md" />

                    </div>
                ))}

            </CardContent>
        </Card>
    )
}