"use client"

import { Product } from "@/types"
import { createContext, useContext, useState } from "react"

type ListProps = {
  items: Product[]
  loading: boolean
}

type UpdateListOptions = Partial<ListProps>

export type ProductContextProps = {
  list: ListProps
  updateList: (options: UpdateListOptions) => void
}

export const ProductContext = createContext<ProductContextProps>({
  list: {
    items: [],
    loading: false,
  },
  updateList: () => undefined,
})

export const useProductContext = () => useContext(ProductContext)

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode => {
  const [list, setList] = useState<ListProps>({
    items: [],
    loading: false,
  })

  const updateList = (options: UpdateListOptions) => {
    setList((prevList) => ({
      ...prevList,
      ...options,
    }))
  }

  return (
    <ProductContext.Provider value={{ list, updateList }}>
      {children}
    </ProductContext.Provider>
  )
}
