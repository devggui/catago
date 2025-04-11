import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react"
import { Button } from "./button"

type DeleteDialogProps = {
  isOpen: boolean
  title?: string
  description?: string
  isLoading?: boolean
  onOpenChange: (value: boolean) => void
  onSubmit: () => Promise<void>
}

export const DeleteDialog = ({
  isOpen,
  onOpenChange,
  title,
  description,
  onSubmit,
  isLoading,
}: DeleteDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={!!isLoading}>Cancelar</AlertDialogCancel>
          <Button onClick={onSubmit} disabled={!!isLoading}>
            {!!isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
