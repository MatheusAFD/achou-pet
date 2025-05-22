import { http, HttpResponse } from 'msw'

import { addressesStore } from './addresses-store'

export const getAddresses = [
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/addresses`, () => {
    return HttpResponse.json(addressesStore)
  })
]
