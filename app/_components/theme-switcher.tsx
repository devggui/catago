"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export const ThemeSwitcher = (): React.ReactNode => {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="link"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-[24px] w-[34px] shrink-0 cursor-pointer border-2 border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <div className="absolute left-0 right-0 top-1/2 h-[0.65rem] translate-y-[-50%] rounded-full bg-gray-200/60 dark:bg-white/10"></div>
      <span className="sr-only">Toggle theme</span>
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block h-6 w-6 shrink-0 -translate-x-2.5 transform rounded-full border border-gray-200 bg-background p-[3px] ring-0 dark:translate-x-2.5 dark:border-primary"
      >
        <SunIcon
          className="absolute left-1/2 top-1/2 h-4 w-4 translate-x-[-50%] translate-y-[-50%] fill-yellow-500 stroke-yellow-500 dark:hidden"
          fill="currentColor"
          fillRule="evenodd"
          strokeWidth={2}
        />
        <MoonIcon
          className="absolute left-1/2 top-1/2 hidden h-4 w-4 translate-x-[-50%] translate-y-[-50%] fill-primary dark:block"
          fill="currentColor"
          fillRule="evenodd"
          strokeWidth={0}
        />
      </span>
    </Button>
  )
}
