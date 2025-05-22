import { http, HttpResponse } from 'msw'

import { addresses } from './addresses-store'

export const getAddresses = [
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/addresses`, () => {
    return HttpResponse.json(addresses)
  })
]
