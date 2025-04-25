import { RegisterForm } from "@/app/(auth)/register/_components/form"
import Link from "next/link"

export const generateMetadata = async () => {
  return {
    title: "Cadastre-se",
    description:
      "Crie sua conta Dashboard e comece a gerenciar seus produtos de forma simples e eficiente",
  }
}

const RegisterPage = async () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Cadastre-se</h1>
      <RegisterForm />
      <p className="text-sm">
        Já tem uma conta?{" "}
        <Link href="/login" prefetch className="text-primary">
          Entre aqui
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage
