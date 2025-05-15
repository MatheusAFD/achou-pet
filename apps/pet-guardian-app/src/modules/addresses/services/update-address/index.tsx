'use server'

import { revalidateTag } from 'next/cache'

import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { AddressFormData } from '../../components/address-form/types'
import { Address } from '../get-address/types'

interface UpdateAddressParams {
  addressId: string
  data: AddressFormData
}

export const updateAddress = async ({
  addressId,
  data
}: UpdateAddressParams): Promise<[ErrorResponse | null, Address | null]> => {
  const [error, response] = await httpClientFetch<Address, ErrorResponse>({
    url: `/addresses/${addressId}`,
    method: 'PATCH',
    data
  })

  if (!error) {
    revalidateTag('addresses')
  }

  return [error, response]
}
