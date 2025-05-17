import { ONE_HOUR_IN_SECONDS } from '@user-app/modules/@shared/constants'
import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { Either, ErrorResponse } from '@user-app/modules/@shared/types'

import { GetPetByCredentialIdResponse } from './types'

export const getPetByCredentialId = async (
  petId: string
): Promise<Either<ErrorResponse, GetPetByCredentialIdResponse>> => {
  const [error, data] = await httpClientFetch<
    GetPetByCredentialIdResponse,
    ErrorResponse
  >({
    url: `/credentials/details/${petId}`,
    method: 'GET',
    next: {
      tags: ['pet-by-credential-id'],
      revalidate: ONE_HOUR_IN_SECONDS
    }
  })

  return [error, data]
}
