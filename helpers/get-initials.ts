export const getInitials = (fullName: string | null): string => {
  const prepositions = ["da", "de", "do", "das", "dos", "e"]

  if (!fullName) {
    return "N/D"
  }

  const names = fullName
    .trim()
    .split(/\s+/)
    .filter((word) => !prepositions.includes(word.toLowerCase()))

  const initials = names.slice(0, 2).map((name) => name[0]?.toUpperCase() || "")
  return initials.join("")
}
