import { Skeleton } from "@/components/ui/skeleton"

export const UserLoading = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-8 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-[200px]" />
        <Skeleton className="h-3 w-[160px]" />
      </div>
    </div>
  )
}
