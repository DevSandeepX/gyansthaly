interface HeadingProps {
    title: string,
    description?: string
}
export default function Heading({
    title,
    description
}: HeadingProps) {
    return (
        <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold">{title}</h2>
            {description && <p className="w-full line-clamp-3 text-sm text-muted-foreground">{description}</p>}
        </div>
    )
}
