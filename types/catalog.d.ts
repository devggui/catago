import type { Product } from "./product"

export type Catalog = {
  id: string
  name: string
  slug: string
  description?: string | null
  logo?: string | null
  products?: Product[]
  isActive: boolean
  whatsapp: string
  userId: string
  createdAt: string | Date
  updatedAt: string | Date
}
