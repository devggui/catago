"use client"

import { ShoppingBagIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore, type CartItem as CartItemType } from "@/stores/cart"
import Image from "next/image"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <div className="flex items-center gap-4 py-3">
      <div className="h-16 w-16 overflow-hidden rounded-md border bg-muted">
        {item.image ? (
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            width={0}
            height={0}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ShoppingBagIcon className="h-6 w-6 text-muted-foreground/30" />
          </div>
        )}
      </div>

      <div className="flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-muted-foreground">
          R${item.price.toFixed(2)}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <span className="w-6 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-medium">
          R${(item.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-1 h-auto p-0 text-xs text-muted-foreground hover:text-destructive"
          onClick={() => removeItem(item.id)}
        >
          Remover
        </Button>
      </div>
    </div>
  )
}
