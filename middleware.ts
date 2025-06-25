import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of supported locales
export const supportedLocales = ['en', 'ko']
export const defaultLocale = 'en'

// Get the preferred locale from cookie, accept-language header, or default
function getLocale(request: NextRequest) {
  // Check if there's a cookie with locale preference
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && supportedLocales.includes(cookieLocale)) {
    return cookieLocale
  }

  // Check accept-language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const locales = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .filter(lang => supportedLocales.includes(lang))
    
    if (locales.length > 0) {
      return locales[0]
    }
  }

  // Default locale
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip if the request is for non-HTML content (static assets, API routes, etc.)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Files with extensions like .jpg, .css, etc.
  ) {
    return NextResponse.next()
  }

  // Get the preferred locale
  const locale = getLocale(request)
  
  // Store the locale in a cookie for future requests
  const response = NextResponse.next()
  response.cookies.set('NEXT_LOCALE', locale)

  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
