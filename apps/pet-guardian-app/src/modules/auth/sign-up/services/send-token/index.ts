import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { Either, ErrorResponse } from '@user-app/modules/@shared/types'

import { Token } from './types'

export const sendToken = async (
  key: string
): Promise<Either<ErrorResponse, Token>> => {
  const [error, data] = await httpClientFetch<Token, ErrorResponse>({
    url: '/tokens',
    method: 'POST',
    data: {
      key
    }
  })

  return [error, data]
}
