import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simplified middleware for role-based access
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl
  
  // Check if it's an asset path that should be allowed
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.includes('/favicon.ico') ||
    pathname.match(/\.(png|jpg|svg|js|css)$/)
  ) {
    return NextResponse.next()
  }
  
  // Get the auth token cookie
  const userRole = request.cookies.get('user-role')?.value
  
  // Allow access to login and forgot password pages
  if (pathname === '/login' || pathname === '/forgot-password') {
    return NextResponse.next()
  }
  
  // If there's no role cookie, redirect to login
  if (!userRole) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  
  // Branch-specific pages that only branch users should access
  const branchOnlyPaths = [
    '/my-branch', 
    '/staff-users', 
    '/payment-payloads', 
    '/waiter-statistics'
  ]
  
  // Admin-specific pages that only admins should access
  const adminOnlyPaths = [
    '/backup-maintenance',
    '/branch-list',
    '/main-branch',
    '/app-settings'
    // Add more admin-only paths here
  ]
  
  // Check if branch user is trying to access admin-only pages
  if (userRole === 'branch' && adminOnlyPaths.some(path => pathname.startsWith(path))) {
    // Redirect to dashboard if branch user tries to access admin pages
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
  
  // Check if admin user is trying to access branch-only pages
  // We're allowing this for now, so admins can see branch pages
  
  return NextResponse.next()
}

// Define paths to match for middleware
export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!_next|api|favicon.ico).*)'
  ]
} 