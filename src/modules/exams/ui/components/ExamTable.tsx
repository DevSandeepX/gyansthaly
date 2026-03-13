


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
import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import ConfirmActionDialog from "@/components/ConfirmActionDialog"
import { deleteExam } from "../../server"
import { Modal } from "@/components/modal"
import ExamForm from "./ExamForm"



interface Exam {

    duration: number;
    id: string;
    name: string;
    totalQuestions: number;

}

export default function ExamTable({
    exams,

}: {
    exams: Exam[]

}) {

    const [editOpen, setEditOpen] = useState(false)
    const [selectedExam, setSelectedExam] = useState<{ id: string, name: string, duration: number, totalQuestions: number }>()

    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Duration</TableHead>
                        <TableHead className="text-right">Total Questions</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {exams.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className="text-center py-6"
                            >
                                No Exam found
                            </TableCell>
                        </TableRow>
                    )}

                    {exams.map((exam, index) => (
                        <TableRow key={exam.id}>
                            <TableCell>{index + 1}</TableCell>

                            <TableCell className="font-medium">
                                {exam.name}
                            </TableCell>
                            <TableCell className="font-medium text-right">
                                {exam.duration}
                            </TableCell>
                            <TableCell className="font-medium text-right">
                                {exam.totalQuestions}
                            </TableCell>

                            <TableCell className="text-right space-x-2">

                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedExam(exam)
                                        setEditOpen(true)
                                    }}
                                >
                                    <Pencil size={16} />
                                </Button>

                                <ConfirmActionDialog
                                    action={() => deleteExam(exam.id)}
                                    title="Are You Sure ?"
                                    description="This exam deleted permanently from your db"
                                    trigger={<Button
                                        size="icon"
                                        variant="destructive"
                                    >
                                        <Trash2 size={16} />
                                    </Button>}
                                />

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Modal
                open={editOpen}
                onOpenChange={setEditOpen}
                title="Edit Exam"
                description="Update information"
            >
                <ExamForm
                    exam={selectedExam}
                />

            </Modal>
        </div>
    )
}
