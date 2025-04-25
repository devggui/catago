import type { PropsWithChildren } from "react"
import { CatalogContextProvider } from "./context"

export default function CatalogsLayout({ children }: PropsWithChildren) {
  return <CatalogContextProvider>{children}</CatalogContextProvider>
}
