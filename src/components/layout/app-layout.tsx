import { cn } from "@/lib/utils";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar, SidebarMenuItem } from "./app-sidebar";
import { AppHeader } from "./app-header";
import { Toaster } from "../ui/sonner";
import { LogoutProvider } from "./logout-provider"; 
import { LogoutModal } from "./logout-modal";
import { Home, LayoutList } from "lucide-react";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {

  const sidebarItems: SidebarMenuItem[] = [
    {
      title: "Home",
      icon: Home,
      url: "/"
    },
    {
      title: "Demo",
      icon: LayoutList,
      url: "/demo"
    },
  ]

  return (
    <LogoutProvider>
      <SidebarProvider>
        <div className="flex min-h-screen flex-col w-full">
          <div className="flex flex-1">
            <AppSidebar items={sidebarItems} />
            <div 
              className={cn(
                "flex-1 transition-all duration-300 lg:ml-2",
              )}
            >
              <AppHeader />
              <main className="pt-16 p-4 md:p-6 mt-4 md:mt-12">
                { children }
              </main>
              <Toaster />
            </div>
          </div>
        </div>
      </SidebarProvider>
      <LogoutModal onLogout={() => console.log("User logged out!")} />
    </LogoutProvider>
  )
}