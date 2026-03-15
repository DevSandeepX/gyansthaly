"use client"
import useSearchState from "@/hooks/use-search-state";
import { Input } from "./ui/input";

export default function SearchForm() {

    const { search, setSearch } = useSearchState()

    return (
        <div className="max-w-[340px] w-full">
            <Input
                value={search}
                placeholder="Search ..."
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )
}