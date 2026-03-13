import { toast } from "sonner"
export function actionToast({ success, message }: {
    success: boolean,
    message: string
}) {
    if (success) {
        toast.success(message)
    } else {
        toast.error(message)
    }
}