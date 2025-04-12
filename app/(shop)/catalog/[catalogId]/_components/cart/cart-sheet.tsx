"use client"

import type React from "react"

import { ShoppingBagIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/stores/cart"
import { CartItem } from "./cart-item"
import { CartEmpty } from "./cart-empty"

interface CartSheetProps {
  children?: React.ReactNode
}

export function CartSheet({ children }: CartSheetProps) {
  const { items, itemCount, totalAmount, clearCart } = useCartStore()

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...")
    // In a real app, you would redirect to checkout page
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="relative">
            <ShoppingBagIcon className="h-4 w-4" />
            <span className="ml-2">Cart</span>
            {itemCount > 0 && (
              <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {itemCount}
              </Badge>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="flex flex-1 flex-col">
            <div className="flex-1 overflow-auto py-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between py-2">
                <span>Subtotal</span>
                <span className="font-medium">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between py-2">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-bold">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <Button className="flex-1" size="lg" onClick={handleCheckout}>
                  Checkout
                </Button>
                <Button variant="outline" size="lg" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
