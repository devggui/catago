"use client"

import { IconExternalLink, IconFolder } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SectionContainer } from "./section-container"
import Link from "next/link"
import Image from "next/image"
import type { Catalog } from "@/types"

const catalogs: Catalog[] = [
  {
    id: "catlg_1",
    name: "Catálogo Verão 2025",
    slug: "catalogo-verao-2025",
    description: "Coleção vibrante com as tendências do verão.",
    logo: null,
    userId: "user_123",
    createdAt: "2025-01-10T12:00:00.000Z",
    updatedAt: "2025-03-01T15:30:00.000Z",
  },
  {
    id: "catlg_2",
    name: "Lançamentos Tecnológicos",
    slug: "lancamentos-tecnologicos",
    description: "As novidades mais esperadas do setor de tecnologia.",
    logo: null,
    userId: "user_123",
    createdAt: "2025-02-05T08:45:00.000Z",
    updatedAt: "2025-03-15T10:20:00.000Z",
  },
]

export const CatalogSection = () => {
  return (
    <SectionContainer
      title="Meus catálogos"
      actionText="Ver catálogos"
      actionHref="/catalogs"
    >
      <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {catalogs.map((catalog) => (
          <Card key={catalog.id} className="@container/card">
            <CardHeader>
              <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
                <IconFolder className="w-4 h-4" />
                Catálogo
              </CardDescription>
              <CardTitle className="text-2xl font-semibold leading-snug line-clamp-2">
                {catalog.name}
              </CardTitle>
              <CardAction>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Link
                    href={`/catalogs/${catalog.slug}`}
                    className="flex items-center gap-1"
                  >
                    Ver catálogo
                    <IconExternalLink className="w-3 h-3" />
                  </Link>
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              {catalog.description && (
                <p className="line-clamp-2">{catalog.description}</p>
              )}
              <span className="text-xs text-muted-foreground">
                Criado em: {new Date(catalog.createdAt).toLocaleDateString()}
              </span>
              {catalog.logo && (
                <Image
                  src={catalog.logo}
                  alt={catalog.name}
                  width={40}
                  height={40}
                  className="mt-2 rounded"
                />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionContainer>
  )
}
