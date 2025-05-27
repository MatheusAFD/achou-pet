import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieStore = await cookies()

  cookieStore.delete({
    name: 'achou-pet-admin-token',
    path: '/'
  })

  const url = new URL('/auth/sign-in', request.url)

  return NextResponse.redirect(url)
}
