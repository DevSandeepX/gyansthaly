"use client"
import { BookCheck, CheckCheckIcon, FileQuestion, LayoutDashboard, Shield, User2Icon } from "lucide-react"
import { SidebarMenuItem } from "./sidebar-menu-item"
import { Show, UserButton } from "@clerk/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const MENU_ITEMS = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Students", href: "/admin/students", icon: User2Icon },
    { label: "Exams", href: "/admin/exams", icon: BookCheck },
    { label: "Questions", href: "/admin/questions", icon: FileQuestion },
    { label: "Results", href: "/admin/results", icon: CheckCheckIcon },
]

export default function Sidebar() {

    return (
        <div className="flex flex-col h-full p-3 space-y-2">
            <header className="flex justify-start items-center p-4 gap-4 h-16">
                <Show when="signed-out">
                    <Link href="/sign-in">
                        <Button className="gap-2" variant="outline">
                            <Shield size={16} />
                            Admin Panel
                        </Button>
                    </Link>
                </Show>
                <Show when="signed-in">
                    <UserButton />
                    <Button>
                        <Link href={"/admin"}>
                            Admin Panel
                        </Link>
                    </Button>
                </Show>
            </header>
            {MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.label} item={item} />
            ))}
        </div>
    )
}

