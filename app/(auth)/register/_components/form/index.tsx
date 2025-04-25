"use client"

import { SignUpSchema } from "@/app/(auth)/register/_components/form/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type SignUpData = z.infer<typeof SignUpSchema>

export const RegisterForm = () => {
  const { signUp } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
  })

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(signUp)}>
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
          <span className="text-sm text-destructive">
            {errors.name.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="text"
          id="email"
          placeholder="exemplo@exemplo.com"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-sm text-destructive">
            {errors.email.message}
          </span>
        )}
      </div>
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
          <span className="text-sm text-destructive">
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
          <span className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin duration-500" />
        )}
        Criar conta
      </Button>
    </form>
  )
}
