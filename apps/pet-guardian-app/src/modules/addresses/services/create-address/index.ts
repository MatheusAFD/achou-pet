import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'

import { AddressFormData } from '../../components/address-form/types'
import { Address } from '../get-address/types'

export const createAddress = async (
  data: AddressFormData
): Promise<[ErrorResponse | null, Address | null]> => {
  const [error, response] = await httpClientFetch<Address, ErrorResponse>({
    url: '/addresses',
    method: 'POST',
    data
  })

  return [error, response]
}
