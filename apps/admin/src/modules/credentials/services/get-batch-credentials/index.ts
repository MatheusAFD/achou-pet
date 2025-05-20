import { ONE_HOUR_IN_SECONDS } from '@admin/modules/@shared/constants'
import { httpClientFetch } from '@admin/modules/@shared/lib'
import {
  Either,
  ErrorResponse,
  PaginatedResponse
} from '@admin/modules/@shared/types'

import { Batch } from './types'

export const getBatchCredentials = async (): Promise<
  Either<ErrorResponse, PaginatedResponse<Batch[]>>
> => {
  const [error, response] = await httpClientFetch<
    PaginatedResponse<Batch[]>,
    ErrorResponse
  >({
    url: '/batches',
    method: 'GET',
    next: {
      revalidate: ONE_HOUR_IN_SECONDS,
      tags: ['batches']
    }
  })

  return [error, response]
}
