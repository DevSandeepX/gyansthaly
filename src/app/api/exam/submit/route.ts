import { NextResponse } from "next/server"
import { db } from "@/db"
import { userExam } from "@/db/schema"

export async function POST(req: Request) {

    try {

        const body = await req.json()

        const { userId, examId, answers } = body

        if (!userId || !examId || !answers) {
            return NextResponse.json({
                success: false,
                message: "Missing required fields"
            })
        }

        const result = await db.insert(userExam).values({
            userId,
            examId,
            answers
        }).returning()

        return NextResponse.json({
            success: true,
            message: "Exam submitted successfully",
            data: result[0]
        })

    } catch (error) {

        console.log(error)

        return NextResponse.json({
            success: false,
            message: "Server error"
        })
    }
}