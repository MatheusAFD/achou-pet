'use server'

import { revalidateTag } from 'next/cache'

import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { Pet } from '../get-pet/types'
import { UpdatePetParams } from './types'

export const updatePet = async (
  params: UpdatePetParams
): Promise<[ErrorResponse | null, Pet | null]> => {
  const { petId, data } = params

  const [error, updatedPet] = await httpClientFetch<Pet, ErrorResponse>({
    url: `/pets/${petId}`,
    method: 'PATCH',
    data
  })

  if (!error) {
    revalidateTag(`pet-${updatedPet?.id}`)
    revalidateTag('pets')
    revalidateTag(`pet-by-credential-id-${updatedPet?.credentialId}`)
  }

  return [error, updatedPet]
}
