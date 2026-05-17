import { NextRequest, NextResponse } from 'next/server'
import { grantAccess } from '@/lib/server/payment'

const DEV_SECRET = 'iqhero-test-2026'

export async function GET(req: NextRequest) {
  const session = req.nextUrl.searchParams.get('session')
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== DEV_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  if (!session) {
    return NextResponse.json({ error: 'missing session' }, { status: 400 })
  }

  const ok = await grantAccess(session)
  if (!ok) return NextResponse.json({ error: 'grant failed' }, { status: 500 })

  return NextResponse.redirect(new URL('/results/' + session, req.url))
}
