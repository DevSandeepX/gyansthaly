import { db } from '@/db'
import React from 'react'
import { Users, FileText, HelpCircle } from "lucide-react"

export default async function DashboardInfos() {
    const [users, exams, questions] = await Promise.all([
        getUsers(),
        getExams(),
        getQuestions()
    ])

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <DashboardInfosCard
                title="Users"
                count={users.length}
                icon={<Users size={28} />}
                color="bg-blue-500"
            />

            <DashboardInfosCard
                title="Exams"
                count={exams.length}
                icon={<FileText size={28} />}
                color="bg-green-500"
            />

            <DashboardInfosCard
                title="Questions"
                count={questions.length}
                icon={<HelpCircle size={28} />}
                color="bg-purple-500"
            />
        </div>
    )
}

function DashboardInfosCard({
    title,
    count,
    icon,
    color
}: {
    title: string
    count: number
    icon: React.ReactNode
    color: string
}) {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex items-center justify-between">

            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <h2 className="text-3xl font-bold mt-1">{count}</h2>
            </div>

            <div className={`${color} text-white p-3 rounded-xl`}>
                {icon}
            </div>

        </div>
    )
}

async function getQuestions() {
    return db.query.questions.findMany({
        columns: { id: true }
    })
}

async function getUsers() {
    return db.query.users.findMany({
        columns: { id: true }
    })
}

async function getExams() {
    return db.query.exams.findMany({
        columns: { id: true }
    })
}