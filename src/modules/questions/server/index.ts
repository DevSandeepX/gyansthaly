"use server";

import { insertQuestionsDb } from "../db";

export async function createQuestionsBulk(examId: string, questions: {
    text: string,
    options: { text: string, isCorrect: boolean }[]
}[]) {

    if (!examId) return { success: false, message: "Exam id is required" }

    try {
        const res = await insertQuestionsDb(examId, questions)
        return { success: true, message: `${res} Questions Uploaded` }
    } catch (err) {
        console.log("Error: ", err)
        return { success: false, message: "Something went wrong" }
    }

}