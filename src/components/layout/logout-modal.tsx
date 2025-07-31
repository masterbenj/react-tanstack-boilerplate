import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useLogoutModal } from "./logout-provider" 
import { Modal } from "../modal-component"

type LogoutModalProps = {
  /** Logout logic here (e.g., clear token, redirect) */
  onLogout  : () => void
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  onLogout,
}) => {
  const { isModalOpen, hideLogoutModal } = useLogoutModal()

  const handleLogout = () => {
    hideLogoutModal()
    onLogout()
  }

  return (
    <Modal
      open={isModalOpen}
      onOpenChange={hideLogoutModal}
      action={(
        <Button variant="outline" size="sm" onClick={handleLogout} className="border !border-green-500 hover:!bg-green-500 cursor-pointer">Logout</Button>
      )}
      title="Are you sure you want to logout?"
      description="Clicking logout will delete all your session, and unsaved changes."
    />
  )
}
