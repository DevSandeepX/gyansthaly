"use server"
import z from "zod";
import { studentSchema } from "../schema";
import { deleteUserDb, insertStudentDb, updateStudentDb } from "../db/student";

export async function updateStudent(id: string, unsafeData: z.infer<typeof studentSchema>) {
    const { success, data } = studentSchema.safeParse(unsafeData)

    if (!success) return { success: false, message: "Invalid data recived" }

    try {
        const res = await updateStudentDb(id, data)
        return { success: true, message: "Student updated" }
    } catch (err) {
        return { success: false, message: "Something went wrong" }
    }
}

export async function createStudent(unsafeData: z.infer<typeof studentSchema>) {
    const { success, data } = studentSchema.safeParse(unsafeData)

    if (!success) return { success: false, message: "Invalid data recived" }

    try {
        const res = await insertStudentDb(data)
        return { success: true, message: "Student Created" }
    } catch (err) {
        return { success: false, message: "Something went wrong" }
    }
}

export async function deleteUser(id: string) {
    try {
        if (!id) return { success: false, message: "ID Must be required" }
        const res = await deleteUserDb(id)
        return { success: true, message: "User Deleted" }
    } catch (err) {
        console.log("Error: ", err)
        return { success: false, message: "Failed to delete user" }
    }
}