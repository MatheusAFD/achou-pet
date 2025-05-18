'use server'

import { revalidateTag } from 'next/cache'

import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { AttachCredentialBody, AttachCredentialResponse } from './types'

export const attatchCredential = async (
  data: AttachCredentialBody
): Promise<[ErrorResponse | null, AttachCredentialResponse | null]> => {
  const { credentialId, ...dataWithoutCredentialId } = data

  const [error, response] = await httpClientFetch<
    AttachCredentialResponse,
    ErrorResponse
  >({
    url: `/credentials/${credentialId}`,
    method: 'PATCH',
    contentType: 'multipart/form-data',
    data: dataWithoutCredentialId
  })

  if (!error) {
    revalidateTag('pets')
  }

  return [error, response]
}
