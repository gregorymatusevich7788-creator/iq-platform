'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/test', label: 'IQ Test' },
  { href: '/games', label: 'Brain Games' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/blog', label: 'Blog' },
]

function LogoMark({ size = 32 }: { size?: number }) {
  const r = size / 40
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#2563eb"/>
      <rect x="10" y="10" width="4" height="20" rx="2" fill="white"/>
      <circle cx="26" cy="20" r="8" stroke="white" strokeWidth="3.5" fill="none"/>
      <line x1="31" y1="27" x2="36" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md" style={{ borderBottom: '1px solid #e5e7eb' }}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark size={32} />
          <span className="font-bold text-lg tracking-tight" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>
            Iq<span style={{ color: '#2563eb' }}>Hero</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link key={href} href={href} className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ color: active ? '#2563eb' : '#64748b', background: active ? 'rgba(37,99,235,0.08)' : 'transparent' }}>
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex">
          <Link href="/test" className="btn-primary px-5 py-2.5 text-sm">Take Free IQ Test →</Link>
        </div>

        <button className="md:hidden p-2 rounded-lg" style={{ color: '#64748b' }} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white animate-slide-down" style={{ borderTop: '1px solid #e5e7eb' }}>
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className="flex px-4 py-3 rounded-xl text-sm font-medium" style={{ color: '#374151' }}>
                {label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/test" onClick={() => setOpen(false)} className="btn-primary w-full text-center py-3 text-sm">
                Take Free IQ Test →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
