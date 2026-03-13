"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { examSchema } from "../../schema"
import { z } from "zod"

import { actionToast } from "@/lib/action-toast"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createExam, updateExam } from "../../server"

type FormValues = z.infer<typeof examSchema>

export default function ExamForm({
    exam
}: {
    exam?: {
        id: string
        name: string
        duration: number
        totalQuestions: number
    }
}) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<FormValues>({
        resolver: zodResolver(examSchema),
        defaultValues: exam ?? {
            name: "",
            duration: 0,
            totalQuestions: 0
        }
    })

    const onSubmit = async (values: FormValues) => {

        const action = exam
            ? updateExam.bind(null, exam.id)
            : createExam

        const res = await action(values)

        actionToast({ ...res })

        if (res.success && !exam) {
            reset()
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-md"
        >

            {/* Exam Name */}
            <div className="space-y-2">
                <Label>Exam Name</Label>

                <Input
                    placeholder="Enter Exam Name"
                    {...register("name")}
                />

                {errors.name && (
                    <p className="text-sm text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Duration */}
            <div className="space-y-2">
                <Label>Duration (minutes)</Label>

                <Input
                    type="number"
                    placeholder="Enter Exam Duration"
                    {...register("duration", { valueAsNumber: true })}
                />

                {errors.duration && (
                    <p className="text-sm text-red-500">
                        {errors.duration.message}
                    </p>
                )}
            </div>

            {/* Total Questions */}
            <div className="space-y-2">
                <Label>Total Questions</Label>

                <Input
                    type="number"
                    placeholder="Enter Total Questions"
                    {...register("totalQuestions", { valueAsNumber: true })}
                />

                {errors.totalQuestions && (
                    <p className="text-sm text-red-500">
                        {errors.totalQuestions.message}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
            >
                {isSubmitting
                    ? "Saving..."
                    : exam
                        ? "Update Exam"
                        : "Create Exam"}
            </Button>

        </form>
    )
}