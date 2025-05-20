import { ONE_HOUR_IN_SECONDS } from '@admin/modules/@shared/constants'
import { httpClientFetch } from '@admin/modules/@shared/lib'
import { ErrorResponse } from '@admin/modules/@shared/types'
import { User } from '@admin/modules/@shared/types/user'

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
