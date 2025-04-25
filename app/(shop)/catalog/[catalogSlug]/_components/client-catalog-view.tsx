"use client"

import { useState } from "react"
import { SearchIcon, ShoppingBagIcon, ShoppingCartIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/stores/cart"
import type { Catalog } from "@/types"
import { CartSheet } from "./cart/cart-sheet"
import Image from "next/image"
import { AddToCartButton } from "./cart/add-to-cart-button"
import { cn } from "@/lib/utils"
import { LogoIcon } from "@/app/_components/logo"

interface ClientCatalogView {
  catalog: Catalog
  isPreview?: boolean
}

export const ClientCatalogView = ({
  catalog,
  isPreview,
}: ClientCatalogView) => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { itemCount } = useCartStore()

  const filteredProducts = catalog.products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div
      className={cn(" bg-background", isPreview ? "h-full" : "min-h-screen")}
    >
      <header className="sticky top-0 z-10 bg-background">
        <div className="container mx-auto flex items-center justify-end p-4">
          <CartSheet whatsapp={catalog.whatsapp}>
            <Button
              variant="outline"
              size="sm"
              className="relative"
              disabled={isPreview}
            >
              <ShoppingCartIcon className="h-4 w-4" />
              <span className="ml-2">Carrinho</span>
              {itemCount > 0 && (
                <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </CartSheet>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center">
        {catalog.logo ? (
          <Image
            src={catalog.logo || "/placeholder.svg"}
            alt={catalog.name}
            width={128}
            height={128}
          />
        ) : (
          <div className="flex h-40 w-full items-center justify-center bg-muted my-6">
            <LogoIcon className="h-16 w-16 text-muted-foreground/30" />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{catalog.name}</h1>
          {catalog.description && (
            <p className="text-sm text-muted-foreground">
              {catalog.description}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative md:max-w-xs w-full">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Procurar produtos..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts?.length === 0 ? (
            <div className="col-span-full flex h-40 items-center justify-center rounded-lg border border-dashed">
              <div className="flex flex-col items-center gap-1 text-center">
                <ShoppingBagIcon className="h-10 w-10 text-muted-foreground/50" />
                <h3 className="text-lg font-medium">
                  Nenhum produto encontrado
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tente ajustar os filtros.
                </p>
              </div>
            </div>
          ) : (
            filteredProducts?.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden transition-all hover:shadow-md"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ShoppingBagIcon className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold">
                      R${Number(product.price).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="border-t">
                  <AddToCartButton
                    product={{
                      id: product.id,
                      name: product.name,
                      price: Number(product.price),
                      description: product.description,
                      image: product.imageUrl,
                    }}
                    className="w-full"
                    disabled={isPreview}
                  />
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
