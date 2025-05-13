import { ONE_HOUR_IN_SECONDS } from '@user-app/modules/@shared/constants'
import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { GetMyPetsResponse } from './types'

export const getPets = async (): Promise<
  [ErrorResponse | null, GetMyPetsResponse | null]
> => {
  const [error, data] = await httpClientFetch<GetMyPetsResponse, ErrorResponse>(
    {
      url: '/pets/me',
      method: 'GET',
      next: {
        tags: ['credentials'],
        revalidate: ONE_HOUR_IN_SECONDS
      }
    }
  )

  if (error) {
    return [error, null]
  }

  return [null, data]
}
