"use client"
import React from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog"

interface ModalProps {
    title?: string,
    description?: string
    children: React.ReactNode,
    open: boolean,
    onOpenChange: (open: boolean) => void,
}

export function Modal({
    children,
    open,
    onOpenChange,
    title,
    description
}: ModalProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                {title &&
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                }

                {description && <DialogDescription>
                    {description}
                </DialogDescription>}

                {children}
            </DialogContent>
        </Dialog>
    )
}