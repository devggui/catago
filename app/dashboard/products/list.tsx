"use client"

import { columns } from "@/app/dashboard/products/columns"
import { useProductContext } from "@/app/dashboard/products/context"
import { DataTable } from "@/app/dashboard/products/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/services/api"
import type { Product } from "@/types"
import { useEffect } from "react"
import { toast } from "sonner"

type ProductListProps = {
  version: number
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export const ProductList = ({
  version,
  onEdit,
  onDelete,
}: ProductListProps) => {
  const { list, updateList } = useProductContext()

  const loadProducts = async () => {
    try {
      updateList({ loading: true })
      const { data } = await api.get<Product[]>("/products")
      updateList({ items: data })
    } catch {
      toast("Ooops!", {
        description: "Não foi possível carregar a relação de produtos.",
      })
    } finally {
      updateList({ loading: false })
    }
  }

  useEffect(() => {
    loadProducts()
  }, [version])

  return (
    <div>
      {list.loading && <ProductListLoading />}
      {!list.loading && (
        <DataTable columns={columns({ onEdit, onDelete })} data={list.items} />
      )}
    </div>
  )
}

export const ProductListLoading = () => {
  return (
    <div className="overflow-hidden rounded-md border">
      <Skeleton className="h-12 w-full border-b" />
      {[...Array(5)].map((_, index) => (
        <Skeleton
          key={`Product-loading-item-${index}`}
          className="h-16 w-full rounded-none border-b last:border-b-0"
        />
      ))}
    </div>
  )
}
