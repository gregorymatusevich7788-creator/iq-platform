import Link from 'next/link'
import { ChevronRight, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { IQ_BY_US_STATE } from '@/lib/iqData'

export const metadata = {
  title: 'Average IQ by US State 2025 — Which State is Smartest? | Cerebrum Index',
  description: 'See average IQ scores for all 50 US states. Massachusetts leads with 104.3 — find out where your state ranks nationally.',
}

export default function ByStatePage() {
  const top5 = IQ_BY_US_STATE.slice(0, 5)
  const bottom5 = [...IQ_BY_US_STATE].sort((a, b) => b.rank - a.rank).slice(0, 5)

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-14">
        {/* Header */}
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
          <Link href="/rankings" className="hover:text-white transition-colors">Rankings</Link>
          <ChevronRight size={14} />
          <span className="text-slate-300">By US State</span>
        </div>

        <div className="text-center mb-14">
          <div className="section-label mx-auto w-fit mb-4">
            <MapPin size={12} /> United States
          </div>
          <h1 className="font-display font-bold text-5xl text-white mb-4">
            Average IQ by US State
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Massachusetts leads the nation with an average IQ of 104.3.
            See how all 50 states compare and find your state&apos;s ranking.
          </p>
        </div>

        {/* Top/Bottom highlights */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="card p-6">
            <h3 className="font-display font-bold text-green-400 uppercase tracking-widest text-sm mb-4">🏆 Top 5 Smartest States</h3>
            <div className="space-y-3">
              {top5.map(({ state, abbr, iq, rank }) => (
                <div key={state} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 font-mono text-xs text-slate-600">#{rank}</span>
                    <span className="text-slate-300 text-sm">{state}</span>
                    <span className="text-xs text-slate-600 font-mono">{abbr}</span>
                  </div>
                  <span className="font-display font-bold text-white">{iq}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h3 className="font-display font-bold text-orange-400 uppercase tracking-widest text-sm mb-4">📊 Bottom 5 States</h3>
            <div className="space-y-3">
              {bottom5.map(({ state, abbr, iq, rank }) => (
                <div key={state} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 font-mono text-xs text-slate-600">#{rank}</span>
                    <span className="text-slate-300 text-sm">{state}</span>
                    <span className="text-xs text-slate-600 font-mono">{abbr}</span>
                  </div>
                  <span className="font-display font-bold text-white">{iq}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full table */}
        <div className="card overflow-hidden mb-12">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-display font-bold text-white">All 50 States</h3>
            <span className="text-slate-500 text-xs">Average IQ Score</span>
          </div>
          <div className="divide-y divide-border">
            {IQ_BY_US_STATE.map(({ state, abbr, iq, rank }) => (
              <div key={state} className="flex items-center justify-between px-6 py-3.5 hover:bg-bg-700 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="w-7 font-mono text-xs text-slate-600 text-right">#{rank}</span>
                  <div>
                    <span className="text-slate-200 text-sm font-medium">{state}</span>
                    <span className="text-slate-600 text-xs ml-2 font-mono">{abbr}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:block w-32 h-1.5 bg-bg-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500 opacity-70"
                      style={{ width: `${((iq - 94) / 11) * 100}%` }} />
                  </div>
                  <span className="font-display font-bold text-white w-12 text-right">{iq}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card p-8 text-center" style={{ borderColor: 'rgba(37,99,235,0.25)' }}>
          <h3 className="font-display font-bold text-2xl text-white mb-3">
            How Do You Compare to Your State?
          </h3>
          <p className="text-slate-400 mb-6">Take the free IQ test and find out if you&apos;re above or below your state&apos;s average</p>
          <Link href="/test" className="btn-primary">
            Take the Free IQ Test <ChevronRight size={16} />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
