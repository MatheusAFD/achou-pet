import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { Credential } from './types'

export const getPetCredential = async (
  credentialId: string
): Promise<[ErrorResponse | null, Credential | null]> => {
  const [error, data] = await httpClientFetch<Credential, ErrorResponse>({
    url: `/credentials/${credentialId}`,
    method: 'GET'
  })

  if (error) {
    return [error, null]
  }

  return [null, data]
}
