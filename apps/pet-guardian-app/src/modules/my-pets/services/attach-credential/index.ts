'use server'

import { revalidateTag } from 'next/cache'

import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { AttachCredentialBody, AttachCredentialResponse } from './types'

export const attatchCredential = async (
  data: AttachCredentialBody
): Promise<[ErrorResponse | null, AttachCredentialResponse | null]> => {
  const [error, response] = await httpClientFetch<
    AttachCredentialResponse,
    ErrorResponse
  >({
    url: `/credentials/${data.credentialId}`,
    method: 'PATCH',
    data: {
      pet: {
        ...data
      }
    }
  })

  if (error) {
    return [error, null]
  }

  revalidateTag('credentials')

  return [null, response]
}
