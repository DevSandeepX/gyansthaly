import React from "react"
import Sidebar from "../components/sidebar"

interface AdminDashboardLayoutProps {
    children: React.ReactNode
}

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
    return (
        <div className="w-full h-screen flex bg-gray-50">

            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-screen w-16 md:w-64 border-r bg-white z-20">
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 ml-16 md:ml-64 h-screen overflow-y-auto p-6">
                {children}
            </main>

        </div>
    )
}