'use server'

import { api } from '@/services/api'
import { getAuthConfig } from './config'
import { authMiddlewareEnum, UseAuthProps } from './types'
import type { User } from '@/types'
import { redirect } from 'next/navigation'

export const useAuth = async ({
  middleware,
  redirectIfAuthenticated = '/dashboard',
}: UseAuthProps = {}) => {
  let user = null
  const config = await getAuthConfig()
  const hasToken = !!config?.headers?.cookie

  if (!hasToken && middleware === authMiddlewareEnum.auth) {
    return redirect('/login')
  }

  try {
    const { data } = await api.get<User>('/auth/me', config)

    if (data) user = data
  } catch {}

  if (user && middleware === authMiddlewareEnum.guest) {
    return redirect(redirectIfAuthenticated)
  } else if (!user && middleware === authMiddlewareEnum.auth) {
    return redirect('/login')
  }

  return {
    user,
  }
}
