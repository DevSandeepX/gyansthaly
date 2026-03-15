import { Suspense } from "react"
import UserPageHeader from "@/modules/students/ui/components/UserPageHeader"

import { getUsers } from "@/modules/students/db/student"
import UserTable from "@/modules/students/ui/components/UserTable"
import { Pagination } from "@/modules/students/ui/components/Pagination"
import { USERS_LIMIT } from "@/settings"
import { TableSkeleton } from "@/components/skeleton/TableSkeleton"

export default async function StudentsPage({ searchParams }: {
    searchParams: Promise<{ search: string, page: string }>
}) {

    const { search, page } = await searchParams
    return (
        <div className="space-y-6">
            <UserPageHeader />

            <Suspense fallback={<TableSkeleton rows={5} cols={3} />}>
                <SuspendedUserTable search={search} page={page} />
            </Suspense>
        </div>
    )
}



async function SuspendedUserTable({ search, page }: {
    search: string,
    page: string
}) {

    const { users, hasNextPage } = await getUsers({ search, page: Number(page), limit: USERS_LIMIT })

    return (
        <>
            <UserTable users={users} />
            <Pagination hasNextPage={hasNextPage} />
        </>
    )
}
