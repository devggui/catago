import { nanoid } from "nanoid"

interface GenerateSlugProps {
  text: string
  withNanoId: boolean
}

export const generateSlug = ({
  text,
  withNanoId = true,
}: GenerateSlugProps): string => {
  const uniqueId = nanoid(4) // gera identificador curto (ex: "a1b2")

  const slug = text
    .normalize("NFD") // Remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, "-") // Troca espaços por "-"

  if (withNanoId) {
    return `${slug}-${uniqueId}`
  }

  return slug
}
