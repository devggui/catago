'use client'

import {
  QueryClientProvider as Provider,
  QueryClient,
} from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

export const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000,
        refetchOnWindowFocus: false,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

export const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient()
  return <Provider client={queryClient}>{children}</Provider>
}
