import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#111827', borderTop: '1px solid #1f2937' }}>
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
              >
                <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
                  <rect x="10" y="10" width="4" height="20" rx="2" fill="white"/>
                  <circle cx="26" cy="20" r="8" stroke="white" strokeWidth="3.5" fill="none"/>
                  <line x1="31" y1="27" x2="36" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-bold text-white text-base">IqHero</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
              America&apos;s most trusted online IQ assessment. Scientifically inspired, trusted by millions.
            </p>
          </div>

          {[
            {
              title: 'Assessment',
              links: [
                { href: '/test', label: 'Free IQ Test' },
                { href: '/blog', label: 'Sample Questions' },
                { href: '/rankings', label: 'IQ Rankings' },
                { href: '/games', label: 'Brain Games' },
              ],
            },
            {
              title: 'Learn',
              links: [
                { href: '/blog', label: 'IQ Research Blog' },
                { href: '/blog/what-is-iq', label: 'What Is IQ?' },
                { href: '/rankings', label: 'Score Distributions' },
                { href: '/blog', label: 'Cognitive Science' },
              ],
            },
            {
              title: 'Company',
              links: [
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/terms', label: 'Refund Policy' },
                { href: '/blog', label: 'About IQ Testing' },
              ],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-semibold text-white text-sm mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm transition-colors"
                      style={{ color: '#9ca3af' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid #1f2937' }}
        >
          <p className="text-sm" style={{ color: '#6b7280' }}>
            © 2026 IqHero. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#4b5563' }}>
            For entertainment and educational purposes. Not a clinical IQ assessment.
          </p>
        </div>
      </div>
    </footer>
  )
}
