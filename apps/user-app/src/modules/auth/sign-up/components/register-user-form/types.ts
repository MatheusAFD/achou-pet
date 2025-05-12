import { z } from 'zod'

export const registerUserSchema = z
  .object({
    name: z.string().nonempty({ message: 'O nome é obrigatório' }),
    lastName: z.string().nonempty({ message: 'O sobrenome é obrigatório' }),
    email: z.string().email({ message: 'O email é obrigatório' }),
    password: z.string().nonempty({ message: 'A senha é obrigatória' }),
    confirmPassword: z
      .string()
      .nonempty({ message: 'A confirmação de senha é obrigatória' }),

    phone: z.string().nonempty({ message: 'O telefone é obrigatório' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword']
  })

export type RegisterUserFormData = z.infer<typeof registerUserSchema>
