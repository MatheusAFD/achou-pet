'use server'

import { revalidateTag } from 'next/cache'

import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { AttachCredentialResponse } from './types'

export const attatchCredential = async (
  credentialId: string,
  data: FormData
): Promise<[ErrorResponse | null, AttachCredentialResponse | null]> => {
  const [error, response] = await httpClientFetch<
    AttachCredentialResponse,
    ErrorResponse
  >({
    url: `/credentials/${credentialId}`,
    method: 'PATCH',
    contentType: 'multipart/form-data',
    data
  })

  if (!error) {
    revalidateTag('pets')
  }

  return [error, response]
}
