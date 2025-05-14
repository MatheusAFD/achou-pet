'use server'

import { revalidateTag } from 'next/cache'

import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { Pet } from '../get-pet/types'
import { UpdatePetParams } from './types'

export const updatePet = async (
  data: UpdatePetParams
): Promise<[ErrorResponse | null, Pet | null]> => {
  const { petId, ...rest } = data

  const [error, response] = await httpClientFetch<Pet, ErrorResponse>({
    url: `/pets/${petId}`,
    method: 'PATCH',
    data: rest
  })

  if (error) {
    return [error, null]
  }

  revalidateTag('pet')
  revalidateTag('pets')

  return [null, response]
}
