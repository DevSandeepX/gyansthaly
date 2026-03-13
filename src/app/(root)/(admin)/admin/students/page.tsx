
import SuspendedUserTable from '@/modules/students/ui/components/SuspendedUserTable'
import { Suspense } from 'react'

export default function StudentsPage() {

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <SuspendedUserTable />
        </Suspense>
    )
}


