import { http, HttpResponse } from 'msw'

import { Address } from '@user-app/modules/addresses/services/get-address/types'

export const getMePetsMock = [
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/addresses`, () => {
    return HttpResponse.json(addresses, {
      status: 200
    })
  })
]

const addresses: Address[] = [
  {
    id: '1',
    userId: '1',
    type: 'PRIMARY',
    address: 'Rua das Flores',
    number: '123',
    complement: 'Apto 101',
    neighborhood: 'Centro',
    reference: 'Próximo à padaria',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01001-000'
  },
  {
    id: '2',
    userId: '2',
    type: 'SECONDARY',
    address: 'Avenida Brasil',
    number: '456',
    complement: null,
    neighborhood: 'Jardins',
    reference: 'Em frente ao parque',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01430-000'
  }
]
