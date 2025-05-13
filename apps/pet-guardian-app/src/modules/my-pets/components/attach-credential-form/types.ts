import { z } from 'zod'

export const attachCredentialFormSchema = z
  .object({
    name: z.string().nonempty({ message: 'Nome é obrigatório' }),
    gender: z.enum(['male', 'female']).nullable(),
    species: z.string().nonempty({ message: 'Espécie é obrigatória' }),
    breed: z.string().nonempty({ message: 'Raça é obrigatória' }),
    size: z.enum(['small', 'medium', 'large']),
    color: z.string().nonempty({ message: 'Cor é obrigatória' }),
    isVaccinated: z.boolean(),
    hasAllergies: z.boolean(),
    needsMedication: z.boolean(),
    medicationDescription: z.string().nullable()
  })
  .superRefine(({ needsMedication, medicationDescription }, ctx) => {
    if (needsMedication && !medicationDescription) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Descreva a medicação necessária',
        path: ['medicationDescription']
      })
    }
  })

export type AttachCredentialFormData = z.infer<
  typeof attachCredentialFormSchema
>
