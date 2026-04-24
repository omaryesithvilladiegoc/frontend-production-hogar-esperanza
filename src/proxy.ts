import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value  
  const { pathname } = request.nextUrl

  let isValidToken = false

  if (token && typeof token === 'string' && token.length > 10) {
    isValidToken = true
  }

  // Si ya está logueado, no puede entrar a /login
  if (pathname === '/login' && isValidToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Si intenta entrar a rutas privadas sin token válido
  if (pathname.startsWith('/dashboard') && !isValidToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
}
