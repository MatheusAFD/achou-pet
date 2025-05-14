import { z } from 'zod'

export const PetFormSchema = z
  .object({
    name: z.string().nonempty({ message: 'Nome é obrigatório' }),
    gender: z.enum(['male', 'female']).nullable(),
    species: z.string().nonempty({ message: 'Espécie é obrigatória' }),
    breed: z.string().nullable(),
    size: z.enum(['small', 'medium', 'large']),
    color: z.string().nullable(),
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

export type PetFormData = z.infer<typeof PetFormSchema>
