import { CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="w-full bg-muted/40 py-12 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Preços
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Plano simples e acessível
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experimente gratuitamente por 14 dias, sem compromisso. Depois,
              apenas R$14,99 por mês.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-md py-12">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-lg">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-primary bg-primary/10 px-3 py-1 text-xs text-primary">
                14 dias grátis
              </div>
              <h3 className="text-2xl font-bold">Plano Completo</h3>
              <p className="text-muted-foreground">
                Tudo que você precisa para gerenciar seu catálogo
              </p>
            </div>
            <div className="mt-4 flex items-baseline">
              <span className="text-5xl font-bold">R$14,99</span>
              <span className="ml-1 text-base font-medium text-muted-foreground">
                /mês
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="ml-2 h-4 w-4 cursor-help text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-sm">
                      Após o período de teste gratuito de 14 dias, você será
                      cobrado R$14,99 por mês.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Primeiro acesso gratuito por 14 dias. Cancele a qualquer momento.
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                <span>Catálogo centralizado</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                <span>Compartilhamento do catálogo</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                <span>Até 1.000 produtos</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                <span>Atualizações gratuitas</span>
              </li>
            </ul>
            <Button className="mt-8" size="lg">
              <Link href="/dashboard">Começar teste gratuito</Link>
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Não é necessário cartão de crédito para o período de teste
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
