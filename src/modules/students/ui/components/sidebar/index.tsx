import { BookCheck, CheckCheckIcon, FileQuestion, LayoutDashboard, User2Icon } from "lucide-react"
import { SidebarMenuItem } from "./sidebar-menu-item"

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
            {MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.label} item={item} />
            ))}
        </div>
    )
}

