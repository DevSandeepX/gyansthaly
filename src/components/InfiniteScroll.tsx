"use client"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { Button } from "./ui/button"
import { useEffect } from "react"

interface InfiniteScrollProps {
    hasNextPage: boolean
    loading: boolean
    isManual?: boolean
    loadMore: () => void
}

export default function InfiniteScroll({
    hasNextPage,
    loadMore,
    loading,
    isManual = false
}: InfiniteScrollProps) {

    const { targetRef, isIntersecting } = useIntersectionObserver({
        options: {
            threshold: 0.5,
            rootMargin: "100px"
        }
    })

    useEffect(() => {
        if (isManual) return

        if (isIntersecting && hasNextPage && !loading) {
            loadMore()
        }
    }, [isIntersecting, hasNextPage, loading, isManual])


    return (
        <div className="w-full flex flex-col items-center justify-center gap-3 py-4">

            {/* Intersection target */}
            {!isManual && <div ref={targetRef} className="h-1 w-full" />}

            {loading && (
                <div className="text-sm text-gray-500 animate-pulse">
                    Loading...
                </div>
            )}

            {isManual && hasNextPage && (
                <Button
                    onClick={loadMore}
                    disabled={loading}
                    className="px-4 py-2"
                >
                    {loading ? "Loading..." : "Load More"}
                </Button>
            )}

            {!loading && !hasNextPage && (
                <div className="text-sm text-gray-400">
                    No more data
                </div>
            )}
        </div>
    )
}