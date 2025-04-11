"use client"

import { useCatalogContext } from "@/app/dashboard/(catalogs)/context"
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
      const { data } = await api.get<Catalog[]>("/Catalogs")
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
    <div className="overflow-hidden rounded-md border">
      <Skeleton className="h-12 w-full border-b" />
      {[...Array(5)].map((_, index) => (
        <Skeleton
          key={`Catalog-loading-item-${index}`}
          className="h-16 w-full rounded-none border-b last:border-b-0"
        />
      ))}
    </div>
  )
}
