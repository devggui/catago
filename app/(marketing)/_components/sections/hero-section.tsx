import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Crie seu catálogo de produtos com facilidade
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Uma plataforma moderna para criar seu catálogo de produtos e
                compartilhar com seus clientes.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/register">
                  Começar agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full md:h-[450px] lg:h-[450px]">
              <Image
                src="/images/catalog-banner.svg"
                alt="Dashboard do Catalogo"
                fill
                className="rounded-lg object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
