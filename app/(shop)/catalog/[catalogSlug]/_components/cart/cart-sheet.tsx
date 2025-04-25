"use client"

import type React from "react"

import { ShoppingBagIcon } from "lucide-react"

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
import { onlyNumbers } from "@/helpers/only-numbers"

interface CartSheetProps {
  whatsapp: string
  children?: React.ReactNode
}

export function CartSheet({ whatsapp, children }: CartSheetProps) {
  const { items, itemCount, totalAmount, clearCart } = useCartStore()

  const handleCheckout = () => {
    if (items.length === 0) return

    const messageLines = items.map(
      (item) => `- ${item.quantity}x ${item.name} (R$${item.price.toFixed(2)})`
    )

    const total = `\nTotal: R$${totalAmount.toFixed(2)}`
    const fullMessage = `Olá, gostaria de comprar:\n${messageLines.join("\n")}${total}`

    const encodedMessage = encodeURIComponent(fullMessage)
    const whatsappNumber = onlyNumbers(whatsapp)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="relative">
            <ShoppingBagIcon className="h-4 w-4" />
            <span className="ml-2">Carrinho</span>
            {itemCount > 0 && (
              <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {itemCount}
              </Badge>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="flex flex-col max-w-md min-w-md">
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="flex flex-1 flex-col p-4">
            <div className="flex-1 overflow-auto">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between py-2">
                <span>Subtotal</span>
                <span className="font-medium">R${totalAmount.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between py-2">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-bold">
                  R${totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <Button className="flex-1" size="lg" onClick={handleCheckout}>
                  Finalizar
                </Button>
                <Button variant="outline" size="lg" onClick={clearCart}>
                  Limpar Carrinho
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
