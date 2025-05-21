import { z } from 'zod'

export interface GenerateCredentialsFormProps {
  onSuccess: VoidFunction
}

export const generateCredentialsFormSchema = z.object({
  numberOfCredentials: z.preprocess(
    (val) => {
      // Garante que valores vazios ou não numéricos não passem
      if (typeof val === 'string' && val.trim() === '') return undefined
      const num = Number(val)
      return Number.isNaN(num) ? undefined : num
    },
    z
      .number({
        required_error: 'O campo tem que ser um número'
      })
      .min(1, 'Mínimo de 1 credencial')
      .max(1250, 'Máximo de 1250 credenciais')
  ),
  description: z
    .string()
    .nonempty('Campo obrigatório')
    .min(10, { message: 'Forneça uma descrição mais longa' })
}) as z.ZodType<{ numberOfCredentials: number; description: string }>

export type GenerateCredentialsFormData = z.infer<
  typeof generateCredentialsFormSchema
>
