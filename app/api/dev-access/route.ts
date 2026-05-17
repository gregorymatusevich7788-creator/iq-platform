import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const DEV_SECRET = 'iqhero-test-2026'

export async function GET(req: NextRequest) {
  const session = req.nextUrl.searchParams.get('session')
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== DEV_SECRET) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!session) return NextResponse.json({ error: 'missing session' }, { status: 400 })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  await supabase.from('access').upsert(
    { session_id: session, has_access: true },
    { onConflict: 'session_id' }
  )

  return NextResponse.redirect(new URL('/results/' + session, req.url))
}
