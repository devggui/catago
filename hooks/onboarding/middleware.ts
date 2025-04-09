"use server"

import { redirect } from "next/navigation"
import { UseOnboardingMiddlewareProps } from "./types"

export const useOnboardingMiddleware = async ({
  user,
  isDashboardRoute = false,
}: UseOnboardingMiddlewareProps) => {
  if (user && user.onboarded) {
    return redirect("/pricing")
  } else if (user) {
    if (!isDashboardRoute) {
      return redirect("/dashboard")
    }
  } else {
    return redirect("/")
  }
}
