import { z } from 'zod'

import { lettersAndSpacesRegex } from '@user-app/modules/@shared/validators'

export interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void
}

export const addressFormSchema = z.object({
  zipCode: z
    .string()
    .nonempty('CEP é obrigatório')
    .length(8, 'CEP deve ter 8 dígitos'),
  address: z
    .string()
    .nonempty('Endereço é obrigatório')
    .regex(lettersAndSpacesRegex, 'O campo deve conter apenas letras'),
  number: z.string().nonempty('Número é obrigatório'),
  neighborhood: z
    .string()
    .nonempty('Bairro é obrigatório')
    .regex(lettersAndSpacesRegex, 'Deve conter apenas letras'),
  reference: z
    .string()
    .nonempty('Ponto de referência é obrigatório')
    .regex(lettersAndSpacesRegex, 'O campo deve conter apenas letras'),
  complement: z.string().optional(),
  city: z
    .string()
    .nonempty('Cidade é obrigatória')
    .regex(lettersAndSpacesRegex, 'O campo deve conter apenas letras'),
  state: z
    .string()
    .nonempty('Estado é obrigatório')
    .regex(lettersAndSpacesRegex, 'O campo deve conter apenas letras')
})

export type AddressFormData = z.infer<typeof addressFormSchema>
