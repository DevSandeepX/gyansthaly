"use client"

import { useState } from 'react'

import Heading from '@/app/(root)/(admin)/_components/heading'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/modal'
import StudentForm from './student-form'
import SearchForm from '@/components/SearchForm'
import StudentBulkUploader from './StudentBulkUploader'

export default function UserPageHeader() {

    const [formOpen, setFormOpen] = useState(false)
    const [bulkOpen, setBulkOpen] = useState(false)

    return (
        <>

            <div className='flex items-end justify-between mb-6'>
                <Heading
                    title='Manage All students'
                    description='Manage All student for your Exam system .'
                />
                <SearchForm />

                <Button
                    onClick={() => setFormOpen(true)}
                >Add New Student</Button>
                <Button
                    onClick={() => setBulkOpen(true)}
                >Add Student Bulk</Button>
            </div>

            <Modal
                open={formOpen}
                onOpenChange={setFormOpen}
                title='New Student'
            >
                <StudentForm />
            </Modal>
            <Modal
                open={bulkOpen}
                onOpenChange={setBulkOpen}
                title='Upload Students'
            >
                <StudentBulkUploader 
                setBulkOpen={setBulkOpen}
                />
            </Modal>


        </>
    )
}
