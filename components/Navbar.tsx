'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Brain, Menu, X, ChevronRight } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const NAV_LINKS = [
  { href: '/test', label: 'IQ Test' },
  { href: '/games', label: 'Games' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Account'
  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <header className="sticky top-0 z-50 border-b border-border"
      style={{ background: 'rgba(5,7,13,0.85)', backdropFilter: 'blur(16px)' }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', boxShadow: '0 0 16px rgba(37,99,235,0.4)' }}>
            <Brain size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg text-white tracking-wide">
            Neuro Index
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname.startsWith(href)
            return (
              <Link key={href} href={href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${active ? 'text-white bg-accent/10 border border-accent/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                style={active ? { color: '#93bbff' } : {}}>
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link href="/account"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', color: 'white' }}>
                  {initials}
                </div>
                {name}
              </Link>
              <button onClick={handleLogout}
                className="text-sm text-slate-500 hover:text-white transition-colors font-semibold">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/test"
                className="text-sm font-medium px-4 py-2 rounded-xl text-white transition-all duration-200 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}>
                Take the Free Test →
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border" style={{ background: 'rgba(8,13,23,0.98)' }}>
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <span className="font-semibold">{label}</span>
                <ChevronRight size={16} className="text-slate-600" />
              </Link>
            ))}
            <div className="pt-3 border-t border-border space-y-2">
              {user ? (
                <>
                  <Link href="/account" onClick={() => setMobileOpen(false)}
                    className="btn-ghost w-full justify-center">My Account</Link>
                  <button onClick={handleLogout} className="w-full text-slate-500 text-sm py-2">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/test" onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-3 rounded-xl font-medium text-white text-sm"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}>
                    Take the Free Test →
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
