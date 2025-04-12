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
import { Loader2, X } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { CatalogFormSchema } from "./schema"
import { z } from "zod"
import { generateSlug } from "@/helpers/generate-slug"
import { Textarea } from "@/components/ui/textarea"
import { useBase64File } from "@/hooks/base64"
import { FileInput } from "@/components/ui/file-input"
import Image from "next/image"

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
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CatalogFormData>({
    resolver: zodResolver(CatalogFormSchema),
    defaultValues: {
      logo: null,
    },
  })

  const { fileToBase64 } = useBase64File()

  const name = watch("name")
  const logo = watch("logo")

  useEffect(() => {
    if (name) {
      setValue("slug", generateSlug(name))
    }
  }, [name, setValue])

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof CatalogFormData, value as string)
      })
    } else {
      setValue("logo", null)
      reset()
    }
  }, [isOpen])

  const sendForm = async ({ ...data }: CatalogFormData): Promise<void> => {
    if (initialData?.id) await update(initialData.id, data)
    else await store(data)
  }

  const store = async (data: CatalogFormData): Promise<void> => {
    try {
      await api.post("/catalogs", data)
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
      await api.patch(`/catalogs/${id}`, data)
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
        <div className="mx-auto w-full max-w-md overflow-y-auto">
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
                disabled
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
              <Textarea
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
                    toast("Arquivo muito grande!", {
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
                <Image src={logo} alt="Logo" width={128} height={128} />

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setValue("logo", null)}
                >
                  <X />
                </Button>
              </div>
            )}
          </form>
          <DrawerFooter>
            <Button type="submit" form="catalog-form" disabled={isSubmitting}>
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
