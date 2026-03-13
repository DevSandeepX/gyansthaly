import { NextResponse } from "next/server"
import { db } from "@/db"

export async function GET(req: Request) {

    try {

        const { searchParams } = new URL(req.url)

        const examId = searchParams.get("examId")
        const limit = Number(searchParams.get("limit") ?? 50)
        const page = Number(searchParams.get("page") ?? 1)

        if (!examId) {
            return NextResponse.json({
                success: false,
                message: "examId is required"
            })
        }

        const offset = (page - 1) * limit

        const data = await db.query.questions.findMany({
            columns: { id: true, text: true },
            with: {
                options: {
                    columns: { id: true, text: true }
                }
            },
            where: (questions, { eq }) => eq(questions.examId, examId),
            limit,
            offset
        })

        const hasNextPage = data.length === limit

        return NextResponse.json({
            success: true,
            questions: data,
            hasNextPage
        })

    } catch (error) {

        console.log(error)

        return NextResponse.json({
            success: false,
            message: "Server error"
        })
    }
}