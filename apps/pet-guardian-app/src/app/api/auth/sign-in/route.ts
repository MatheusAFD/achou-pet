import { NextRequest, NextResponse } from 'next/server'

import {
  ONE_HOUR_IN_SECONDS,
  SEVEN_DAY_IN_SECONDS
} from '@user-app/modules/@shared/constants'
import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { SignInUserFormData } from '../../../../modules/auth/sign-in/components/sign-in-form/types'
import { SignInResponse } from '../../../../modules/auth/sign-in/services/sign-in/types'

export async function POST(req: NextRequest): Promise<Response> {
  const body: SignInUserFormData = await req.json()

  const [error, response]: [ErrorResponse | null, SignInResponse | null] =
    await httpClientFetch({
      url: '/auth/sign-in',
      method: 'POST',
      data: body
    })

  if (error) {
    return NextResponse.json(error, { status: 401 })
  }

  const res = NextResponse.json(response)

  const isProduction = process.env.NODE_ENV === 'production'

  res.cookies.set('achou-pet-token', response!.accessToken, {
    httpOnly: true,
    secure: isProduction,
    maxAge: ONE_HOUR_IN_SECONDS,
    path: '/',
    sameSite: isProduction ? 'none' : 'lax'
  })
  res.cookies.set('achou-pet-refresh-token', response!.refreshToken, {
    httpOnly: true,
    secure: isProduction,
    maxAge: SEVEN_DAY_IN_SECONDS,
    path: '/',
    sameSite: isProduction ? 'none' : 'lax'
  })

  return res
}
