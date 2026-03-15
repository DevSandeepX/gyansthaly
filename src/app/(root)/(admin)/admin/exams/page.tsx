
import { TableSkeleton } from '@/components/skeleton/TableSkeleton'
import { getExams } from '@/modules/exams/db'
import ExamPageHeader from '@/modules/exams/ui/components/ExamPageHeader'
import ExamTable from '@/modules/exams/ui/components/ExamTable'
import { Suspense } from 'react'

export default function ExamsPage() {

    return (
        <Suspense fallback={<TableSkeleton rows={10} cols={5} />}>
            <SuspendedExamTable />
        </Suspense>
    )
}

async function SuspendedExamTable() {
    const exams = await getExams()

    return (
        // TODO:Add table skeleton
        <>
            <ExamPageHeader />
            <ExamTable
                exams={exams} />
        </>
    )
}


