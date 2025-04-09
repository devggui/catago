import { LoginForm } from '@/app/(auth)/login/_components/form'
import Link from 'next/link'

export const generateMetadata = async () => {
  return {
    title: 'Entrar',
    description:
      'Faça login na sua conta Dashboard e comece a gerenciar seus produtos de forma simples e eficiente',
  }
}

const LoginPage = async () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Entrar</h1>
      <LoginForm />
      <p className="text-sm">
        Novo na plataforma?{' '}
        <Link href="/register" prefetch className="text-primary">
          Criar uma conta aqui
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
