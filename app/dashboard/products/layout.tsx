import type { PropsWithChildren } from "react"
import { SiteContainer } from "../_components/site-container"
import { SiteHeader } from "../_components/site-header"
import { ProductContextProvider } from "./context"

export default function ProductsLayout({ children }: PropsWithChildren) {
  return (
    <ProductContextProvider>
      <SiteHeader page="Produtos" />
      <SiteContainer>{children}</SiteContainer>
    </ProductContextProvider>
  )
}
