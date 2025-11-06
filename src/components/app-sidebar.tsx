import {  Home,Group } from "lucide-react"

import {Link} from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "../components/ui/sidebar"
import { useState } from "react"
import {useFirebase} from "../context/Firebase"



export function AppSidebar() {
   
  const { user } = useFirebase() 

   console.log(user?.email);
   
const [currentTab, setCurrentTab] = useState("Home")

        // Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
   onclick:() => setCurrentTab("Home")
  },
   {
    title: "Portfolio",
    url: "/portfolio",
    icon: Group ,
   onclick:() => setCurrentTab("Portfolio")

  },

]
 
  return (
    <Sidebar className="overflow-hidden">
    <SidebarHeader className="py-3.5">
    <SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton asChild>

  <Link to="/">
    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(79,70,229,0.5)] ">Qikk Space</h3>
    </Link>

    </SidebarMenuButton>
  </SidebarMenuItem>
</SidebarMenu>
      </SidebarHeader>


<SidebarSeparator className="border-b-1  border-neutral-600 " />

      <SidebarContent>

        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}  >
                  <SidebarMenuButton className={`my-2 text-md ${currentTab === item.title ? "bg:black/30" : "bg-transparent"}`} asChild>
                    <Link to={item.url} className="flex items-center gap-2 py-2 px-3 w-full">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>


       <SidebarFooter>
<SidebarMenu>
  <SidebarMenuItem>

 <div className="flex items-center gap-3 bg-neutral-800/50 hover:bg-neutral-800 transition-all rounded-xl p-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold">
          {user?.email?.[0]?.toUpperCase() || "G"}
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium text-white truncate max-w-[140px]">
            {user?.email || "Guest"}
          </span>
          <span className="text-xs text-gray-400">Logged in</span>
        </div>
      </div>

  </SidebarMenuItem>
</SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  )
}