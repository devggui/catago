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
import { Product, type ProductImage } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { ProductFormSchema } from "./schema"
import { z } from "zod"

type ProductFormData = z.infer<typeof ProductFormSchema>

type ProductFormProps = {
  buttonClassName?: string
  isOpen: boolean
  initialData?: Product
  onOpenChange: (value: boolean) => void
  onCreate: () => void
  onSuccess?: () => void
}

export const ProductForm = ({
  buttonClassName,
  isOpen,
  initialData,
  onOpenChange,
  onCreate,
  onSuccess,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductFormSchema),
  })

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(
          key as keyof ProductFormData,
          value as string | boolean | ProductImage[]
        )
      })
    } else {
      reset()
    }
  }, [isOpen])

  const sendForm = async ({ ...data }: ProductFormData): Promise<void> => {
    if (initialData?.id) await update(initialData.id, data)
    else await store(data)
  }

  const store = async (data: ProductFormData): Promise<void> => {
    try {
      await api.post("/products", data)
      onSuccess?.()
      onOpenChange(false)
    } catch {
      toast("Ooops!", {
        description: "Não foi possível cadastrar o produto",
      })
    }
  }

  const update = async (id: string, data: ProductFormData): Promise<void> => {
    try {
      await api.patch(`/products/${id}`, data)
      onSuccess?.()
      onOpenChange(false)
    } catch {
      toast("Ooops!", {
        description: "Não foi possível atualizar os dados do produto",
      })
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <Button className={buttonClassName} onClick={onCreate}>
        Cadastrar produto
      </Button>
      <DrawerContent>
        <DrawerHeader className="mx-auto max-w-md w-full">
          <DrawerTitle>Novo produto</DrawerTitle>
          <DrawerDescription>
            Insira as informações do seu produto
          </DrawerDescription>
        </DrawerHeader>
        <div className="mx-auto w-full max-w-md">
          <form
            className="flex flex-col gap-6 p-4"
            onSubmit={handleSubmit(sendForm)}
            id="product-form"
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" {...register("slug")} />
              {errors.slug && (
                <span className="text-sm text-red-500">
                  {errors.slug.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" {...register("description")} />
              {errors.description && (
                <span className="text-sm text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price")}
              />
              {errors.price && (
                <span className="text-sm text-red-500">
                  {errors.price.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="category">Categoria</Label>
              <Input id="category" {...register("category")} />
              {errors.category && (
                <span className="text-sm text-red-500">
                  {errors.category.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="imageUrl">Imagem (URL)</Label>
              <Input id="imageUrl" {...register("imageUrl")} />
              {errors.imageUrl && (
                <span className="text-sm text-red-500">
                  {errors.imageUrl.message}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input id="isActive" type="checkbox" {...register("isActive")} />
              <Label htmlFor="isActive">Ativo</Label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="isHighlighted"
                type="checkbox"
                {...register("isHighlighted")}
              />
              <Label htmlFor="isHighlighted">Destacado</Label>
            </div>
          </form>

          <DrawerFooter>
            <Button type="submit" form="product-form" disabled={isSubmitting}>
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
