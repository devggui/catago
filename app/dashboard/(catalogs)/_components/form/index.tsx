"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/services/api"
import { Catalog } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { CatalogFormSchema } from "./schema"
import { z } from "zod"

type CatalogFormData = z.infer<typeof CatalogFormSchema>

type CatalogFormProps = {
  buttonClassName?: string
  isOpen: boolean
  initialData?: Catalog
  onOpenChange: (value: boolean) => void
  onCreate: () => void
  onSuccess?: () => void
}

export const CatalogForm = ({
  buttonClassName,
  isOpen,
  initialData,
  onOpenChange,
  onCreate,
  onSuccess,
}: CatalogFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CatalogFormData>({
    resolver: zodResolver(CatalogFormSchema),
  })

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof CatalogFormData, value as string)
      })
    } else {
      reset()
    }
  }, [isOpen])

  const sendForm = async ({ ...data }: CatalogFormData): Promise<void> => {
    if (initialData?.id) await update(initialData.id, data)
    else await store(data)
  }

  const store = async (data: CatalogFormData): Promise<void> => {
    try {
      await api.post("/Catalogs", data)
      onSuccess?.()
      onOpenChange(false)
    } catch {
      toast("Ooops!", {
        description: "Não foi possível cadastrar o catálogo",
      })
    }
  }

  const update = async (id: string, data: CatalogFormData): Promise<void> => {
    try {
      await api.patch(`/Catalogs/${id}`, data)
      onSuccess?.()
      onOpenChange(false)
    } catch {
      toast("Ooops!", {
        description: "Não foi possível atualizar os dados do catálogo",
      })
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <Button className={buttonClassName} onClick={onCreate}>
        Cadastrar catálogo
      </Button>
      <DrawerContent>
        <DrawerHeader className="mx-auto max-w-md w-full">
          <DrawerTitle>Novo catálogo</DrawerTitle>
          <DrawerDescription>
            Insira as informações do seu catálogo
          </DrawerDescription>
        </DrawerHeader>
        <div className="mx-auto w-full max-w-md">
          <form
            className="flex flex-col gap-6 p-4"
            onSubmit={handleSubmit(sendForm)}
            id="catalog-form"
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Nome do catálogo"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="colecao-verao-2025"
                {...register("slug")}
              />
              {errors.slug && (
                <span className="text-sm text-red-500">
                  {errors.slug.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                placeholder="Descrição do catálogo"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-sm text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
          </form>
          <DrawerFooter>
            <Button type="submit" form="Catalog-form" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Confirmar
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" disabled={isSubmitting}>
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
