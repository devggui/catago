"use client"

import { Product } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"

type ColumnsProps = {
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export const columns = ({
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "isActive",
    header: "Ativo",
  },
  {
    accessorKey: "isHighlighted",
    header: "Destacado",
  },
  {
    accessorKey: "imageUrl",
    header: "Imagem",
  },
  {
    accessorKey: "images",
    header: "Imagens",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const student = row.original

      return (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onEdit(student)}
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Editar</span>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => onDelete(student)}
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Excluir</span>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
