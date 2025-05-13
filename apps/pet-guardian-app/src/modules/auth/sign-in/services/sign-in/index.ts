'use server'

import { cookies } from 'next/headers'

import {
  ONE_HOUR_IN_SECONDS,
  SEVEN_DAY_IN_SECONDS
} from '@user-app/modules/@shared/constants'
import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { SignInUserFormData } from '../../components/sign-in-form/types'
import { SignInResponse } from './types'

export const signIn = async (
  body: SignInUserFormData
): Promise<[ErrorResponse | null, SignInResponse | null]> => {
  const [error, response] = await httpClientFetch<
    SignInResponse,
    ErrorResponse
  >({
    url: '/auth/sign-in',
    method: 'POST',
    data: body
  })

  if (error) {
    return [error, null]
  }

  const cookiesService = await cookies()

  cookiesService.set({
    name: 'achou-pet-token',
    value: response!.accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: ONE_HOUR_IN_SECONDS
  })

  cookiesService.set({
    name: 'achou-pet-refresh-token',
    value: response!.refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: SEVEN_DAY_IN_SECONDS
  })

  return [null, response]
}
