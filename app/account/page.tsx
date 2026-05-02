'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Brain, LogOut, Trophy, Gamepad2, Star, TrendingUp, Clock, Award } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push('/auth/login'); return }
      setUser(user)
      const { data } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setResults(data || [])
      setLoading(false)
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  )

  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
  const bestResult = results.length > 0 ? results.reduce((a, b) => a.iq_score > b.iq_score ? a : b) : null

  function getColor(iq: number) {
    if (iq >= 130) return '#a855f7'
    if (iq >= 115) return '#10b981'
    if (iq >= 85) return '#3b82f6'
    return '#f59e0b'
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-xl text-white"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', boxShadow: '0 0 25px rgba(37,99,235,0.4)' }}>
              {initials}
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-white">{name}</h1>
              <p className="text-slate-400 text-sm">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        {/* Best score */}
        {bestResult ? (
          <div className="card p-8 mb-6" style={{ borderColor: `${getColor(bestResult.iq_score)}30` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Your Best IQ Score</p>
                <div className="font-display font-bold text-6xl mb-2" style={{ color: getColor(bestResult.iq_score) }}>
                  {bestResult.iq_score}
                </div>
                <p className="text-slate-300 font-semibold">{bestResult.category}</p>
                <p className="text-slate-500 text-sm">Top {100 - Math.round(bestResult.percentile)}% of all users</p>
              </div>
              <div className="text-right">
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center"
                  style={{ background: `${getColor(bestResult.iq_score)}15`, border: `1px solid ${getColor(bestResult.iq_score)}25` }}>
                  <Award size={40} style={{ color: getColor(bestResult.iq_score) }} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/5">
              <div className="text-center">
                <div className="font-display font-bold text-white text-lg">{results.length}</div>
                <div className="text-slate-500 text-xs">Tests Taken</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-white text-lg">{Math.round(bestResult.percentile)}%</div>
                <div className="text-slate-500 text-xs">Percentile</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-white text-lg">{Math.floor(bestResult.time_taken / 60)}m {bestResult.time_taken % 60}s</div>
                <div className="text-slate-500 text-xs">Best Time</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card p-10 text-center mb-6" style={{ borderColor: 'rgba(37,99,235,0.15)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}>
              <Brain size={28} className="text-blue-400" />
            </div>
            <h2 className="font-display font-bold text-2xl text-white mb-2">No tests taken yet</h2>
            <p className="text-slate-400 mb-7 max-w-md mx-auto text-sm">Take the free IQ test to discover your score and join the verified leaderboard.</p>
            <Link href="/test" className="btn-primary">Take the IQ Test →</Link>
          </div>
        )}

        {/* Test history */}
        {results.length > 0 && (
          <div className="card overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-white/5">
              <h3 className="font-display font-bold text-white">Test History</h3>
            </div>
            {results.map((r, i) => (
              <div key={r.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/2 transition-colors"
                style={{ borderBottom: i < results.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold"
                  style={{ background: `${getColor(r.iq_score)}15`, color: getColor(r.iq_score) }}>
                  {r.iq_score}
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">{r.category}</div>
                  <div className="text-slate-500 text-xs">{new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                </div>
                <div className="text-slate-400 text-sm">Top {100 - Math.round(r.percentile)}%</div>
                <Link href={`/results/${r.session_id}`} className="text-blue-400 hover:text-blue-300 text-xs transition-colors">View →</Link>
              </div>
            ))}
          </div>
        )}

        {/* Quick links */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Trophy, label: 'Rankings', href: '/rankings', color: '#f59e0b', desc: 'See how you compare' },
            { icon: Gamepad2, label: 'Brain Games', href: '/games', color: '#10b981', desc: 'Train your mind daily' },
            { icon: Star, label: 'Go Premium', href: '/pricing', color: '#a855f7', desc: 'Unlock full report' },
          ].map(({ icon: Icon, label, href, color, desc }) => (
            <Link key={label} href={href}
              className="group p-5 rounded-2xl flex items-center gap-4 transition-all duration-300"
              style={{ background: 'var(--bg-800)', border: '1px solid rgba(255,255,255,0.06)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${color}35`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{label}</div>
                <div className="text-slate-500 text-xs">{desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
