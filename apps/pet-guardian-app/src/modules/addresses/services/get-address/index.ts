import { httpClientFetch } from '@user-app/modules/@shared/lib'
import { ErrorResponse } from '@user-app/modules/@shared/types'
import { Pet } from '@user-app/modules/my-pets/services/get-pet/types'

export const getAddress = async (
  id: string
): Promise<[ErrorResponse | null, Pet | null]> => {
  const [error, data] = await httpClientFetch<Pet, ErrorResponse>({
    url: `/addresses/${id}`,
    method: 'GET'
  })

  return [error, data]
}
