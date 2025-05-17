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
    medicationDescription: z.string().nullable(),
    photo: z
      .any()
      .refine(
        (file) => {
          if (!file) return true
          if (!(file instanceof File)) return false
          return file.size <= 5 * 1024 * 1024
        },
        { message: 'O arquivo deve ter no máximo 5MB', path: ['photo'] }
      )
      .refine(
        (file) => {
          if (!file) return true
          if (!(file instanceof File)) return false
          return ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
        },
        { message: 'Apenas imagens JPG ou PNG são permitidas', path: ['photo'] }
      )
      .optional()
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
