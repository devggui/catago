import { z } from "zod"

export const ProductFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório"),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "O preço é obrigatório"),
  category: z.string().optional(),
  isActive: z.boolean(),
  isHighlighted: z.boolean(),
  imageUrl: z.string().nullable(),
  images: z.array(z.string()).optional(),
})
