import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { Either, ErrorResponse } from '@user-app/modules/@shared/types'

import { UserTerm } from '../get-pending-term/types'

export const updateUserTermSituation = async (
  situation: 'ACCEPTED' | 'REJECTED'
): Promise<Either<ErrorResponse, UserTerm>> => {
  const [error, data] = await httpClientFetch<UserTerm, ErrorResponse>({
    url: '/terms/pending',
    method: 'POST',
    data: {
      situation
    }
  })

  return [error, data]
}
