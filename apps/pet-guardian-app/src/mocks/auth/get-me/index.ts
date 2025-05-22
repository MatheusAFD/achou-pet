import { http, HttpResponse } from 'msw'

export const getMeMock = [
  http.get('http://localhost:4000/api/auth/get-me', () => {
    return HttpResponse.json({
      name: 'John',
      lastName: 'Doe'
    })
  })
]
