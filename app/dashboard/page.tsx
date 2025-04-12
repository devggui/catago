import Link from "next/link"
import { SiteHeader } from "./_components/site-header"
import { useAuth } from "@/hooks/auth/server"
import { authMiddlewareEnum } from "@/hooks/auth/types"

export default async function DashboardPage() {
  const { user } = await useAuth({ middleware: authMiddlewareEnum.auth })
  const firstName = user?.name.split(" ").shift()

  return (
    <>
      <SiteHeader page={`Olá, ${firstName}`} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-4 lg:px-6 py-6">
        <div className="relative flex aspect-video w-full items-end justify-end rounded-xl bg-secondary p-4 transition-transform hover:scale-105">
          <Link
            href="/dashboard/catalogs"
            className="absolute left-0 top-0 h-full w-full"
          />
          <span className="text-lg font-semibold text-muted-foreground">
            Catálogos
          </span>
        </div>
        <div className="relative flex aspect-video w-full items-end justify-end rounded-xl bg-secondary p-4 transition-transform hover:scale-105">
          <Link
            href="/dashboard/products"
            className="absolute left-0 top-0 h-full w-full"
          />
          <span className="text-lg font-semibold text-muted-foreground">
            Produtos
          </span>
        </div>
      </div>
    </>
  )
}
