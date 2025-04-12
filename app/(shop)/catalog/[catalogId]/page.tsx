import { notFound } from "next/navigation"
import { ClientCatalogView } from "./_components/client-catalog-view"
import { mockCatalogs } from "@/app/dashboard/catalogs/_components/mock-data"

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ catalogId: string }>
}) {
  const { catalogId } = await params
  const catalog = mockCatalogs.find((c) => c.id === catalogId)

  if (!catalog) {
    notFound()
  }

  return <ClientCatalogView catalog={catalog} />
}
