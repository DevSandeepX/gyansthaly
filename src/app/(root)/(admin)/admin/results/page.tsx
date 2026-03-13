import { db } from "@/db"
import { exams } from "@/db/schema"
import ResultsPage from "../../_components/ExamResult"
import { Suspense } from "react"
import { TableSkeleton } from "../exams/page"

export default async function Page() {



    return <Suspense fallback={<TableSkeleton rows={5} cols={5} />}>
        <SuspendedResultTabe />
    </Suspense>
}


async function SuspendedResultTabe() {
    const allExams = await db.select({
        id: exams.id,
        name: exams.name
    }).from(exams)
    return (
        <ResultsPage exams={allExams} />
    )
}