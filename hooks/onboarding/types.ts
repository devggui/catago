import { User } from "@/types"

export interface UseOnboardingMiddlewareProps {
  user: User | null
  isOnboardingRoute?: boolean
  isDashboardRoute?: boolean
}
