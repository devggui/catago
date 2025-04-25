export type Product = {
  id: string
  name: string
  slug: string
  description?: string
  price: number
  category?: string
  isActive: boolean
  isHighlighted: boolean
  imageUrl: string
  images: string[]
  status: boolean
}
