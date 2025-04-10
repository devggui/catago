export type Catalog = {
  id: string
  name: string
  slug: string
  description?: string | null
  logo?: string | null
  userId: string
  createdAt: string | Date
  updatedAt: string | Date
}
