export type Product = {
  id: string
  name: string
  slug: string
  description?: string
  price: string // Prisma Decimal é convertido em string no client
  category?: string
  isActive: boolean
  isHighlighted: boolean
  imageUrl: string
  images: ProductImage[]
}

export type ProductImage = {
  id: string
  url: string
  productId: string
  createdAt: string
}
