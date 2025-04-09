import { api } from '@/services/api'
import type { User } from '@/types'
import { useEffect } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'
import {
  authMiddlewareEnum,
  authStatusEnum,
  SignInProps,
  SignUpProps,
  UseAuthProps,
} from './types'
import { useRouter } from 'next/navigation'

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: UseAuthProps = {}) => {
  const router = useRouter()

  const {
    data: user,
    error,
    mutate,
    isLoading,
  } = useSWR(
    '/auth/me',
    () =>
      api
        .get<User>('/auth/me')
        .then((res) => res.data)
        .catch((error) => {
          if (error.response.status !== 409) throw error
          window.location.href = '/login'
        }),
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      refreshInterval: 0,
    }
  )

  const signUp = async (props: SignUpProps) => {
    try {
      const { data } = await api.post('/auth/register', props)

      if (data?.status === authStatusEnum.authenticated) {
        window.location.href = '/dashboard'
      }

      mutate()
    } catch {
      toast('Ooops!', {
        description: 'O e-mail informado já está em uso',
      })
    }
  }

  const signIn = async (props: SignInProps) => {
    try {
      const { data } = await api.post('/auth/login', props)

      if (data?.status === authStatusEnum.authenticated) {
        window.location.href = '/dashboard'
      }

      mutate()
    } catch {
      toast('Ooops!', {
        description: 'E-mail ou senha inválidos',
      })
    }
  }

  const signOut = async () => {
    if (!error) {
      try {
        const { data } = await api.post('/auth/logout')

        if (data?.status === authStatusEnum.logged_out) {
          window.location.href = '/login'
        }

        mutate()
      } catch {
        toast('Ooops!', {
          description: 'Erro inesperado',
        })
      }
    }
  }

  const reload = () => {
    router.refresh()
    mutate()
  }

  useEffect(() => {
    if (
      middleware === authMiddlewareEnum.guest &&
      redirectIfAuthenticated &&
      user
    ) {
      window.location.href = redirectIfAuthenticated
    }

    if (middleware === authMiddlewareEnum.auth && error) {
      signOut()
    }
  }, [user, error])

  return {
    user,
    signUp,
    signIn,
    signOut,
    isLoading,
    reload,
  }
}
