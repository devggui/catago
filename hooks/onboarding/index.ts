import { calculateDaysLeft } from "@/helpers/calculate-days-left"
import { api } from "@/services/api"
import type { User } from "@/types"
import { useEffect, useState } from "react"

interface OnboardingProps {
  user: void | User | undefined
}

export const useOnboarding = ({ user }: OnboardingProps) => {
  const [daysLeft, setDaysLeft] = useState<number>(14)

  const isOnboarded = daysLeft === 0 || user?.onboarded

  useEffect(() => {
    if (user) {
      const days = calculateDaysLeft(user.createdAt)
      setDaysLeft(days)
    }
  }, [user])

  useEffect(() => {
    if (isOnboarded) {
      finishUserOnboarding()
    }
  }, [isOnboarded])

  const finishUserOnboarding = async () => {
    try {
      await api.patch("/users/finishUserOnboarding")
    } catch {}
  }

  return {
    daysLeft,
    isOnboarded,
  }
}
