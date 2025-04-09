import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface LogoIconProps {
  width?: number
  height?: number
  className?: string
}

export const LogoIcon = ({
  width = 30,
  height = 30,
  className,
}: LogoIconProps): React.ReactNode => {
  return (
    <Image
      src="/images/logo.svg"
      width={width}
      height={height}
      alt="Logo"
      className={cn("transition-transform duration-0 ease-in-out", className)}
      priority
    />
  )
}

interface LogoProps {
  url?: string
  className?: string
}

export const Logo = ({ url = "/", className }: LogoProps): React.ReactNode => {
  return (
    <Link
      href={url}
      prefetch
      className={cn("flex items-center gap-3", className)}
    >
      <LogoIcon />
      <span className="hidden text-xl font-medium text-neutral-800 dark:text-white/80 sm:inline-block">
        CataGo
      </span>
    </Link>
  )
}
