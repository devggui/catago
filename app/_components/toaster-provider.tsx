"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Toaster } from "sonner"

type ToasterProps = React.ComponentProps<typeof Toaster>

export const ToasterProvider = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Toaster
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        className: cn("bg-background border-muted", props?.className),
      }}
      {...props}
    />
  )
}
