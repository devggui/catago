import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

interface SectionContainerProps {
  children: ReactNode
  title: string
  actionText?: string
  actionHref?: string
}

export const SectionContainer = ({
  children,
  title,
  actionText,
  actionHref,
}: SectionContainerProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <h1 className="text-xl font-medium">{title}</h1>
        {actionHref && (
          <Button variant="link">
            <Link href={actionHref} className="flex items-center gap-1">
              {actionText || "Ver todos"}
              <ArrowRight />
            </Link>
          </Button>
        )}
      </div>
      {children}
    </div>
  )
}
