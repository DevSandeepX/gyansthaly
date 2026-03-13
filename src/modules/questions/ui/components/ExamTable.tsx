


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
import React from 'react'

import { Button } from "@/components/ui/button"



interface Exam {

    duration: number;
    id: string;
    name: string;
    totalQuestions: number;

}

export default function examTable({
    exams,

}: {
    exams: Exam[]

}) {

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

                                >
                                    <Pencil size={16} />
                                </Button>

                                <Button
                                    size="icon"
                                    variant="destructive"
                                >
                                    <Trash2 size={16} />
                                </Button>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
