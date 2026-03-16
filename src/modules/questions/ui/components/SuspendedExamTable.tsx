import ExamPageHeader from './QuestionPageHeader'
import ExamTable from './ExamTable'
import { getExams } from '@/modules/exams/db'

export default async function SuspendedExamTable() {
    const exams = await getExams()

    return (
        // TODO:Add table skeleton
        <>
            <ExamPageHeader
                examId={exams[0].id}
            />
            <ExamTable
                exams={exams} />
        </>
    )
}
