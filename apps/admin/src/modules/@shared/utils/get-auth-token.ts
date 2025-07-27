'use server'

import { cookies } from 'next/headers'

import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  id: string
  role: 'ADMIN' | 'USER'
  exp: number
  iat: number
}

export const getAuthToken = async () => {
  const cookieService = await cookies()

  const token = cookieService.get('achou-pet-admin-token')
  const refreshToken = cookieService.get('achou-pet-admin-refresh-token')

  const user: JwtPayload | undefined = token && jwtDecode(token?.value ?? '')

  const tokenHasExpired = user?.exp && Math.floor(Date.now() / 1000) >= user.exp

  const tokenExpirationTime = user?.exp

  return { token, user, tokenExpirationTime, tokenHasExpired, refreshToken }
}
