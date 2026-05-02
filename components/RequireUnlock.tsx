'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function RequireUnlock({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [unlocked, setUnlocked] = useState<boolean | null>(null)

  useEffect(() => {
    setUnlocked(localStorage.getItem('iq_unlocked') === 'true')
  }, [])

  if (unlocked === null) return null

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#060d1f' }}>
        <div className="max-w-sm w-full text-center rounded-2xl p-8"
          style={{ background: '#0a1628', border: '1px solid rgba(245,158,11,0.3)' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}>
            <Lock size={28} className="text-yellow-400" />
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-3">Premium Game</h2>
          <p className="text-slate-400 text-sm mb-6">Unlock all 6 brain training games with a free trial</p>
          <button onClick={() => router.push('/unlock?session=games')}
            className="w-full py-4 rounded-xl font-display font-bold text-sm uppercase tracking-widest text-white mb-3"
            style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)', boxShadow: '0 0 20px rgba(245,158,11,0.3)' }}>
            Unlock Now
          </button>
          <button onClick={() => router.back()} className="text-slate-600 text-xs hover:text-slate-400 transition-colors">
            Go back
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
