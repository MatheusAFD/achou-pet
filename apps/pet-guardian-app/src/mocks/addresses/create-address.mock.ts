import { http, HttpResponse } from 'msw'

import { Address } from '@user-app/modules/addresses/services/get-address/types'

import { addressesStore } from './addresses-store'

export const createAddress = [
  http.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/addresses`,
    async ({ request }) => {
      const body = (await request.json()) as Address
      if (body.zipCode !== '78140444') {
        return HttpResponse.json(
          { message: 'CEP inválido para teste' },
          { status: 400 }
        )
      }

      const newAddress: Address = {
        id: String(addressesStore.length + 1),
        userId: '1',
        type: 'PRIMARY',
        address: body.address,
        number: body.number,
        complement: body.complement ?? null,
        neighborhood: body.neighborhood,
        reference: body.reference,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode
      }
      addressesStore.push(newAddress)
      return HttpResponse.json(newAddress, { status: 201 })
    }
  )
]
