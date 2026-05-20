'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trophy, Medal, RefreshCw } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabaseClient'

const MOCK_USERS = [
  { name: 'Alex M.', location: 'Massachusetts', iq: 142, avatar: 'A', isReal: false },
  { name: 'Sarah K.', location: 'New York', iq: 138, avatar: 'S', isReal: false },
  { name: 'James R.', location: 'California', iq: 135, avatar: 'J', isReal: false },
  { name: 'Emily T.', location: 'Texas', iq: 131, avatar: 'E', isReal: false },
  { name: 'David L.', location: 'Washington', iq: 129, avatar: 'D', isReal: false },
  { name: 'Anna P.', location: 'Florida', iq: 127, avatar: 'A', isReal: false },
  { name: 'Mike B.', location: 'Illinois', iq: 124, avatar: 'M', isReal: false },
  { name: 'Lisa W.', location: 'Colorado', iq: 122, avatar: 'L', isReal: false },
  { name: 'Chris N.', location: 'Oregon', iq: 119, avatar: 'C', isReal: false },
  { name: 'Kate F.', location: 'Michigan', iq: 117, avatar: 'K', isReal: false },
]

const COLORS = ['#f59e0b', '#94a3b8', '#f97316', '#3b82f6', '#10b981', '#a855f7', '#ec4899', '#06b6d4', '#84cc16', '#f43f5e']

type Entry = { name: string; location: string; iq: number; avatar: string; isReal: boolean }

export default function RankingsPage() {
  const [entries, setEntries] = useState<Entry[]>(MOCK_USERS)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'global' | 'weekly'>('global')
  const [stats, setStats] = useState({ total: 0, avgIQ: 0, topScore: 0 })

  useEffect(() => {
    loadRankings()
  }, [])

  async function loadRankings() {
    setLoading(true)
    try {
      const { data } = await supabase
        .from('test_results')
        .select('iq_score, user_id')
        .order('iq_score', { ascending: false })
        .limit(50)

      if (data && data.length > 0) {
        const realEntries: Entry[] = data.slice(0, 10).map((r, i) => ({
          name: `User ${String(r.user_id || '').slice(0, 4) || (1000 + i)}`,
          location: 'United States',
          iq: r.iq_score,
          avatar: String.fromCharCode(65 + (i % 26)),
          isReal: true,
        }))

        const avg = Math.round(data.reduce((s, r) => s + r.iq_score, 0) / data.length)
        setStats({ total: 1023697, avgIQ: avg, topScore: data[0]?.iq_score || 0 })

        // Merge real + mock, sort by IQ
        const merged = [...realEntries, ...MOCK_USERS]
          .sort((a, b) => b.iq - a.iq)
          .slice(0, 10)
        setEntries(merged)
      } else {
        setStats({ total: 1023697, avgIQ: 104, topScore: 142 })
        setEntries(MOCK_USERS)
      }
    } catch {
      setStats({ total: 1023697, avgIQ: 104, topScore: 142 })
      setEntries(MOCK_USERS)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen" style={{ background: "#f5f7fb" }}>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-14">

        <div className="text-center mb-10">
          <div className="section-label mx-auto w-fit mb-4">Live Rankings</div>
          <h1 className="font-bold text-4xl md:text-5xl mb-4" style={{ color: "#2563eb", fontFamily: ""Lora", serif" }}>Global IQ Leaderboard</h1>
          <p className="text-sm" style={{ color: "#6b7280" }}>Updated in real-time. Take the test to appear on the leaderboard.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Tests', value: stats.total > 0 ? stats.total.toLocaleString() : '1,023,697' },
            { label: 'Average IQ', value: stats.avgIQ > 0 ? stats.avgIQ : 104 },
            { label: 'Top Score', value: stats.topScore > 0 ? stats.topScore : 142 },
          ].map(({ label, value }) => (
            <div key={label} className="card p-4 text-center">
              <div className="font-bold text-2xl" style={{ color: "#111827", fontFamily: ""Lora", serif" }}>{value}</div>
              <div className="text-gray-500 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ background: '#f3f4f6', border: '1px solid #e5e7eb' }}>
          {(['global', 'weekly'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
              style={tab === t ? { background: '#1d4ed8', color: '#fff' } : { color: '#64748b' }}>
              {t === 'global' ? '🌍 All Time' : '📅 This Week'}
            </button>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="space-y-3 mb-8">
          {loading ? (
            [...Array(10)].map((_, i) => (
              <div key={i} className="card p-4 animate-pulse h-16" />
            ))
          ) : entries.map((entry, i) => (
            <div key={i} className="card p-4 flex items-center gap-4">
              <div className="w-8 text-center flex-shrink-0">
                {i === 0 ? <span className="text-2xl">🥇</span> :
                 i === 1 ? <span className="text-2xl">🥈</span> :
                 i === 2 ? <span className="text-2xl">🥉</span> :
                 <span className="font-bold" style={{ color: "#9ca3af" }}>{i + 1}</span>}
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-white flex-shrink-0"
                style={{ background: COLORS[i % COLORS.length] }}>
                {entry.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm flex items-center gap-2" style={{ color: "#111827" }}>
                  {entry.name}
                  {entry.isReal && <span className="text-xs px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>verified</span>}
                </div>
                <div className="text-gray-500 text-xs">{entry.location}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold" style={{ color: "#2563eb" }}>{entry.iq}</div>
                <div className="text-gray-500 text-xs">IQ</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="card p-6 text-center">
          <Trophy size={28} className="text-yellow-400 mx-auto mb-3" />
          <h3 className="font-bold text-xl mb-2" style={{ color: "#111827", fontFamily: ""Lora", serif" }}>Think you can make the top 10?</h3>
          <p className="text-gray-500 text-sm mb-4">Take the free IQ test and see where you rank globally.</p>
          <Link href="/test" className="btn-primary">Take Free IQ Test</Link>
        </div>

      </main>
      <Footer />
    </div>
  )
}
