"use client"
import Heading from '@/app/(root)/(admin)/_components/heading'
import { Modal } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ExamForm from './ExamForm'

export default function ExamPageHeader() {
    const [open, setOpen] = useState(false)
    return (
        <>

            <div className='flex items-end justify-between mb-6'>
                <Heading
                    title='Manage Exams students'
                    description='Manage All Exams for your Exam system .'
                />

                <Button
                    onClick={() => setOpen(true)}
                >Create Exam</Button>
            </div>

            <Modal
                open={open}
                onOpenChange={setOpen}
                title='New Exam'
                description='Fill Information to create a new exam'
            >
                <ExamForm />
            </Modal>
        </>
    )
}
