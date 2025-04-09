'use client'

import { SignInSchema } from '@/app/(auth)/login/_components/form/schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type SignInData = z.infer<typeof SignInSchema>

export const LoginForm = () => {
  const { signIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: zodResolver(SignInSchema),
  })

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(signIn)}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="text"
          id="email"
          placeholder="exemplo@exemplo.com"
          autoFocus
          {...register('email')}
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          id="password"
          autoComplete="new-password"
          placeholder="******"
          {...register('password')}
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin duration-500" />
        )}
        Entrar
      </Button>
    </form>
  )
}
