import { z } from 'zod'

export const userEmailConfirmationSchema = z.object({
  pin: z.string().min(6, { message: 'O código deve ter 6 dígitos.' })
})

export type UserEmailConfirmationFormData = z.infer<
  typeof userEmailConfirmationSchema
>
