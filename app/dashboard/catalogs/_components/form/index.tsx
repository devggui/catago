"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/services/api"
import { Catalog, type Product } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { CatalogFormSchema } from "./schema"
import { z } from "zod"
import { generateSlug } from "@/helpers/generate-slug"
import { Textarea } from "@/components/ui/textarea"
import { useBase64File } from "@/hooks/base64"
import { FileInput } from "@/components/ui/file-input"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductSelector } from "../product-selector"
import { InputMask } from "@react-input/mask"
import { cn } from "@/lib/utils"

type CatalogFormData = z.infer<typeof CatalogFormSchema>

type CatalogFormProps = {
  buttonClassName?: string
  isOpen: boolean
  initialData?: Catalog
  availableProducts?: Product[]
  onOpenChange: (value: boolean) => void
  onCreate: () => void
  onSuccess?: () => void
}

export const CatalogForm = ({
  buttonClassName,
  isOpen,
  initialData,
  availableProducts,
  onOpenChange,
  onCreate,
  onSuccess,
}: CatalogFormProps) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CatalogFormData>({
    resolver: zodResolver(CatalogFormSchema),
    defaultValues: {
      logo: null,
      isActive: true,
    },
  })

  const { fileToBase64 } = useBase64File()

  const name = watch("name")
  const logo = watch("logo")

  useEffect(() => {
    if (name) {
      setValue("slug", generateSlug({ text: name, withNanoId: true }))
    }
  }, [name, setValue])

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof CatalogFormData, value as string)
      })
      setSelectedProducts(initialData.products || [])
    } else {
      setValue("logo", null)
      setSelectedProducts([])
      reset()
    }
  }, [isOpen])

  const sendForm = async ({ ...data }: CatalogFormData): Promise<void> => {
    const productIds = selectedProducts.map((product) => product.id)

    if (initialData?.id) await update(initialData.id, data, productIds)
    else await store(data, productIds)
  }

  const store = async (
    data: CatalogFormData,
    productIds: string[]
  ): Promise<void> => {
    try {
      await api.post("/catalogs", { ...data, productIds, isActive: true })
      onSuccess?.()
      setSelectedProducts([])
      onOpenChange(false)
    } catch {
      toast.error("Ooops!", {
        description: "Não foi possível cadastrar o catálogo",
      })
    }
  }

  const update = async (
    id: string,
    data: CatalogFormData,
    productIds: string[]
  ): Promise<void> => {
    try {
      await api.put(`/catalogs/${id}`, {
        ...data,
        productIds,
      })
      onSuccess?.()
      setSelectedProducts([])
      onOpenChange(false)
    } catch {
      toast.error("Ooops!", {
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
          <DrawerTitle>
            {initialData ? "Editar catálogo" : "Novo catálogo"}
          </DrawerTitle>
          <DrawerDescription>
            {initialData
              ? "Atualize os detalhes do seu catálogo"
              : "Insira as principais informações do seu catálogo"}
          </DrawerDescription>
        </DrawerHeader>

        <Tabs
          defaultValue="details"
          className="w-full max-w-md mx-auto overflow-y-auto"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Detalhes do Catálogo</TabsTrigger>
            <TabsTrigger value="products">
              Produtos ({initialData?.products?.length ?? 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="mx-auto w-full max-w-md overflow-y-auto">
              <form
                id="catalog-form"
                className="flex flex-col gap-6 p-4"
                onSubmit={handleSubmit(sendForm)}
              >
                <div className="flex flex-col gap-3">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    placeholder="Nome do catálogo"
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
                    placeholder="colecao-verao-2025"
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
                  <Textarea
                    id="description"
                    placeholder="Descrição do catálogo"
                    {...register("description")}
                  />
                  {errors.description && (
                    <span className="text-sm text-destructive">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <InputMask
                    className={cn(
                      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                    )}
                    id="whatsapp"
                    placeholder="(99) 99999-9999"
                    mask="+55 (__) _____-____"
                    replacement={{ _: /\d/ }}
                    {...register("whatsapp")}
                  />
                  <span className="text-sm text-muted-foreground">
                    Ele será usado para enviar o pedido do cliente direto para o
                    seu whatsapp.
                  </span>
                  {errors.slug && (
                    <span className="text-sm text-destructive">
                      {errors.slug.message}
                    </span>
                  )}
                </div>

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

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="logo">Logo</Label>
                  <FileInput
                    id="logo"
                    type="file"
                    accept="image/*"
                    {...register("logo")}
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
                      setValue("logo", fileString)
                    }}
                  />
                  <span className="text-sm text-muted-foreground">
                    Dica: Escolha um arquivo .svg com no máximo 5MB.
                  </span>
                </div>

                {logo && (
                  <div className="flex items-center justify-between w-full">
                    <Image src={logo} alt="Logo" width={64} height={64} />

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setValue("logo", null)}
                    >
                      <X />
                    </Button>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    form="catalog-form"
                    disabled={isSubmitting}
                  >
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
                </div>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-4">
            <ProductSelector
              className="p-4"
              selectedProducts={selectedProducts}
              onProductsChange={setSelectedProducts}
              availableProducts={availableProducts}
            />
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  )
}
