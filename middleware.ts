import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isGamePage = pathname.startsWith('/games/') && pathname !== '/games'
  
  if (isGamePage) {
    const unlocked = request.cookies.get('iq_unlocked')?.value
    if (unlocked !== 'true') {
      return NextResponse.redirect(new URL('/unlock?session=games', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/games/:path+']
}
