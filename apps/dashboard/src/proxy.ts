import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const publicRoutes = [
  {
    path: '/sign-in',
    whenAuthenticated: 'redirect',
  },
  {
    path: '/sign-up',
    whenAuthenticated: 'redirect',
  },
]

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/sign-in'

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname

  const publicRoute = publicRoutes.find((route) => route.path === path)
  const sessionToken = request.cookies.get('monoauth.session_token')

  if (!sessionToken && publicRoute) {
    return NextResponse.next()
  }

  if (!sessionToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED

    return NextResponse.redirect(redirectUrl)
  }

  if (
    sessionToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = '/'

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
}
