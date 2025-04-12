"use client"

import { api } from "@/services/api"
import { toast } from "sonner"
import { Suspense, useState } from "react"
import type { Catalog } from "@/types"
import { DeleteDialog } from "@/components/ui/delete-dialog"
import { CatalogList, CatalogListLoading } from "./list"
import { CatalogForm } from "./_components/form"

export default function CatalogsPage() {
  const [version, setVersion] = useState<number>(0)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)
  const [selectedCatalog, setSelectedCatalog] = useState<Catalog>()

  const handleFormOpenChange = (value: boolean): void => {
    setIsFormOpen(value)
  }

  const handleDeleteDialogOpenChange = (value: boolean): void => {
    setIsDeleteDialogOpen(value)
  }

  const handleCreate = () => {
    setSelectedCatalog(undefined)
    setIsFormOpen(true)
  }

  const handleEdit = (Catalog: Catalog) => {
    setSelectedCatalog(Catalog)
    setIsFormOpen(true)
  }

  const handleDelete = (Catalog: Catalog) => {
    setSelectedCatalog(Catalog)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      setIsDeleteLoading(true)
      await api.delete(`/catalogs/${selectedCatalog?.id}`)
      setSelectedCatalog(undefined)
      setIsDeleteDialogOpen(false)
      setVersion(version + 1)
    } catch {
      toast("Ooops!", { description: "Não foi possível excluir o catálogo." })
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <>
      <CatalogForm
        buttonClassName="mb-4 w-max self-end"
        isOpen={isFormOpen}
        initialData={selectedCatalog}
        onOpenChange={handleFormOpenChange}
        onCreate={handleCreate}
        onSuccess={() => setVersion(version + 1)}
      />
      <Suspense fallback={<CatalogListLoading />}>
        <CatalogList
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
        title="Tem certeza que deseja excluir esse catálogo?"
        description="Essa ação é irreversível."
      />
    </>
  )
}
