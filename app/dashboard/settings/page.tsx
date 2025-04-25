"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "../_components/site-header"
import { SiteContainer } from "../_components/site-container"
import { useAuth } from "@/hooks/auth"
import { ProfileTab } from "./_components/profile"
import { SecurityTab } from "./_components/security"

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <>
      <SiteHeader page="Configurações" />

      <SiteContainer>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="account">Conta</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-6">
            <ProfileTab user={user} />
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <SecurityTab />
          </TabsContent>
        </Tabs>
      </SiteContainer>
    </>
  )
}
