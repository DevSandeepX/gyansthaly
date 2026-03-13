import { getExams } from '../../db'
import ExamPageHeader from './ExamPageHeader'
import ExamTable from './ExamTable'

export default async function SuspendedExamTable() {
    const exams = await getExams()

    return (
        // TODO:Add table skeleton
        <>
            <ExamPageHeader />
            <ExamTable
                exams={exams} />
        </>
    )
}
