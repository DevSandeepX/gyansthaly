import { NextResponse } from "next/server"
import { db } from "@/db"
import { userExam, options, users, questions } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {

    try {

        const { examId } = await req.json()

        // exam attempts
        const attempts = await db
            .select({
                userId: users.id,
                rollNumber: users.rollNumber,
                answers: userExam.answers
            })
            .from(userExam)
            .innerJoin(users, eq(userExam.userId, users.id))
            .where(eq(userExam.examId, examId))


        // total questions
        const examQuestions = await db
            .select({ id: questions.id })
            .from(questions)
            .where(eq(questions.examId, examId))

        const totalQuestions = examQuestions.length


        // correct options
        const correctOptions = await db
            .select({
                questionId: options.questionId,
                optionId: options.id
            })
            .from(options)
            .where(eq(options.isCorrect, true))


        // questionId -> correctOptionId
        const correctMap = new Map<string, string>()

        correctOptions.forEach((opt) => {
            correctMap.set(opt.questionId, opt.optionId)
        })


        // result calculation
        const results = attempts.map((attempt) => {

            let score = 0
            const answers = attempt.answers || {}

            Object.entries(answers).forEach(([questionId, optionId]) => {

                if (correctMap.get(questionId) === optionId) {
                    score++
                }

            })

            const percentage = ((score / totalQuestions) * 100).toFixed(2)

            return {
                userId: attempt.userId,
                name: attempt.rollNumber,
                score,
                total: totalQuestions,
                percentage
            }

        })

        return NextResponse.json({
            success: true,
            results
        })

    } catch (error) {

        console.log(error)

        return NextResponse.json({
            success: false,
            message: "Server error"
        })
    }

}