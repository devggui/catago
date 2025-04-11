import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { ProfileForm } from "./form"
import type { User } from "@/types"

interface ProfileTabProps {
  user: User | undefined | void
}

export const ProfileTab = ({ user }: ProfileTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações da Conta</CardTitle>
        <CardDescription>Atualize suas informações da conta.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm initialData={{ name: user?.name, email: user?.email }} />
      </CardContent>
    </Card>
  )
}
