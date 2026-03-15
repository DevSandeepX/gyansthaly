import { useEffect, useState } from "react";

export function useDebounced(value: string, duration: number) {
    const [debounced, setDebounced] = useState<string>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounced(value);
        }, duration);

        return () => clearTimeout(timer);
    }, [value, duration]);

    return debounced;
}