"use server"
import z from "zod";
import { examSchema } from "../schema";
import { updateExamDb, insertExamDb } from "../db";

export async function updateExam(id: string, unsafeData: z.infer<typeof examSchema>) {
    const { success, data } = examSchema.safeParse(unsafeData)

    if (!success) return { success: false, message: "Invalid data recived" }

    try {
        const res = await updateExamDb(id, data)
        return { success: true, message: "Exam updated" }
    } catch (err) {
        return { success: false, message: "Something went wrong" }
    }
}

export async function createExam(unsafeData: z.infer<typeof examSchema>) {
    const { success, data } = examSchema.safeParse(unsafeData)

    if (!success) return { success: false, message: "Invalid data recived" }

    try {
        const res = await insertExamDb(data)
        return { success: true, message: "Exam Created" }
    } catch (err) {
        return { success: false, message: "Something went wrong" }
    }
}

