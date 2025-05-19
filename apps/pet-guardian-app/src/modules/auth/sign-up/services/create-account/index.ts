import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { CreateAccountResponse } from './types'

interface CreateAccountRequestBody {
  name: string
  lastName: string
  email: string
  password: string
  phone: string
}

export const createAccount = async (
  body: CreateAccountRequestBody
): Promise<[ErrorResponse | null, CreateAccountResponse | null]> => {
  const [error, data] = await httpClientFetch<
    CreateAccountResponse,
    ErrorResponse
  >({
    url: '/users',
    method: 'POST',
    data: {
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
      phone: body.phone
    }
  })

  return [error, data]
}
