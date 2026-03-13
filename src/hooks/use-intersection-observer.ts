import { useState, useEffect, useRef } from "react";


export function useIntersectionObserver({ options }: {
    options: IntersectionObserverInit
}) {
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false)
    const targetRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!targetRef.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting)
        }, options)

        return () => observer.disconnect()
    }, [])

    return { targetRef, isIntersecting }
}