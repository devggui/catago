"use client"

import { IconAlertCircle, IconCreditCard, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { useAuth } from "@/hooks/auth"
import { useOnboarding } from "@/hooks/onboarding"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export interface NavProps {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}

export function NavMain({ items }: NavProps) {
  const { user, isLoading } = useAuth()
  const { isOnboarded, daysLeft } = useOnboarding({ user })

  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {!isLoading && (
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <Alert
                variant={isOnboarded ? "destructive" : "default"}
                className="mb-2"
              >
                <IconAlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {isOnboarded
                    ? "Seu período de teste acabou"
                    : `${daysLeft} ${daysLeft === 1 ? "dia" : "dias"} restantes`}
                </AlertTitle>
                <AlertDescription className="text-xs">
                  {isOnboarded
                    ? "Assine agora para continuar usando todos os recursos."
                    : "Seu período de teste gratuito está acabando."}
                  {isOnboarded && (
                    <Button size="sm" className="mt-2 w-full" asChild>
                      <Link href="/pagamento">
                        <IconCreditCard className="mr-2 h-3 w-3" />
                        Assinar agora
                      </Link>
                    </Button>
                  )}
                </AlertDescription>
              </Alert>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url

            return (
              <SidebarMenuItem
                key={item.title}
                className={cn(isActive ? "bg-muted rounded-md" : "")}
              >
                <SidebarMenuButton tooltip={item.title} asChild>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
