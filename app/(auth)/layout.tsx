import { Logo } from "@/app/_components/logo"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/auth/server"
import { authMiddlewareEnum } from "@/hooks/auth/types"
import { ThemeSwitcher } from "../_components/theme-switcher"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  await useAuth({
    middleware: authMiddlewareEnum.guest,
    redirectIfAuthenticated: "/dashboard",
  })

  return (
    <main className="flex min-h-screen w-full flex-1">
      <Button variant="ghost" className="fixed top-4 left-4">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft />
          Voltar ao início
        </Link>
      </Button>
      <div className="flex w-full items-center justify-center bg-background xl:w-5/12">
        <div className="flex w-full max-w-md flex-col gap-6 p-4">
          <Logo />
          {children}
          <Separator />
          <p className="text-sm text-muted-foreground">
            `© {new Date().getFullYear()} CircleSign - Todos os direitos
            reservados`
          </p>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
      <div className="before:bg-noise relative hidden w-7/12 items-center justify-center bg-primary before:pointer-events-none before:absolute before:inset-0 before:left-0 before:top-0 before:z-[999999] before:block before:h-full before:w-full before:bg-[length:200px_auto] before:opacity-30 before:content-[''] xl:flex">
        <div className="flex max-w-lg flex-col p-4">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-white">
            Painel de administrador favorito das empresas
          </h1>
          <p className="mb-8 leading-relaxed text-white/75">
            Gerencie e monitore seus produtos, sempre com segurança e muita
            simplicidade
          </p>
          <Button
            className="w-min whitespace-nowrap"
            variant="outline-in-primary"
            asChild
          >
            <a href="https://wa.me/5514998619263" target="_blank">
              Fale com a nossa equipe
            </a>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default AuthLayout
