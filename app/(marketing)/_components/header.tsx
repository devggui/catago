import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/app/_components/theme-switcher"
import { Logo } from "@/app/_components/logo"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="#features"
            className="transition-colors hover:text-foreground/80"
          >
            Recursos
          </Link>
          <Link
            href="#pricing"
            className="transition-colors hover:text-foreground/80"
          >
            Preços
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Começar grátis</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
