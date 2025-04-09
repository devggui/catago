'use server'

import { cookies } from 'next/headers'
import { GetAuthConfigProps } from './types'
import { redirect } from 'next/navigation'

export const getAuthConfig = async ({
  redirectIfNoToken,
}: GetAuthConfigProps = {}) => {
  const cookiesStore = cookies()
  const token = (await cookiesStore).get('auth')

  if (!token && redirectIfNoToken) {
    return redirect(redirectIfNoToken)
  }

  return {
    headers: {
      cookie: [token?.name, token?.value].filter(Boolean).join('='),
    },
  }
}
