"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"

interface ConfirmActionDialogProps {
    title?: string
    description?: string
    action: () => Promise<any>
    trigger: React.ReactNode
}

export default function ConfirmActionDialog({
    title = "Are you sure?",
    description = "This action cannot be undone.",
    action,
    trigger
}: ConfirmActionDialogProps) {

    const [open, setOpen] = useState(false)
    const [pending, startTransition] = useTransition()

    const handleConfirm = () => {
        startTransition(async () => {
            try {

                await action()

                toast.success("Action completed")

                setOpen(false)

            } catch (error) {
                toast.error("Something went wrong")
            }
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>

            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>

            <AlertDialogContent>

                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel disabled={pending}>
                        Cancel
                    </AlertDialogCancel>

                    <Button
                        variant="destructive"
                        onClick={handleConfirm}
                        disabled={pending}
                    >
                        {pending ? "Processing..." : "Confirm"}
                    </Button>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>
    )
}