import z from "zod";
import { studentSchema } from "../schema";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateStudentDb(id: string, data: Partial<z.infer<typeof studentSchema>>) {
    const [res] = await db.update(users)
        .set(data)
        .where(eq(users.id, id))
        .returning({ id: users.id })

    if (res == null) {
        throw new Error("Something went wrong")
    }

    revalidatePath("/admin/students")
    revalidatePath("/")
    revalidatePath("/", "layout")
}

export async function deleteUserDb(id: string) {
    const [res] = await db.delete(users)
        .where(eq(users.id, id))
        .returning({ id: users.id })

    if (res == null) {
        throw new Error("Something went wrong")
    }

    revalidatePath("/admin/students")
    revalidatePath("/")
    revalidatePath("/", "layout")
}

export async function insertStudentDb(data: z.infer<typeof studentSchema>) {
    const [res] = await db.insert(users)
        .values(data)
        .returning({ id: users.id })

    if (res == null) {
        throw new Error("Something went wrong")
    }

    revalidatePath("/admin/students")
    revalidatePath("/")
    revalidatePath("/", "layout")
}



export async function getUsers() {
    return db.query.users.findMany({
        columns: { id: true, rollNumber: true }
    })
}