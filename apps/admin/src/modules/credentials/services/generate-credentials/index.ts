'use server'

import { revalidateTag } from 'next/cache'

import { httpClientFetch } from '@admin/modules/@shared/lib'
import { Either, ErrorResponse } from '@admin/modules/@shared/types'

import { GenerateCredentialsBody, GenerateCredentialsResponse } from './types'

export const generateCredentials = async (
  body: GenerateCredentialsBody
): Promise<Either<ErrorResponse, GenerateCredentialsResponse>> => {
  const [error, response] = await httpClientFetch<
    GenerateCredentialsResponse,
    ErrorResponse
  >({
    url: '/credentials',
    method: 'POST',
    data: body
  })

  if (!error) {
    revalidateTag('batches')
  }

  return [error, response]
}
