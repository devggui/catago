import { z } from 'zod'

export const SignUpSchema = z.object({
  name: z.string().min(1, 'required'),
  email: z.string().min(1, 'required').email('invalid'),
  password: z.string().min(6, 'minLength'),
})
