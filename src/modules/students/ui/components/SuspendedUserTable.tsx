import { Suspense } from "react"
import UserTable from "./UserTable"
import { getUsers } from "../../db/student"
import UserPageHeader from "./UserPageHeader"

export default async function SuspendedUserTable() {

    const users = await getUsers()

    return (
        // TODO:Add table skeleton
        <>
            <UserPageHeader />
            <UserTable
                users={users} />
        </>
    )
}
