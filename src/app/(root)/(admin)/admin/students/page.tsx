import { Suspense } from "react"
import UserPageHeader from "@/modules/students/ui/components/UserPageHeader"

import { getUsers } from "@/modules/students/db/student"
import UserTable from "@/modules/students/ui/components/UserTable"

export default function StudentsPage() {
    return (
        <div className="space-y-6">
            <UserPageHeader />

            <Suspense fallback={<UserTableSkeleton />}>
                <SuspendedUserTable />
            </Suspense>
        </div>
    )
}



async function SuspendedUserTable() {

    const users = await getUsers()

    return (
        <UserTable users={users} />
    )
}


function UserTableSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="h-12 w-full rounded-lg bg-gray-200 animate-pulse"
                />
            ))}
        </div>
    )
}