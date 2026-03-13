import { db } from "@/db"
import { exams } from "@/db/schema"
import ResultsPage from "../../_components/ExamResult"

export default async function Page() {

    const allExams = await db.select({
        id: exams.id,
        name: exams.name
    }).from(exams)

    return <ResultsPage exams={allExams} />
}