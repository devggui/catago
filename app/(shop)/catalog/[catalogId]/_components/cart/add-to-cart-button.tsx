"use client"

import { ShoppingCartIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cart"

interface AddToCartButtonProps extends React.ComponentProps<"button"> {
  product: {
    id: string
    name: string
    price: number
    image?: string
    description?: string
  }
}

export function AddToCartButton({ product, ...props }: AddToCartButtonProps) {
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem(product)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <Button onClick={handleAddToCart} {...props}>
      <ShoppingCartIcon className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  )
}
