import { NextRequest, NextResponse } from 'next/server'

import { ONE_DAY_IN_SECONDS } from '@user-app/modules/@shared/constants'
import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'
import { generateMockJwtToken } from '@user-app/modules/mocks/utils'

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

  const tokenValue =
    process.env.NEXT_PUBLIC_ENV_MODE === 'test'
      ? generateMockJwtToken()
      : response!.accessToken

  const isProduction = process.env.NODE_ENV === 'production'
  res.cookies.set({
    name: 'achou-pet-token',
    value: tokenValue,
    httpOnly: true,
    secure: isProduction,
    maxAge: ONE_DAY_IN_SECONDS,
    path: '/',
    sameSite: 'lax'
  })

  return res
}
