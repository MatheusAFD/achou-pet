import { ONE_HOUR_IN_SECONDS } from '@user-app/modules/@shared/constants'
import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'
import { User } from '@user-app/modules/@shared/types/user'

export const getMe = async (): Promise<[ErrorResponse | null, User | null]> => {
  const [error, data] = await httpClientFetch<User, ErrorResponse>({
    url: '/auth/get-me',
    method: 'GET',
    next: {
      tags: ['me'],
      revalidate: ONE_HOUR_IN_SECONDS
    }
  })

  return [error, data]
}
