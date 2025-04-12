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
import Link from "next/link"

interface DataCardProps {
  actions: {
    onEdit: (data: Catalog) => void
    onDelete: (data: Catalog) => void
  }
  data: Catalog[]
}

export function DataCard({ actions, data }: DataCardProps) {
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
          <Link key={catalog.id} href={`/dashboard/catalogs/${catalog.id}`}>
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
                      <DropdownMenuItem onClick={() => actions.onEdit(catalog)}>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => actions.onDelete(catalog)}
                      >
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
          </Link>
        ))
      ) : (
        <div className="flex flex-col gap-1 items-center justify-center w-full">
          <IconShoppingBag className="size-14 text-primary" />
          <span className="text-muted-foreground">
            Nenhum catálogo cadastrado
          </span>
        </div>
      )}
    </div>
  )
}
