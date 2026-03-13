import { LucideIcon } from "lucide-react"
import Link from "next/link"

export function SidebarMenuItem({ item }: {
    item: { label: string, href: string, icon: LucideIcon }
}) {
    return (
        <Link
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition"
        >
            <item.icon size={20} />
            <span className="hidden md:block font-medium">
                {item.label}
            </span>
        </Link>
    )
}