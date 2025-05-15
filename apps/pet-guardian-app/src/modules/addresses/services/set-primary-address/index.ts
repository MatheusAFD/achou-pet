'use server'

import { revalidateTag } from 'next/cache'

import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { Address } from '../get-address/types'

export const setPrimaryAddress = async (
  addressId: string
): Promise<[ErrorResponse | null, Address | null]> => {
  const [error, response] = await httpClientFetch<Address, ErrorResponse>({
    url: `/addresses/set-primary/${addressId}`,
    method: 'PATCH'
  })

  if (!error) {
    revalidateTag('addresses')
  }

  return [error, response]
}
