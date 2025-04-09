export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  price: string // Prisma Decimal é convertido em string no client
  category: string | null
  isActive: boolean
  isHighlighted: boolean
  imageUrl: string | null
  images: ProductImage[]
  userId: string
  catalogs: Catalog[]
  createdAt: string
  updatedAt: string
}

export type ProductImage = {
  id: string
  url: string
  productId: string
  createdAt: string
}
