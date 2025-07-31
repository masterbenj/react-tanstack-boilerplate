import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type ModalProps = {
  open              ?:  boolean
  onOpenChange      ?:  (open: boolean) => void
  title             ?:  React.ReactNode
  description       ?:  React.ReactNode
  children          ?:  React.ReactNode
  className         ?:  string
  action            ?:  React.ReactNode
  cancelButton      ?:  boolean
  preventClose      ?:  boolean
  showCloseButton   ?:  boolean
  triggerButton     ?:  boolean
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  action,
  cancelButton = true,
  preventClose = true,
  showCloseButton,
  triggerButton,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        { triggerButton &&
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        }
        
        <DialogContent
          className={cn(
            "sm:max-w-[425px]",
            className
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            if (preventClose) e.preventDefault()
          }}
          onFocusOutside={(e) => {
            if (preventClose) e.preventDefault()
          }}
          onEscapeKeyDown={(e) => {
            if (preventClose) e.preventDefault()
          }}
        showCloseButton={showCloseButton}
        >
          <DialogHeader>
            <DialogTitle>{ title }</DialogTitle>
            <DialogDescription>{ description }</DialogDescription>
          </DialogHeader>
          { children }
          <DialogFooter>
            { cancelButton &&
              <DialogClose asChild>
                <Button variant="outline" size="sm" className="border !border-red-400 hover:!bg-red-400 hover:!text-gray-800 cursor-pointer">Cancel</Button>
              </DialogClose>
            }
            { action }
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
