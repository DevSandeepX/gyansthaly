import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Trophy } from "lucide-react"

interface Exam {
    id: string
    name: string
    attempts: number
}

export default function PopularExamList({ exams }: { exams: Exam[] }) {

    const max = exams[0]?.attempts || 1

    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="text-yellow-500" />
                Most Popular Exams
            </h2>

            <div className="space-y-5">
                {exams.map((exam, index) => {

                    const percentage = (exam.attempts / max) * 100

                    return (
                        <div
                            key={exam.id}
                            className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-medium">{exam.name}</p>

                                <span className="text-sm text-muted-foreground">
                                    {exam.attempts} attempts
                                </span>
                            </div>

                            <Progress value={percentage} className="h-2" />

                            <div className="text-xs text-muted-foreground mt-1">
                                Rank #{index + 1}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}


export function PopularExamsSkeleton() {
    return (
        <Card className="p-6 space-y-6">

            {/* Title */}
            <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-md" />
                <Skeleton className="h-5 w-40" />
            </div>

            {/* List */}
            <div className="space-y-5">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div
                        key={item}
                        className="p-4 rounded-xl border space-y-3"
                    >
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-20" />
                        </div>

                        {/* progress bar */}
                        <Skeleton className="h-2 w-full rounded-full" />

                        <Skeleton className="h-3 w-16" />
                    </div>
                ))}
            </div>
        </Card>
    )
}