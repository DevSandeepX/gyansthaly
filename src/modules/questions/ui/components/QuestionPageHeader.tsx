"use client"
import Heading from '@/app/(root)/(admin)/_components/heading'
import { Modal } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import QuestionFileUploader from './QuestionFileUploader'

interface QuestionPageHeaderProps {
    examId:string
}

export default function QuestionPageHeader({
    examId
}: QuestionPageHeaderProps) {
    const [open, setOpen] = useState(false)
    return (
        <>

            <div className='flex items-end justify-between mb-6'>
                <Heading
                    title='Manage All Question'
                    description='Manage All questions for your Exam system .'
                />

                <Button
                    onClick={() => setOpen(true)}
                >Upload Questions</Button>
            </div>

            <Modal
                open={open}
                onOpenChange={setOpen}
                title='New Student'
            >
                <QuestionFileUploader
                    examId={examId}
                />
            </Modal>
        </>
    )
}


