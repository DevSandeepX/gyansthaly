import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function usePagination() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [page, setPage] = useState(1)

    useEffect(() => {
        const current = Number(searchParams.get("page") ?? 1)
        setPage(current)
    }, [searchParams])

    function updateParams(key: string, value: string) {
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }

        router.replace(`${pathname}?${params.toString()}`)
    }

    useEffect(() => {
        updateParams("page", String(page))
    }, [page])

    return { page, setPage }
}