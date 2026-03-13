import { getExams } from "@/modules/exams/db";
import QuestionPageHeader from "@/modules/questions/ui/components/QuestionPageHeader";
import { Suspense } from "react";
import QuestionsList from "../../_components/QuestionsList";

export default async function QuestionsPage() {
    const exams = await getExams()
    return (
        <div>
            <QuestionPageHeader
                exams={exams}
            />

            <SuspendedQuestionsList />
        </div>
    )
}


async function SuspendedQuestionsList() {
    const exams = await getExams()
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <QuestionsList 
            
            />
        </Suspense>
    )
}