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



export async function getUsers({ search, page, limit }: { search: string, page: number, limit: number }) {
    const offset = (page - 1) * limit
    const users = await db.query.users.findMany({
        where: (users, { ilike }) =>
            search ? ilike(users.rollNumber, `%${search}%`) : undefined,
        offset,
        limit
    })

    const hasNextPage = users.length === limit

    return {
        users,
        hasNextPage
    }
}