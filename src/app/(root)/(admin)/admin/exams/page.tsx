
import SuspendedExamTable from '@/modules/exams/ui/components/SuspendedExamTable'
import { Suspense } from 'react'

export default function ExamsPage() {

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <SuspendedExamTable />
        </Suspense>
    )
}


