import { z } from 'zod'

export const attachCredentialFormSchema = z.object({
  name: z.string().nonempty({ message: 'Nome é obrigatório' }),
  description: z
    .string()
    .nonempty({ message: 'Descrição é obrigatória' })
    .min(20, { message: 'Forneça uma descrição mais completa' })
})

export type AttachCredentialFormData = z.infer<
  typeof attachCredentialFormSchema
>
