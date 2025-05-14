import { ONE_HOUR_IN_SECONDS } from '@user-app/modules/@shared/constants'
import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { Pet } from './types'

export const getPet = async (
  petId: string
): Promise<[ErrorResponse | null, Pet | null]> => {
  const [error, data] = await httpClientFetch<Pet, ErrorResponse>({
    url: `/pets/${petId}`,
    method: 'GET',
    next: {
      tags: ['pet'],
      revalidate: ONE_HOUR_IN_SECONDS
    }
  })

  if (error) {
    return [error, null]
  }

  const formattedData = {
    ...data,
    size: data.size.toLocaleLowerCase(),
    gender: data.gender.toLowerCase()
  } as Pet

  return [null, formattedData]
}
