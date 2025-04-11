import { z } from "zod"

export const ProfileFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().min(1, "O e-mail é obrigatório").email("E-mail inválido"),
})
