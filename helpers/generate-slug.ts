import { nanoid } from "nanoid"

export const generateSlug = (text: string): string => {
  const slug = text
    .normalize("NFD") // Remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, "-") // Troca espaços por "-"

  const uniqueId = nanoid(4) // gera identificador curto (ex: "a1b2")

  return `${slug}-${uniqueId}`
}
