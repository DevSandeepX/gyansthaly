import { db } from "@/db";
import { exams } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getExams() {
    return db.query.exams.findMany({
        columns: {
            id: true, name: true, duration: true, totalQuestions: true
        }
    })
}

export async function getExam(id: string) {
    return db.query.exams.findFirst({
        where: eq(exams.id, id),
    })
}
export async function updateExamDb(id: string, data: Partial<typeof exams.$inferInsert>) {
    const [res] = await db.update(exams)
        .set(data)
        .where(eq(exams.id, id))
        .returning({ id: exams.id })

    if (res == null) {
        throw new Error("Something went wrong")
    }

    revalidatePath("/admin/exams")
    revalidatePath("/")
    revalidatePath("/", "layout")
}
export async function insertExamDb(data: typeof exams.$inferInsert) {
    const [res] = await db.insert(exams)
        .values(data)
        .returning({ id: exams.id })

    if (res == null) {
        throw new Error("Something went wrong")
    }

    revalidatePath("/admin/exams")
    revalidatePath("/")
    revalidatePath("/", "layout")
}