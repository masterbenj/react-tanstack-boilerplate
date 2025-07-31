import { cn } from "@/lib/utils"
import { SidebarTrigger, useSidebar } from "../ui/sidebar"
import { MobileSidebar } from "./sidebar-mobile"
import { ThemeModeToggle } from "./theme-mode-toggle" 
import { Button } from "../ui/button"
import { env } from "@/env"

export const AppHeader = () => {

  const { state } = useSidebar()

  return (
    <header 
      className={cn(
        "fixed top-0 right-0 left-0 z-10 h-16 flex items-center gap-4 border-b bg-sidebar px-4 lg:px-6 transition-all duration-300",
        state === "collapsed" ? 'md:left-12 lg:left-12' : 'md:left-64 lg:left-64',
      )}
    >
      <MobileSidebar />
      <SidebarTrigger />
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-red-400">{ env.VITE_NODE_ENV == "DEVELOPMENT" && "Development Server" }</h2>
      </div>
      <div className="flex items-center gap-2">
        <ThemeModeToggle />
        <Button variant="outline" size="sm" className='hidden'>
          Upgrade
        </Button>
        <Button size="sm" className='hidden'>
          Get Started
        </Button>
      </div>
    </header>
  )
}