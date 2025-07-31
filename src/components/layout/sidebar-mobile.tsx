import { BarChart, Home, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="lg:hidden p-0">
        <Sidebar className="border-0">
          <SidebarHeader className="h-16 flex items-center border-b px-4">
            <div className="flex items-center gap-2 font-semibold">
              <BarChart className="h-6 w-6" />
              <span>Dashboard</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                  <Home /> Home
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            
          </SidebarFooter>
        </Sidebar>
      </SheetContent>
    </Sheet>
  );
};