'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { Either, ErrorResponse } from '@user-app/modules/@shared/types'

import { UserTerm } from '../get-pending-term/types'

export const updateUserTermSituation = async (
  situation: 'ACCEPTED' | 'REFUSED'
): Promise<Either<ErrorResponse, UserTerm>> => {
  const [error, data] = await httpClientFetch<UserTerm, ErrorResponse>({
    url: '/terms/situation',
    method: 'POST',
    data: {
      situation
    }
  })

  if (situation === 'ACCEPTED') {
    revalidateTag('me')
    revalidateTag('pending-terms')

    redirect('/meus-pets')
  }

  if (situation === 'REFUSED') {
    redirect('/auth/sign-out')
  }

  return [error, data]
}
