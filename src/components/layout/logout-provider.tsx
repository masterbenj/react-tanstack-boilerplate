import { createContext, useContext, useState, ReactNode } from "react"

interface LogoutContextType {
  showLogoutModal: () => void
  hideLogoutModal: () => void
  isModalOpen: boolean
}

const LogoutContext = createContext<LogoutContextType | undefined>(undefined)

export const LogoutProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showLogoutModal = () => setIsModalOpen(true)
  const hideLogoutModal = () => setIsModalOpen(false)

  return (
    <LogoutContext.Provider value={{ showLogoutModal, hideLogoutModal, isModalOpen }}>
      {children}
    </LogoutContext.Provider>
  )
}

export const useLogoutModal = () => {
  const context = useContext(LogoutContext)
  if (!context) {
    throw new Error("useLogoutModal must be used within a LogoutProvider")
  }
  return context
}
