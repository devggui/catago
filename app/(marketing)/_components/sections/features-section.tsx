import { Database, Rocket, Share2 } from "lucide-react"
import { FeatureCard } from "../cards/feature-card"

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full bg-muted/40 py-12 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Recursos
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Tudo que você precisa
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nossa plataforma oferece todas as ferramentas necessárias para
              gerenciar seu catálogo de produtos de forma eficiente.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Database className="h-6 w-6 text-primary" />}
            title="Catálogo centralizado"
            description="Gerencie todos os seus produtos em um único lugar com categorização avançada e metadados personalizáveis."
          />
          <FeatureCard
            icon={<Rocket className="h-6 w-6 text-primary" />}
            title="Fácil de usar"
            description="Interface intuitiva que permite gerenciar seu catálogo digital com rapidez e sem complicações, mesmo sem experiência técnica."
          />
          <FeatureCard
            icon={<Share2 className="h-6 w-6 text-primary" />}
            title="Compartilhamento do catálogo"
            description="Compartilhe seu catálogo com seus clientes, através de links personalizados."
          />
        </div>
      </div>
    </section>
  )
}
