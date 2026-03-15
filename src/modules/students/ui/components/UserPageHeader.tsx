"use client"

import { useState } from 'react'

import Heading from '@/app/(root)/(admin)/_components/heading'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/modal'
import StudentForm from './student-form'
import SearchForm from '@/components/SearchForm'

export default function UserPageHeader() {

    const [open, setOpen] = useState(false)
    return (
        <>

            <div className='flex items-end justify-between mb-6'>
                <Heading
                    title='Manage All students'
                    description='Manage All student for your Exam system .'
                />
                <SearchForm />

                <Button
                    onClick={() => setOpen(true)}
                >Add New Student</Button>
            </div>

            <Modal
                open={open}
                onOpenChange={setOpen}
                title='New Student'
            >
                <StudentForm />
            </Modal>


        </>
    )
}
