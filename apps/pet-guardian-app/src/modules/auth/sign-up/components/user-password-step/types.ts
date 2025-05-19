import { z } from 'zod'

export const userPasswordSchema = z
  .object({
    password: z.string().nonempty({ message: 'A senha é obrigatória' }),
    confirmPassword: z
      .string()
      .nonempty({ message: 'A confirmação de senha é obrigatória' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword']
  })

export type UserPasswordFormData = z.infer<typeof userPasswordSchema>
