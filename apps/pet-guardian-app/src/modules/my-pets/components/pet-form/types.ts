import { z } from 'zod'

export interface PetFormProps {
  actionText?: string

  onSubmit: (data: PetFormData) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: Partial<PetFormData> | any
}

export const PetFormSchema = z
  .object({
    name: z.string().nonempty({ message: 'Nome é obrigatório' }),
    gender: z.enum(['male', 'female']).nullable(),
    species: z.string().nonempty({ message: 'Espécie é obrigatória' }),
    breed: z.string().nullable(),
    size: z.enum(['small', 'medium', 'large']),
    color: z.string().optional().nullable(),
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
