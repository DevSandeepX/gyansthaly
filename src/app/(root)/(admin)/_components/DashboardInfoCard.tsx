import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
    title: string
    value: number
    icon?: React.ReactNode
}

export function DashboardInfoCard({ title, value, icon }: Props) {
    return (
        <Card className="hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>

            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}


export function DashboardInfoCardSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-5 rounded-md" />
            </CardHeader>

            <CardContent>
                <Skeleton className="h-8 w-16" />
            </CardContent>
        </Card>
    )
}