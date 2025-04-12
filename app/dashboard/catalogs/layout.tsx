import type { PropsWithChildren } from "react"
import { SiteContainer } from "../_components/site-container"
import { SiteHeader } from "../_components/site-header"
import { CatalogContextProvider } from "./context"

export default function CatalogsLayout({ children }: PropsWithChildren) {
  return (
    <CatalogContextProvider>
      <SiteHeader page="Catálogos" />
      <SiteContainer>{children}</SiteContainer>
    </CatalogContextProvider>
  )
}
