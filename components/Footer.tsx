import Link from 'next/link'
import { Brain } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20" style={{ background: 'var(--bg-900)' }}>
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }}>
                <Brain size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-white">Neuro Index</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              The most accurate free IQ test online. Trusted by over 2 million Americans.
            </p>
          </div>

          {/* IQ Tests */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-4">IQ Tests</h4>
            <ul className="space-y-3">
              {[
                { href: '/test', label: 'Free IQ Test' },
                { href: '/test', label: 'Sample Questions' },
                { href: '/faq', label: 'Test FAQ' },
                { href: '/blog', label: 'Blog Articles' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-4">Learn</h4>
            <ul className="space-y-3">
              {[
                { href: '/blog', label: 'Blog' },
                { href: '/rankings', label: 'IQ Rankings' },
                { href: '/iq-test-by-state', label: 'IQ by US State' },
                { href: '/games', label: 'Brain Games' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { href: '/blog/what-is-iq', label: 'About IQ Testing' },
                
                { href: '/privacy', label: 'Privacy Policy' },
                { href: "/terms", label: "Terms of Service" },
                { href: "/terms", label: "Refund Policy" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">© 2026 Neuro Index. All rights reserved.</p>
          <p className="text-slate-600 text-xs">
            For entertainment purposes. Not a clinical assessment.
          </p>
        </div>
      </div>
    </footer>
  )
}
