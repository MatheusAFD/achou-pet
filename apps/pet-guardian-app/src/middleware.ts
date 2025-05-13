import { NextRequest, NextResponse } from 'next/server'

import { jwtDecode } from 'jwt-decode'

import { publicRoutes } from './modules/@shared/constants'

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/auth/sign-in'
const REDIRECT_WHEN_TOKEN_INVALID = '/auth/logout'
const REDIRECT_WHEN_AUTHENTICATED = '/meus-pets'

const handleRedirect = (request: NextRequest, pathname: string) => {
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = pathname
  return NextResponse.redirect(redirectUrl)
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find((route) => route.path === path)
  const token = request.cookies.get('achou-pet-token')?.value

  if (token && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    return handleRedirect(request, REDIRECT_WHEN_AUTHENTICATED)
  }

  if (token) {
    try {
      const decoded: { exp?: number } = jwtDecode(token)
      const currentDate = Math.floor(Date.now() / 1000)
      if (!decoded.exp || currentDate >= decoded.exp) {
        return handleRedirect(request, REDIRECT_WHEN_TOKEN_INVALID)
      }

      return NextResponse.next()
    } catch {
      return handleRedirect(request, REDIRECT_WHEN_TOKEN_INVALID)
    }
  }

  if (publicRoute) {
    return NextResponse.next()
  }

  return handleRedirect(request, REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE)
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - public
    // - favicon.ico, sitemap.xml, robots.txt (metadata files)
    '/((?!api|_next/static|_next/image|.*\\..*|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}
