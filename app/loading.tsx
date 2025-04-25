import { Logo } from "./_components/logo"

export default function Loading() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div role="status" className="animate-pulse pointer-events-none">
        <Logo />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
