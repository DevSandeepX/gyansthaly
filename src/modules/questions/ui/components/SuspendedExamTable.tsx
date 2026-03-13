import ExamPageHeader from './QuestionPageHeader'
import ExamTable from './ExamTable'
import { getExams } from '@/modules/exams/db'

export default async function SuspendedExamTable() {
    const exams = await getExams()

    return (
        // TODO:Add table skeleton
        <>
            <ExamPageHeader
                exams={exams}
            />
            <ExamTable
                exams={exams} />
        </>
    )
}
