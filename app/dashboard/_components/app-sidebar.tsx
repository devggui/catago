"use client"

import * as React from "react"
import {
  IconDashboard,
  IconListDetails,
  IconSettings,
  IconShoppingBag,
} from "@tabler/icons-react"

import { NavMain } from "@/app/dashboard/_components/nav-main"
import { NavSecondary } from "@/app/dashboard/_components/nav-secondary"
import { NavUser } from "@/app/dashboard/_components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Logo } from "@/app/_components/logo"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Produtos",
      url: "/products",
      icon: IconListDetails,
    },
    {
      title: "Catálogos",
      url: "/catalog",
      icon: IconShoppingBag,
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "/settings",
      icon: IconSettings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Logo url="/dashboard" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
