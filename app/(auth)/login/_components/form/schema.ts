import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.string().min(1, 'required').email('invalid'),
  password: z.string().min(6, 'minLength'),
})
