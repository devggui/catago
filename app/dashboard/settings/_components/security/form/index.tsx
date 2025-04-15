import type { z } from "zod"
import { SecurityFormSchema } from "./schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"

type SecurityFormData = z.infer<typeof SecurityFormSchema>

export const SecurityForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SecurityFormData>({
    resolver: zodResolver(SecurityFormSchema),
  })

  const onSubmit = () => {
    try {
      toast.success("Sucesso!", {
        description: "Senha atualizada com sucesso!",
      })
    } catch {
      toast.error("Ooops!", {
        description: "Não foi possível atualizar sua senha",
      })
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          id="password"
          autoComplete="new-password"
          placeholder="******"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="confirmPassword">Confirme a Senha</Label>
        <Input
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          placeholder="******"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </span>
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
