import { http, HttpResponse } from 'msw'

export const getMePetsMock = [
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pets/me`, () => {
    return HttpResponse.json([{ name: 'Dog', age: 3, type: 'dog', id: '1' }], {
      status: 200
    })
  })
]
