import { NextResponse } from "next/server"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { users } from "@/db/schema"


export async function POST(req: Request) {

    try {

        const body = await req.json()
        const { rollNumber } = body

        if (!rollNumber) {
            return NextResponse.json({
                success: false,
                message: "Roll number is required"
            })
        }

        // student find
        const student = await db
            .select()
            .from(users)
            .where(eq(users.rollNumber, rollNumber))
            .limit(1)

        if (student.length === 0) {
            return NextResponse.json({
                success: false,
                message: "Student not found"
            })
        }

        return NextResponse.json({
            success: true,
            message: "Login successful",
            student: student[0]
        })

    } catch (error) {

        console.log(error)

        return NextResponse.json({
            success: false,
            message: "Server error"
        })
    }
}