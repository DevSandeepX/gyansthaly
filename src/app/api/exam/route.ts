import { NextResponse } from "next/server"
import { db } from "@/db"
import { exams } from "@/db/schema"

export async function GET() {
    try {

        const data = await db.query.exams.findMany({
            columns: { id: true, name: true }
        })

        return NextResponse.json(data)

    } catch (error) {

        console.error("Error fetching exams:", error)

        return NextResponse.json(
            { message: "Failed to fetch exams" },
            { status: 500 }
        )
    }
}