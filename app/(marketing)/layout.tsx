import type { PropsWithChildren } from "react"
import { Header } from "./_components/header"
import { Footer } from "./_components/footer"

export default function LandingPageLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
