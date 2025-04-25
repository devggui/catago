import { ShoppingBagIcon } from "lucide-react"

export default function CatalogNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <ShoppingBagIcon className="h-16 w-16 text-muted-foreground/50" />
      <h1 className="mt-6 text-3xl font-bold">Catálogo Não Encontrado</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        O catálogo que você está procurando não existe mais ou pode ter sido
        removido.
      </p>
    </div>
  )
}
