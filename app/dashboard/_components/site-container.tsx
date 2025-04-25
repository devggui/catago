import type { PropsWithChildren } from "react"

export const SiteContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {children}
        </div>
      </div>
    </div>
  )
}
