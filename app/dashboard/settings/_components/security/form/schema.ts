import { z } from "zod"

export const SecurityFormSchema = z
  .object({
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "A senhas não correspondem",
  })
