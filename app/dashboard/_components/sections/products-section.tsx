"use client"

import { IconExternalLink, IconBox } from "@tabler/icons-react"
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
import type { Product } from "@/types"

const products: Product[] = [
  {
    id: "prod_1",
    name: "Camiseta Oversized Branca",
    slug: "camiseta-oversized-branca",
    description: "Camiseta unissex em algodão orgânico com caimento leve.",
    price: "89.90",
    category: "Moda Masculina",
    isActive: true,
    isHighlighted: true,
    imageUrl: "/images/placeholder.svg",
    images: [],
    userId: "user_123",
    catalogs: ["catlg_1"],
    createdAt: "2025-03-01T10:00:00.000Z",
    updatedAt: "2025-03-10T15:45:00.000Z",
  },
  {
    id: "prod_2",
    name: "Smartwatch NeoX",
    slug: "smartwatch-neox",
    description: "Relógio inteligente com monitoramento de saúde e GPS.",
    price: "599.90",
    category: "Tecnologia",
    isActive: true,
    isHighlighted: false,
    imageUrl: "/images/placeholder.svg",
    images: [],
    userId: "user_123",
    catalogs: ["catlg_2"],
    createdAt: "2025-02-15T08:30:00.000Z",
    updatedAt: "2025-03-12T14:20:00.000Z",
  },
  {
    id: "prod_3",
    name: "Tênis Eco Vibe",
    slug: "tenis-eco-vibe",
    description: "Tênis feito com materiais reciclados, estilo casual.",
    price: "279.00",
    category: "Calçados",
    isActive: true,
    isHighlighted: true,
    imageUrl: "/images/placeholder.svg",
    images: [],
    userId: "user_123",
    catalogs: ["catlg_4"],
    createdAt: "2025-03-05T12:00:00.000Z",
    updatedAt: "2025-03-18T09:00:00.000Z",
  },
  {
    id: "prod_4",
    name: "Fone de Ouvido Bluetooth AirFlow",
    slug: "fone-ouvido-airflow",
    description: "Som imersivo com cancelamento de ruído ativo.",
    price: "399.99",
    category: "Acessórios",
    isActive: false,
    isHighlighted: false,
    imageUrl: "/images/placeholder.svg",
    images: [],
    userId: "user_123",
    catalogs: ["catlg_2", "catlg_3"],
    createdAt: "2025-01-20T14:40:00.000Z",
    updatedAt: "2025-03-05T18:15:00.000Z",
  },
]

export const ProductSection = () => {
  return (
    <SectionContainer
      title="Mais vendidos"
      actionText="Ver produtos"
      actionHref="/products"
    >
      <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="@container/card">
            <CardHeader>
              <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
                <IconBox className="w-4 h-4" />
                Produto
              </CardDescription>
              <CardTitle className="text-xl font-semibold leading-snug line-clamp-2">
                {product.name}
              </CardTitle>
              <CardAction>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center gap-1"
                  >
                    Ver produto
                    <IconExternalLink className="w-3 h-3" />
                  </Link>
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex flex-col h-full justify-between">
              <div className="flex flex-col items-start gap-1.5 text-sm">
                {product.description && (
                  <p className="line-clamp-2">{product.description}</p>
                )}
                <span className="text-muted-foreground text-xs">
                  R$ {Number(product.price).toFixed(2)}
                </span>
                <span className="text-muted-foreground text-xs">
                  Categoria: {product.category ?? "Não especificada"}
                </span>
                <span className="text-muted-foreground text-xs">
                  Criado em: {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={160}
                  height={160}
                  className="mt-2 rounded w-full object-cover aspect-[4/3]"
                />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionContainer>
  )
}
