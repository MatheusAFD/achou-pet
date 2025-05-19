'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { Either, ErrorResponse } from '@user-app/modules/@shared/types'

import { UserTerm } from '../get-pending-term/types'

export const updateUserTermSituation = async (
  situation: 'ACCEPTED' | 'REFUSED'
): Promise<Either<ErrorResponse, UserTerm>> => {
  const cookieStore = await cookies()

  const [error, data] = await httpClientFetch<UserTerm, ErrorResponse>({
    url: '/terms/situation',
    method: 'POST',
    data: {
      situation
    }
  })

  if (situation === 'ACCEPTED') {
    revalidateTag('me')

    redirect('/meus-pets')
  }

  if (situation === 'REFUSED') {
    cookieStore.delete('achou-pet-token')
    cookieStore.delete('achou-pet-refresh_token')

    redirect('/auth/sign-in')
  }

  return [error, data]
}
