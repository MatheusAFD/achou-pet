import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieStore = await cookies()

  cookieStore.delete('achou-pet-token')
  cookieStore.delete('achou-pet-refresh-token')

  const url = new URL('/auth/sign-in', request.url)

  return NextResponse.redirect(url)
}
