import { ONE_HOUR_IN_SECONDS } from '@user-app/modules/@shared/constants'
import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { Address } from '../get-address/types'

export const getAddresses = async (): Promise<
  [ErrorResponse | null, Address[] | null]
> => {
  const [error, data] = await httpClientFetch<Address[], ErrorResponse>({
    url: '/addresses',
    method: 'GET',
    next: {
      tags: ['addresses'],
      revalidate: ONE_HOUR_IN_SECONDS
    }
  })

  return [error, data]
}
