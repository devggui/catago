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
    cell: (report) =>
      report.row.original.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "isActive",
    header: "Ativo",
    cell: (report) => (report.row.original.isActive ? "ATIVO" : "INÁTIVO"),
  },
  {
    accessorKey: "isHighlighted",
    header: "Destacado",
    cell: (report) =>
      report.row.original.isHighlighted ? "DESTACADO" : "NÃO DESTACADO",
  },
  {
    accessorKey: "imageUrl",
    header: "Imagem",
    cell: (report) =>
      report.row.original.imageUrl ? "1 imagem" : "Nenhuma imagem",
  },
  {
    accessorKey: "images",
    header: "Imagens",
    cell: (report) => {
      const images = report.row.original.images
      if (images.length === 0) {
        return "Nenhuma imagem"
      }
      return `${images.length} imagem(s)`
    },
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
