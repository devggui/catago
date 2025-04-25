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
import { Product } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, X } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { ProductFormSchema } from "./schema"
import { z } from "zod"
import { FileInput } from "@/components/ui/file-input"
import { useBase64File } from "@/hooks/base64"
import Image from "next/image"
import { generateSlug } from "@/helpers/generate-slug"

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
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductFormSchema),
  })

  const { fileToBase64 } = useBase64File()

  const productName = watch("name")
  const imageUrl = watch("imageUrl")
  const images = watch("images")

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof ProductFormData, value as string | boolean)
      })
    } else {
      reset()
    }
  }, [isOpen])

  useEffect(() => {
    if (productName) {
      setValue("slug", generateSlug({ text: productName, withNanoId: false }))
    }
  }, [productName, setValue])

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
      toast.error("Ooops!", {
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
      toast.error("Ooops!", {
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
        <div className="mx-auto w-full max-w-md overflow-y-auto">
          <form
            className="flex flex-col gap-6 p-4"
            onSubmit={handleSubmit(sendForm)}
            id="product-form"
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Nome do produto"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-sm text-destructive">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="camiseta-branca-sem-estampa"
                disabled
                {...register("slug")}
              />
              {errors.slug && (
                <span className="text-sm text-destructive">
                  {errors.slug.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                placeholder="Uma breve descrição do produto..."
                {...register("description")}
              />
              {errors.description && (
                <span className="text-sm text-destructive">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="price">Preço</Label>
              <div className="flex items-center gap-1">
                R$
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="99.99"
                  {...register("price")}
                />
              </div>
              {errors.price && (
                <span className="text-sm text-destructive">
                  {errors.price.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                placeholder="Vestuário, calçados, acessórios, ..."
                {...register("category")}
              />
              {errors.category && (
                <span className="text-sm text-destructive">
                  {errors.category.message}
                </span>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="logo">Imagem Principal</Label>
              <FileInput
                id="logo"
                type="file"
                accept="image/*"
                {...register("imageUrl")}
                onChange={async (e) => {
                  const file = e.target.files?.[0]

                  if (!file) {
                    return
                  }

                  const maxSizeMB = 5
                  const maxSizeBytes = maxSizeMB * 1024 * 1024

                  if (file.size > maxSizeBytes) {
                    toast.warning("Arquivo muito grande!", {
                      description: `O tamanho máximo permitido é ${maxSizeMB}MB.`,
                      duration: 4000,
                    })

                    return
                  }

                  const fileString = await fileToBase64(file)
                  setValue("imageUrl", fileString)
                }}
              />
              <span className="text-sm text-muted-foreground">
                Dica: Escolha um arquivo .svg com no máximo 5MB.
              </span>
            </div>

            {imageUrl && (
              <div className="flex items-center justify-between w-full">
                <Image
                  src={imageUrl}
                  alt="Imagem Principal"
                  width={64}
                  height={64}
                />

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setValue("imageUrl", null)}
                >
                  <X />
                </Button>
              </div>
            )}

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="additionalImages">
                Demais Imagens (até 3 imagens)
              </Label>
              <FileInput
                id="additionalImages"
                type="file"
                multiple
                accept="image/*"
                onChange={async (e) => {
                  const files = e.target.files

                  if (!files || files.length === 0) return

                  const maxFiles = 3
                  const maxSizeMB = 5
                  const maxSizeBytes = maxSizeMB * 1024 * 1024

                  if (files.length > maxFiles) {
                    toast.warning("Ooops!", {
                      description: "Você pode enviar no máximo 3 arquivos",
                    })
                    return
                  }

                  const base64Images: string[] = []

                  for (let i = 0; i < files.length; i++) {
                    const file = files[i]

                    if (file.size > maxSizeBytes) {
                      toast.warning("Arquivo muito grande!", {
                        description: `O tamanho máximo permitido é ${maxSizeMB}MB por arquivo.`,
                        duration: 4000,
                      })
                      return
                    }

                    const base64 = await fileToBase64(file)
                    base64Images.push(base64)
                  }

                  setValue("images", base64Images)
                }}
              />
              <span className="text-sm text-muted-foreground">
                Escolha até 3 imagens (máx. 5MB cada).
              </span>
            </div>

            {images && images?.length > 0 && (
              <div className="flex gap-4 mt-2">
                {images?.map((img, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={img}
                      alt={`Imagem ${index + 1}`}
                      width={64}
                      height={64}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute top-0 right-0"
                      onClick={() => {
                        const newImages = [...(watch("images") || [])]
                        newImages.splice(index, 1)
                        setValue("images", newImages)
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                id="isActive"
                type="checkbox"
                defaultChecked
                disabled={!initialData?.id}
                {...register("isActive")}
              />
              <Label htmlFor="isActive">Ativo</Label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="isHighlighted"
                type="checkbox"
                {...register("isHighlighted")}
              />
              <Label htmlFor="isHighlighted">Destacar produto</Label>
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
