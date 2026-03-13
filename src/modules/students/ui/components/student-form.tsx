"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { studentSchema } from "../../schema"
import { z } from "zod"
import { createStudent, updateStudent } from "../../server"
import { actionToast } from "@/lib/action-toast"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormValues = z.infer<typeof studentSchema>

export default function StudentForm({
    student
}: {
    student?: { id: string; rollNumber: string }
}) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<FormValues>({
        resolver: zodResolver(studentSchema),
        defaultValues: student ?? {
            rollNumber: ""
        }
    })

    const onSubmit = async (values: FormValues) => {
        const action = student
            ? updateStudent.bind(null, student.id)
            : createStudent

        const res = await action(values)

        actionToast({ ...res })

        if (res.success) {
            reset()
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-md"
        >

            <div className="space-y-2">
                <Label>Roll Number</Label>

                <Input
                    placeholder="Enter roll number"
                    {...register("rollNumber")}
                />

                {errors.rollNumber && (
                    <p className="text-sm text-red-500">
                        {errors.rollNumber.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
            >
                {student ? "Update Student" : "Create Student"}
            </Button>

        </form>
    )
}