import type { Product } from "./product"

export type Catalog = {
  id: string
  name: string
  slug: string
  description?: string | null
  logo?: string | null
  products?: Product[]
  status: boolean
  userId: string
  createdAt: string | Date
  updatedAt: string | Date
}
