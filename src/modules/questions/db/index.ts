import { db } from "@/db"
import { questions, options } from "@/db/schema"
import { revalidatePath } from "next/cache";

export async function insertQuestionsDb(examId: string,
    data: {
        text: string,
        options: { text: string, isCorrect: boolean }[]
    }[]
) {

    let uploadedQuestionCount = 0;
    for (const q of data) {

        const question = await db
            .insert(questions)
            .values({
                examId,
                text: q.text
            })
            .returning()

        const questionId = question[0].id

        const optionValues = q.options.map((opt) => ({
            questionId,
            text: opt.text,
            isCorrect: opt.isCorrect
        }))

        await db.insert(options).values(optionValues)
        uploadedQuestionCount++;
    }

    revalidatePath("/", "layout")
    return uploadedQuestionCount

}