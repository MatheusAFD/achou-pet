import { NextRequest, NextResponse } from 'next/server'

import {
  ONE_HOUR_IN_SECONDS,
  SEVEN_DAY_IN_SECONDS
} from '@admin/modules/@shared/constants'
import { httpClientFetch } from '@admin/modules/@shared/lib'
import { ErrorResponse } from '@admin/modules/@shared/types'

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

  res.cookies.set('achou-pet-token', response!.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: ONE_HOUR_IN_SECONDS,
    path: '/'
  })
  res.cookies.set('achou-pet-refresh-token', response!.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: SEVEN_DAY_IN_SECONDS,
    path: '/'
  })

  return res
}
