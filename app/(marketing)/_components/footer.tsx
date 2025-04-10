import Link from "next/link"
import { Logo } from "@/app/_components/logo"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-12">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:gap-8 md:px-6">
        <Logo />
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="/terms"
            target="_blank"
            className="text-sm hover:underline underline-offset-4"
          >
            Termos
          </Link>
          <Link
            href="/privacy"
            target="_blank"
            className="text-sm hover:underline underline-offset-4"
          >
            Privacidade
          </Link>
        </nav>
        <div className="md:ml-auto flex gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CataGo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
