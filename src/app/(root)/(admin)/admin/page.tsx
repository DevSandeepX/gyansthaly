import React, { Suspense } from 'react'
import DashboardInfos from '../_components/DashboardInfos'

export default function AdminDashboardPage() {
    return (
        <SuspendedDashboardInfo />
    )
}


function SuspendedDashboardInfo() {
    return (
        <Suspense fallback={<DashboardInfosSkeleton />}>
            <DashboardInfos />
        </Suspense>
    )
}


export function DashboardInfosSkeleton() {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between animate-pulse"
                >
                    <div className="space-y-3">
                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                        <div className="h-8 w-16 bg-gray-200 rounded"></div>
                    </div>

                    <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
                </div>
            ))}
        </div>
    )
}