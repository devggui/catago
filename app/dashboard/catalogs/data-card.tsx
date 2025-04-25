"use client"

import type { Catalog } from "@/types"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  IconFolder,
  IconDotsVertical,
  IconShoppingBag,
} from "@tabler/icons-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { CatalogPreviewDialog } from "./_components/catalog-preview-dialog"
import { useState } from "react"
import { toast } from "sonner"
import { Copy, Edit, Eye, Trash } from "lucide-react"

interface DataCardProps {
  actions: {
    onEdit: (data: Catalog) => void
    onDelete: (data: Catalog) => void
  }
  data: Catalog[]
}

export function DataCard({ actions, data }: DataCardProps) {
  const [previewCatalog, setPreviewCatalog] = useState<Catalog | null>(null)

  const handleCopyLink = (catalogSlug: string) => {
    const link = `${window.location.origin}/catalog/${catalogSlug}`
    navigator.clipboard.writeText(link)
    toast.success("Sucesso!", {
      description: "Link do catálogo copiado com sucesso!",
    })
  }

  return (
    <div
      className={cn(
        data.length > 0
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 rounded-md"
          : ""
      )}
    >
      {data.length > 0 ? (
        data.map((catalog) => (
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
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer">
                    <IconDotsVertical />
                    <span className="sr-only">Open menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => setPreviewCatalog(catalog)}
                    >
                      <Eye />
                      Visualização
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleCopyLink(catalog.slug)}
                    >
                      <Copy />
                      Copiar link
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => actions.onEdit(catalog)}>
                      <Edit />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => actions.onDelete(catalog)}
                    >
                      <Trash className="text-destructive" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
        ))
      ) : (
        <div className="flex flex-col gap-1 items-center justify-center w-full">
          <IconShoppingBag className="size-14 text-primary" />
          <span className="text-muted-foreground">
            Nenhum catálogo cadastrado
          </span>
        </div>
      )}

      {previewCatalog && (
        <CatalogPreviewDialog
          catalog={previewCatalog}
          open={!!previewCatalog}
          onOpenChange={() => setPreviewCatalog(null)}
        />
      )}
    </div>
  )
}
