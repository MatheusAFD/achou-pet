'use server'

import { cookies } from 'next/headers'

import { ONE_HOUR_IN_SECONDS } from '@admin/modules/@shared/constants'
import { httpClientFetch } from '@admin/modules/@shared/lib'
import { Either, ErrorResponse } from '@admin/modules/@shared/types'

import { SignInUserFormData } from '../../components/sign-in-form/types'
import { SignInResponse } from './types'

export const signIn = async (
  data: SignInUserFormData
): Promise<Either<ErrorResponse, SignInResponse>> => {
  const [error, response] = await httpClientFetch<
    SignInResponse,
    ErrorResponse
  >({
    url: '/auth/sign-in',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const cookieStore = await cookies()

  if (!error) {
    cookieStore.set({
      name: 'achou-pet-token',
      value: response!.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: ONE_HOUR_IN_SECONDS
    })
  }

  return [error, response]
}
