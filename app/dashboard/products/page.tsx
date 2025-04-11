"use client"

import { api } from "@/services/api"
import { toast } from "sonner"
import { Suspense, useState } from "react"
import type { Product } from "@/types"
import { DeleteDialog } from "@/components/ui/delete-dialog"
import { ProductList, ProductListLoading } from "./list"
import { ProductForm } from "./_components/form"

export default function ProductsPage() {
  const [version, setVersion] = useState<number>(0)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<Product>()

  const handleFormOpenChange = (value: boolean): void => {
    setIsFormOpen(value)
  }

  const handleDeleteDialogOpenChange = (value: boolean): void => {
    setIsDeleteDialogOpen(value)
  }

  const handleCreate = () => {
    setSelectedProduct(undefined)
    setIsFormOpen(true)
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsFormOpen(true)
  }

  const handleDelete = (product: Product) => {
    setSelectedProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      setIsDeleteLoading(true)
      await api.delete(`/products/${selectedProduct?.id}`)
      setSelectedProduct(undefined)
      setIsDeleteDialogOpen(false)
      setVersion(version + 1)
    } catch {
      toast("Ooops!", { description: "Não foi possível excluir o produto." })
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <>
      <ProductForm
        buttonClassName="mb-4 w-max self-end"
        isOpen={isFormOpen}
        initialData={selectedProduct}
        onOpenChange={handleFormOpenChange}
        onCreate={handleCreate}
        onSuccess={() => setVersion(version + 1)}
      />
      <Suspense fallback={<ProductListLoading />}>
        <ProductList
          version={version}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Suspense>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogOpenChange}
        onSubmit={handleConfirmDelete}
        isLoading={isDeleteLoading}
        title="Tem certeza que deseja excluir esse produto?"
        description="Essa ação é irreversível."
      />
    </>
  )
}
