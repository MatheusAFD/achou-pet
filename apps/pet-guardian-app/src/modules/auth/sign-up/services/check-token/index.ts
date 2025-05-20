import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { Either, ErrorResponse } from '@user-app/modules/@shared/types'

import { CheckTokenRequestBody, CheckTokenResponse } from './types'

export const checkToken = async (
  body: CheckTokenRequestBody
): Promise<Either<ErrorResponse, CheckTokenResponse>> => {
  const { token, key } = body

  const [error, data] = await httpClientFetch<
    CheckTokenResponse,
    ErrorResponse
  >({
    url: '/tokens/check-token',
    method: 'POST',
    data: {
      key,
      value: token
    }
  })

  return [error, data]
}
