"use client"

import { Button } from "@/components/ui/button"
import { usePagination } from "@/hooks/use-pagination"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pagination({ hasNextPage }: { hasNextPage: boolean }) {

    const { page, setPage } = usePagination()

    function prevPage() {
        if (page > 1) {
            setPage((prev) => prev - 1)
        }
    }

    function nextPage() {
        if (hasNextPage) {
            setPage((prev) => prev + 1)
        }
    }

    return (
        <div className="fixed bottom-0 left-16 md:left-64 right-0 z-40 bg-white border-t">

            <div className="flex items-center justify-center py-4">

                <div className="flex items-center gap-6 rounded-xl border bg-muted/30 px-6 py-3 shadow-sm">

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={prevPage}
                        disabled={page === 1}
                        className="flex items-center gap-1"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>

                    <div className="text-sm font-medium text-muted-foreground">
                        Page <span className="font-semibold text-foreground">{page}</span>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={nextPage}
                        disabled={!hasNextPage}
                        className="flex items-center gap-1"
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                </div>

            </div>

        </div>
    )
}