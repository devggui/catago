import { z } from "zod"

export const ProductFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório"),
  description: z.string().optional(),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Preço inválido",
  }),
  category: z.string().optional(),
  isActive: z.boolean(),
  isHighlighted: z.boolean(),
  imageUrl: z.string(),
  images: z.array(z.object({ id: z.string(), url: z.string() })),
})
