import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { SecurityForm } from "./form"

export const SecurityTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Segurança</CardTitle>
        <CardDescription>
          Atualize sua senha aqui. Após salvar, você será desconectado da
          plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SecurityForm />
      </CardContent>
    </Card>
  )
}
