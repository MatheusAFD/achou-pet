import { ONE_HOUR_IN_SECONDS } from '@user-app/modules/@shared/constants'
import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { Either, ErrorResponse } from '@user-app/modules/@shared/types'

import { Term } from './types'

export const getPendingTerm = async (): Promise<
  Either<ErrorResponse, Term>
> => {
  const [error, data] = await httpClientFetch<Term, ErrorResponse>({
    url: '/terms/pending',
    method: 'GET',
    next: {
      tags: ['pending-terms'],
      revalidate: ONE_HOUR_IN_SECONDS
    }
  })

  return [error, data]
}
