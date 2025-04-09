import { useAuth } from "@/hooks/auth/server"
import { authMiddlewareEnum } from "@/hooks/auth/types"
import { useOnboardingMiddleware } from "@/hooks/onboarding/middleware"
import type { PropsWithChildren } from "react"
import { AppSidebar } from "@/app/dashboard/_components/app-sidebar"
import { SiteHeader } from "@/app/dashboard/_components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const { user } = await useAuth({ middleware: authMiddlewareEnum.auth })
  await useOnboardingMiddleware({ user, isDashboardRoute: true })

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
