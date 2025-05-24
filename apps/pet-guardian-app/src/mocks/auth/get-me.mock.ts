import { http, HttpResponse } from 'msw'

export const getMeMock = [
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/get-me`, () => {
    return HttpResponse.json({
      name: 'John',
      lastName: 'Doe'
    })
  })
]
