import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for login page and API routes
  if (
    pathname.startsWith('/login') || 
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/api/') || 
    pathname.startsWith('/_next/') || 
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // Check for authentication
  const sessionCookie = request.cookies.get('next-auth.session-token') || 
                        request.cookies.get('__Secure-next-auth.session-token')
  
  // If no session token found, redirect to login
  if (!sessionCookie) {
    const loginUrl = new URL('/login', request.url)
    if (pathname !== '/') {
      loginUrl.searchParams.set('callbackUrl', pathname)
    }
    return NextResponse.redirect(loginUrl)
  }
  
  return NextResponse.next()
}

// Use a simple matcher without capturing groups or complex regex
export const config = {
  matcher: [
    '/((?!api|_next|login|forgot-password).*)',
  ],
} 