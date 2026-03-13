import { getExam } from "@/modules/exams/db"
import ExamUI from "../_components/ExamUI"
import { notFound } from "next/navigation"

export default async function ExamPage({
    params, searchParams
}: {
    params: Promise<{ examId: string }>,
    searchParams: Promise<{ student: string }>
}) {

    const { examId } = await params
    const exam = await getExam(examId)
    if (!exam) return notFound()
    const { student } = await searchParams
    return <ExamUI
        examId={examId}
        duration={exam.duration}
        studentId={student}
        limit={exam.totalQuestions}
    />
}