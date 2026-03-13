import AdminDashboardLayout from "@/modules/students/ui/layouts/admin-dashboard-layout"
import React from "react"

interface AdminLayoutProps {
    children: React.ReactNode
}

export default function AdminLayout({
    children
}: AdminLayoutProps) {
    return (
        <AdminDashboardLayout>
            {children}
        </AdminDashboardLayout>
    )
}
