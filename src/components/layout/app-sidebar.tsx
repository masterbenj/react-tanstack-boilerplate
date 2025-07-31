import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from "../ui/sidebar";
import { ChevronDown, ChevronUp, type LucideIcon, Monitor, User2 } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Tailwind } from "@style-types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { useLogoutModal } from "./logout-provider"; 
import { env } from "@/env";

export type SidebarMenuItem = {
  title         :   string
  url           ?:  string
  icon          ?:  LucideIcon
  iconColor     ?:  Tailwind.TextColor
  sidebarOnly   ?:  boolean
  isHidden      ?:  boolean
  isCollapsible ?:  boolean
  subItems      ?:  SidebarMenuItem[]
}

type SidebarProps = {
  className   ?:  string
  items       :   SidebarMenuItem[]
}

export const AppSidebar: React.FC<SidebarProps> = ({
  className,
  items
}) => {
  const { state } = useSidebar()
  const { navigate } = useRouter()

  const { showLogoutModal } = useLogoutModal()

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "fixed top-0 left-0 h-screen border-r bg-background transition-all duration-300 z-20",
        "hidden",
        className
      )}
    >
      <SidebarHeader className="h-16 flex items-center border-b px-4 justify-between">
        <div className={cn("flex items-center gap-2 font-semibold mt-3", state === "collapsed" && "lg:hidden")}>
          <Monitor size={18} />
          <span>{ env.VITE_APP_NAME }</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        { items.map((item, i) => (
          !item.isHidden &&
          <SidebarMenu key={i}>
            { item.isCollapsible
              ? <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full hover:bg-accent/50 transition-all duration-200 group-data-[state=open]/collapsible:bg-accent/30 cursor-pointer">
                        { item.icon && <item.icon className={item.iconColor ?? "text-blue-400"} /> }
                        <span>{ item.title }</span>
                        <ChevronDown className="ml-auto h-4 w-4 transition-all duration-300 ease-in-out group-data-[state=closed]/collapsible:rotate-[-90deg] group-data-[state=closed]/collapsible:opacity-70" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="transition-all duration-300 ease-in-out">
                        <SidebarMenuSub>
                          { item.subItems && item.subItems.map((subItem, j) => (
                            <SidebarMenuSubItem 
                              className={cn(
                                "animate-in fade-in slide-in-from-top-1 duration-200",
                                `delay-${[0, 75, 100, 150, 200, 300, 500, 700][j] ?? 1000}`
                              )}
                              key={j}
                            >
                              <SidebarMenuSubButton asChild className="hover:bg-accent/50 transition-colors duration-200">
                                <Link to={subItem.url} activeProps={{ className: "font-bold bg-gray-200 dark:bg-gray-700" }}>
                                  { subItem.icon && <subItem.icon className="!text-green-600" /> }
                                  <span>{ subItem.title }</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )) }
                        </SidebarMenuSub>
                      </div>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              : <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} activeProps={{ className: "font-bold bg-gray-200 dark:bg-gray-700" }}>
                      { item.icon && <item.icon className={item.iconColor ?? "text-green-600"} /> }
                      <span>{ item.title }</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            }
          </SidebarMenu>
        )) }

      </SidebarContent>

      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[240px]"
                >
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate({ to: "/" })}>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={showLogoutModal}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  );
};