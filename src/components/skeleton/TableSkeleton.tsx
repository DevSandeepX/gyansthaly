export function TableSkeleton({
    rows = 5,
    cols = 4
}: {
    rows?: number
    cols?: number
}) {

    return (
        <div className="w-full space-y-4">

            {/* header skeleton */}
            <div className="flex justify-between items-center">
                <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-28 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* table */}
            <div className="border rounded-lg overflow-hidden">

                {/* table header */}
                <div className="grid grid-cols-4 gap-4 p-4 border-b">
                    {Array.from({ length: cols }).map((_, i) => (
                        <div
                            key={i}
                            className="h-4 bg-gray-200 rounded animate-pulse"
                        />
                    ))}
                </div>

                {/* rows */}
                {Array.from({ length: rows }).map((_, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-4 gap-4 p-4 border-b last:border-none"
                    >
                        {Array.from({ length: cols }).map((_, j) => (
                            <div
                                key={j}
                                className="h-4 bg-gray-200 rounded animate-pulse"
                            />
                        ))}
                    </div>
                ))}

            </div>
        </div>
    )
}