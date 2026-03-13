import React from "react"
import Sidebar from "../components/sidebar"

interface AdminDashboardLayoutProps {
    children: React.ReactNode
}

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
    return (
        <div className="w-full min-h-screen flex">
            <div className="w-16 md:w-64">
                <Sidebar />
            </div>
            <main className="flex-1 pr-4">
                {children}
            </main>
        </div>
    )
}
