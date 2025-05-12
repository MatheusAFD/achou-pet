import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { RegisterUserFormData } from '../../components/register-user-form/types'
import { CreateAccountResponse } from './types'

export const createAccount = async (
  body: RegisterUserFormData
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

  if (error) {
    return [error, null]
  }

  return [error, data]
}
