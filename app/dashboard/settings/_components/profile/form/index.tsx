import type { z } from "zod"
import { ProfileFormSchema } from "./schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"

type ProfileFormData = z.infer<typeof ProfileFormSchema>

interface ProfileFormProps {
  initialData: {
    name?: string
    email?: string
  }
}

export const ProfileForm = ({ initialData }: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: initialData.name,
      email: initialData.email,
    },
  })

  const onSubmit = () => {
    try {
      toast("Sucesso!", {
        description: "Dados atualizados com sucesso!",
      })
    } catch {
      toast("Ooops!", {
        description: "Não foi possível atualizar seus dados",
      })
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="name">Nome</Label>
        <Input
          type="text"
          id="name"
          placeholder="Seu nome completo"
          autoFocus
          {...register("name")}
        />
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="text"
          id="email"
          placeholder="exemplo@exemplo.com"
          disabled
          {...register("email")}
        />
        <span className="text-sm text-muted-foreground">
          O e-mail é fixo e não pode ser alterado.
        </span>
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin duration-500" />
        )}
        Salvar
      </Button>
    </form>
  )
}
