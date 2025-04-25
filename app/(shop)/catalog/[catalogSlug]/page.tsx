import { notFound } from "next/navigation"
import { ClientCatalogView } from "./_components/client-catalog-view"

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ catalogSlug: string }>
}) {
  const { catalogSlug } = await params

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/catalogs/${catalogSlug}`
  )

  if (!data.ok) {
    notFound()
  }

  const catalog = await data.json()

  return <ClientCatalogView catalog={catalog} />
}
