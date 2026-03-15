import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounced } from "./use-debounce";
import { usePagination } from "./use-pagination";


export default function useSearchState() {
    const router = useRouter()
    const pathname = usePathname()
    const { setPage } = usePagination()

    const searchParams = useSearchParams()
    const [search, setSearch] = useState<string>(searchParams.get("search") ?? "")

    const debounced = useDebounced(search, 200)

    function updateSearch(key: string, value: string) {
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }


        console.log(search)
        router.replace(`${pathname}?${params.toString()}`)
    }

    useEffect(() => {
        updateSearch("search", debounced)
        setPage(Number(1))
    }, [debounced])

    return { search, setSearch }
}
