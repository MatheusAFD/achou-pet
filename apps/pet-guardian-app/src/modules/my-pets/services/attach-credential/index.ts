'use server'

import { revalidateTag } from 'next/cache'

import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { AttachCredentialResponse } from './types'

export const attatchCredential = async (
  credentialId: string,
  data: { [key: string]: unknown }
): Promise<[ErrorResponse | null, AttachCredentialResponse | null]> => {
  const [error, response] = await httpClientFetch<
    AttachCredentialResponse,
    ErrorResponse
  >({
    url: `/credentials/${credentialId}`,
    method: 'PATCH',
    data
  })

  if (!error) {
    revalidateTag('pets')
    revalidateTag(`pet-by-credential-id-${credentialId}`)
  }

  return [error, response]
}
