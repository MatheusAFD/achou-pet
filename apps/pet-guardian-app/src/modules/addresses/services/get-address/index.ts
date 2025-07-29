import { ONE_HOUR_IN_SECONDS } from '@user-app/modules/@shared/constants'
import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { Address } from './types'

export const getAddress = async (
  id: string
): Promise<[ErrorResponse | null, Address | null]> => {
  const [error, data] = await httpClientFetch<Address, ErrorResponse>({
    url: `/addresses/${id}`,
    method: 'GET',
    next: {
      tags: [`address-${id}`],
      revalidate: ONE_HOUR_IN_SECONDS
    }
  })

  return [error, data]
}
