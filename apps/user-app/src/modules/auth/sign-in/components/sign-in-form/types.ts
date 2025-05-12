import { z } from 'zod'

export const signInUserSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().nonempty({ message: 'A senha é obrigatória' })
})

export type SignInUserFormData = z.infer<typeof signInUserSchema>
