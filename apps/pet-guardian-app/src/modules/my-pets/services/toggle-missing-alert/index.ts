'use server'

import { revalidateTag } from 'next/cache'

import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { MissingAlertToggleResponse } from './types'

export const toggleMissingAlert = async (
  petId: string
): Promise<[ErrorResponse | null, MissingAlertToggleResponse | null]> => {
  const [error, response] = await httpClientFetch<
    MissingAlertToggleResponse,
    ErrorResponse
  >({
    url: `/missing-alerts/toggle`,
    method: 'POST',
    data: {
      petId
    }
  })

  if (!error) {
    revalidateTag('pets')
  }

  return [error, response]
}
