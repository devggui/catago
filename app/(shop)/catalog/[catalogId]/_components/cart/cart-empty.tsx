import { ShoppingBagIcon } from "lucide-react"

export function CartEmpty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-12">
      <ShoppingBagIcon className="h-12 w-12 text-muted-foreground/50" />
      <div className="text-center">
        <h3 className="text-lg font-medium">Your cart is empty</h3>
        <p className="text-sm text-muted-foreground">
          Add items to your cart to get started.
        </p>
      </div>
    </div>
  )
}
