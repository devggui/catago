import { z } from "zod"

export const CatalogFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório"),
  description: z.string().optional(),
  logo: z.string().optional().nullable(),
  isActive: z.boolean(),
  whatsapp: z.string().min(1, "O whatsapp é obrigatório"),
})
