import { z } from 'zod'

export const userDataStepSchema = z.object({
  name: z.string().nonempty({ message: 'O nome é obrigatório' }),
  lastName: z.string().nonempty({ message: 'O sobrenome é obrigatório' }),
  email: z.string().email({ message: 'O email é obrigatório' }),
  phone: z
    .string()
    .nonempty({ message: 'O telefone é obrigatório' })
    .min(11, { message: 'O telefone deve ter no mínimo 11 dígitos' })
})

export type UserDataFormStep = z.infer<typeof userDataStepSchema>
