"use client"

import { useCatalogContext } from "@/app/dashboard/catalogs/context"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/services/api"
import type { Catalog } from "@/types"
import { useEffect } from "react"
import { toast } from "sonner"
import { DataCard } from "./data-card"

type CatalogListProps = {
  version: number
  onEdit: (Catalog: Catalog) => void
  onDelete: (Catalog: Catalog) => void
}

export const CatalogList = ({
  version,
  onEdit,
  onDelete,
}: CatalogListProps) => {
  const { list, updateList } = useCatalogContext()

  const loadCatalogs = async () => {
    try {
      updateList({ loading: true })
      const { data } = await api.get<Catalog[]>("/catalogs")
      updateList({ items: data })
    } catch {
      toast.error("Ooops!", {
        description: "Não foi possível carregar a relação de produtos.",
      })
    } finally {
      updateList({ loading: false })
    }
  }

  useEffect(() => {
    loadCatalogs()
  }, [version])

  return (
    <div>
      {list.loading && <CatalogListLoading />}
      {!list.loading && (
        <DataCard actions={{ onEdit, onDelete }} data={list.items} />
      )}
    </div>
  )
}

export const CatalogListLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 rounded-md">
      {[...Array(5)].map((_, index) => (
        <Skeleton
          key={`catalog-loading-item-${index}`}
          className="h-40 w-full rounded-md border-b last:border-b-0"
        />
      ))}
    </div>
  )
}
