import { SiteHeader } from "./_components/site-header"
import { CatalogSection } from "./_components/sections/catalog-section"
import { ProductSection } from "./_components/sections/products-section"

export default function DashboardPage() {
  return (
    <>
      <SiteHeader page="Dashboard" />

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <CatalogSection />
            <ProductSection />
          </div>
        </div>
      </div>
    </>
  )
}
