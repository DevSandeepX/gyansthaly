"use client"

import { Pencil, Trash2 } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import ConfirmActionDialog from "@/components/ConfirmActionDialog"
import { deleteUser } from "../../server"
import { useState } from "react"
import { Modal } from "@/components/modal"
import StudentForm from "./student-form"

interface User {
    id: string
    rollNumber: string
}

export default function UserTable({
    users,

}: {
    users: User[]

}) {

    const [selectedUser, setSelectedUser] = useState<{ id: string, rollNumber: string }>()
    const [editOpen, setEditOpen] = useState(false)

    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Roll Number</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className="text-center py-6"
                            >
                                No users found
                            </TableCell>
                        </TableRow>
                    )}

                    {users.map((user, index) => (
                        <TableRow key={user.id}>
                            <TableCell>{index + 1}</TableCell>

                            <TableCell className="font-medium">
                                {user.rollNumber}
                            </TableCell>

                            <TableCell className="text-right space-x-2">

                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedUser(user)
                                        setEditOpen(true)
                                    }}

                                >
                                    <Pencil size={16} />
                                </Button>


                                <ConfirmActionDialog
                                    action={() => deleteUser(user.id)}
                                    title="Delete User"
                                    description="This will permanently delete the user"
                                    trigger={
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    }
                                />


                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Modal
                open={editOpen}
                onOpenChange={setEditOpen}
                title="Edit User"
                description="Update information"
            >
                <StudentForm
                    student={selectedUser}
                />

            </Modal>
        </div>
    )
}