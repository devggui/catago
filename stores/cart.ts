import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartItem = {
  id: string
  name: string
  price: number
  image?: string
  quantity: number
  description?: string
}

type CartStore = {
  items: CartItem[]
  itemCount: number
  totalAmount: number
  addItem: (product: Omit<CartItem, "quantity">) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      totalAmount: 0,

      addItem: (product) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === product.id)

        let newItems: CartItem[]

        if (existingItem) {
          newItems = currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        } else {
          newItems = [...currentItems, { ...product, quantity: 1 }]
        }

        set({
          items: newItems,
          itemCount: calculateItemCount(newItems),
          totalAmount: calculateTotalAmount(newItems),
        })
      },

      removeItem: (productId) => {
        const newItems = get().items.filter((item) => item.id !== productId)

        set({
          items: newItems,
          itemCount: calculateItemCount(newItems),
          totalAmount: calculateTotalAmount(newItems),
        })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return

        const newItems = get().items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )

        set({
          items: newItems,
          itemCount: calculateItemCount(newItems),
          totalAmount: calculateTotalAmount(newItems),
        })
      },

      clearCart: () => {
        set({ items: [], itemCount: 0, totalAmount: 0 })
      },
    }),
    {
      name: "shopping-cart",
      // Optional: customize storage
      // storage: createJSONStorage(() => sessionStorage)
    }
  )
)

// Helper functions
function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}

function calculateTotalAmount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}
