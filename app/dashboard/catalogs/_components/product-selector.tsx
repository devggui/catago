"use client"

import { useState } from "react"
import { CheckIcon, PlusIcon, SearchIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import Image from "next/image"
import type { Product } from "@/types"

interface ProductSelectorProps {
  selectedProducts: Product[]
  onProductsChange: (products: Product[]) => void
  availableProducts?: Product[]
  className?: string
}

export const ProductSelector = ({
  selectedProducts,
  onProductsChange,
  availableProducts,
  className,
}: ProductSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("")

  const filteredProducts = availableProducts?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isProductSelected = (productId: string) => {
    return selectedProducts.some((p) => p.id === productId)
  }

  const toggleProduct = (product: Product) => {
    if (isProductSelected(product.id)) {
      onProductsChange(selectedProducts.filter((p) => p.id !== product.id))
    } else {
      onProductsChange([...selectedProducts, product])
    }
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar produtos..."
            className="w-full bg-background pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <h3 className="mb-2 text-sm font-medium">Produtos Disponíveis</h3>
          <ScrollArea className="h-[300px] rounded-md border">
            <div className="p-2">
              {filteredProducts?.length === 0 ? (
                <div className="flex h-[200px] items-center justify-center text-center">
                  <p className="text-sm text-muted-foreground">
                    Nenhum produto encontrado
                  </p>
                </div>
              ) : (
                filteredProducts?.map((product) => (
                  <div
                    key={product.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-muted",
                      isProductSelected(product.id) && "bg-muted"
                    )}
                    onClick={() => toggleProduct(product)}
                  >
                    <div className="h-10 w-10 overflow-hidden rounded-md border bg-background">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          width={0}
                          height={0}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <span className="text-xs text-muted-foreground">
                            No img
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 truncate">
                      <p className="truncate text-sm font-medium">
                        {product.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        ${product.price}
                      </p>
                    </div>
                    <Button
                      variant={
                        isProductSelected(product.id) ? "secondary" : "outline"
                      }
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleProduct(product)
                      }}
                    >
                      {isProductSelected(product.id) ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : (
                        <PlusIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-2 text-sm font-medium">
            Produtos Selecionados ({selectedProducts.length})
          </h3>
          <ScrollArea className="h-[300px] rounded-md border">
            <div className="p-2">
              {selectedProducts.length === 0 ? (
                <div className="flex h-[200px] items-center justify-center text-center">
                  <p className="text-sm text-muted-foreground">
                    Nenhum produto selecionado
                  </p>
                </div>
              ) : (
                selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-2 rounded-md p-2 hover:bg-muted"
                  >
                    <div className="h-10 w-10 overflow-hidden rounded-md border bg-background">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          width={0}
                          height={0}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <span className="text-xs text-muted-foreground">
                            Sem imagem
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 truncate">
                      <p className="truncate text-sm font-medium">
                        {product.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        R${product.price}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => toggleProduct(product)}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
