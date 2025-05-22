import { http, HttpResponse } from 'msw'

import { generateMockJwtToken } from '@user-app/modules/mocks/utils'

export const signInMock = [
  http.post<never, { email: string; password: string }>(
    'http://localhost:4000/api/auth/sign-in',
    async ({ request }) => {
      const { email, password } = await request.json()

      if (email === 'johndoe@example.com' && password === 'password') {
        const accessToken = generateMockJwtToken()
        const refreshToken = 'sample-refresh-token'

        return new HttpResponse(JSON.stringify({ accessToken, refreshToken }), {
          status: 201
        })
      }

      return new HttpResponse(JSON.stringify({}), { status: 401 })
    }
  )
]
