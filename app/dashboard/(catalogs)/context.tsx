"use client"

import { Catalog } from "@/types"
import { createContext, useContext, useState } from "react"

type ListProps = {
  items: Catalog[]
  loading: boolean
}

type UpdateListOptions = Partial<ListProps>

export type CatalogContextProps = {
  list: ListProps
  updateList: (options: UpdateListOptions) => void
}

export const CatalogContext = createContext<CatalogContextProps>({
  list: {
    items: [],
    loading: false,
  },
  updateList: () => undefined,
})

export const useCatalogContext = () => useContext(CatalogContext)

export const CatalogContextProvider = ({
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
    <CatalogContext.Provider value={{ list, updateList }}>
      {children}
    </CatalogContext.Provider>
  )
}
