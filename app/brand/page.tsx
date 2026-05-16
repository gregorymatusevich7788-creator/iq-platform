import Image from 'next/image'

const COLORS = [
  { name: 'Primary Blue', hex: '#2563eb' },
  { name: 'Accent', hex: '#3b82f6' },
  { name: 'Dark', hex: '#0f172a' },
  { name: 'Gray', hex: '#64748b' },
  { name: 'Light', hex: '#f8fafc' },
]

export default function BrandPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#0f172a', fontFamily: "'Lora', serif" }}>IqHero Brand System</h1>
        <p className="text-base mb-12" style={{ color: '#64748b' }}>Design language · Visual identity</p>

        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#64748b' }}>Logo Variants</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl p-8 flex items-center justify-center" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <Image src="/brand/logo-primary.svg" alt="Primary" width={160} height={40} />
            </div>
            <div className="rounded-2xl p-8 flex items-center justify-center" style={{ background: '#0f172a' }}>
              <Image src="/brand/logo-dark.svg" alt="Dark" width={160} height={40} />
            </div>
            <div className="rounded-2xl p-8 flex items-center justify-center" style={{ background: '#2563eb' }}>
              <Image src="/brand/logo-dark.svg" alt="Blue bg" width={160} height={40} />
            </div>
            <div className="rounded-2xl p-8 flex flex-col items-center gap-4" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#94a3b8' }}>Icon sizes</p>
              <div className="flex items-center gap-6">
                <Image src="/brand/logo-mark.svg" alt="40px" width={40} height={40} />
                <Image src="/brand/favicon.svg" alt="32px" width={32} height={32} />
                <Image src="/brand/favicon.svg" alt="16px" width={16} height={16} />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#64748b' }}>Color Palette</h2>
          <div className="grid grid-cols-5 gap-3">
            {COLORS.map(({ name, hex }) => (
              <div key={hex} className="rounded-xl overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>
                <div className="h-14" style={{ background: hex }} />
                <div className="px-3 py-2 bg-white">
                  <div className="text-xs font-bold" style={{ color: '#0f172a' }}>{name}</div>
                  <div className="text-xs font-mono" style={{ color: '#94a3b8' }}>{hex}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#64748b' }}>Typography</h2>
          <div className="rounded-2xl p-8" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
            <div className="mb-6">
              <div className="text-xs font-mono mb-2" style={{ color: '#94a3b8' }}>Lora — Display</div>
              <div className="text-4xl font-bold" style={{ color: '#0f172a', fontFamily: "'Lora', serif" }}>Discover Your True IQ Potential</div>
            </div>
            <div>
              <div className="text-xs font-mono mb-2" style={{ color: '#94a3b8' }}>Plus Jakarta Sans — Body</div>
              <div className="text-base" style={{ color: '#64748b' }}>Join millions of Americans who tested their intelligence with IqHero.</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
