'use client'

import { useState, useEffect, Suspense } from 'react'
import { hasAccess } from '@/lib/payment'
import { useRouter, useSearchParams } from 'next/navigation'

const STEPS = [
  'Pattern Recognition Analysis',
  'Logical Reasoning Evaluation',
  'Memory Performance Mapping',
  'Processing Speed Indexing',
  'Focus & Attention Modeling',
  'Cognitive Score Calibration',
]

const MESSAGES = [
  'Comparing your results with global test data...',
  'Analyzing response patterns across all domains...',
  'Running statistical normalization algorithms...',
  'Finalizing your cognitive score...',
]

function AnalyzingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session') || ''
  const [progress, setProgress] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [messageIndex, setMessageIndex] = useState(0)
  const [ready, setReady] = useState(false)
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(d => d.length >= 3 ? '.' : d + '.')
    }, 400)
    return () => clearInterval(dotInterval)
  }, [])

  useEffect(() => {
    const total = 10000
    const step = total / (STEPS.length + 2)

    STEPS.forEach((_, i) => {
      setTimeout(() => setCompletedSteps(prev => [...prev, i]), step * (i + 1))
    })

    setTimeout(() => setMessageIndex(1), step * 1.5)
    setTimeout(() => setMessageIndex(2), step * 3)
    setTimeout(() => setMessageIndex(3), step * 5)

    const iv = setInterval(() => {
      setProgress(p => { if (p >= 97) { clearInterval(iv); return 97 } return p + 0.5 })
    }, 50)

    setTimeout(() => { setProgress(100); setReady(true); clearInterval(iv) }, total - 1500)
    setTimeout(() => { router.push(hasAccess(sessionId) ? '/results/' + sessionId : '/unlock?session=' + sessionId) }, total)

    return () => clearInterval(iv)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#060d1f' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse-ring {
          0% { transform:scale(0.95); box-shadow:0 0 0 0 rgba(59,130,246,0.4); }
          70% { transform:scale(1); box-shadow:0 0 0 20px rgba(59,130,246,0); }
          100% { transform:scale(0.95); box-shadow:0 0 0 0 rgba(59,130,246,0); }
        }
        @keyframes shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
        @keyframes glow { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        .brain-pulse { animation: pulse-ring 2s infinite; }
        .progress-bar {
          background: linear-gradient(90deg,#1d4ed8 0%,#3b82f6 40%,#60a5fa 50%,#3b82f6 60%,#1d4ed8 100%);
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
        }
        .glow { animation: glow 2s ease-in-out infinite; }
        .dot-pulse { animation: glow 1s ease-in-out infinite; }
      `}</style>

      <div className="w-full max-w-md">

        <div className="flex justify-center mb-8">
          <div className="brain-pulse w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#1d4ed8,#2563eb)' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-4.74Z"/>
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-4.74Z"/>
            </svg>
          </div>
        </div>

        <div className="text-center mb-8">
          {ready ? (
            <h1 className="fade-in font-bold text-2xl text-white mb-2" style={{ fontFamily:"'Syne',sans-serif" }}>
              Your results are ready ✓
            </h1>
          ) : (
            <h1 className="font-bold text-2xl text-white mb-2" style={{ fontFamily:"'Syne',sans-serif" }}>
              Analyzing Your Cognitive Profile
            </h1>
          )}
          <p className="text-slate-400 text-sm leading-relaxed">
            {ready ? 'Redirecting you to your report...' : 'Our AI engine is processing your responses across multiple intelligence domains'}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Analysis progress</span>
            <span className="font-mono text-blue-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full progress-bar transition-all duration-300" style={{ width:`${progress}%` }} />
          </div>
        </div>

        <div className="rounded-2xl p-5 mb-6 space-y-3" style={{ background:'#0a1628', border:'1px solid rgba(255,255,255,0.08)' }}>
          {STEPS.map((step, i) => {
            const done = completedSteps.includes(i)
            const active = !done && completedSteps.length === i
            return (
              <div key={step} className={`flex items-center gap-3 transition-all duration-300 ${done ? 'fade-in' : ''}`}
                style={{ opacity: done || active ? 1 : 0.25 }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: done ? '#10b981' : active ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
                    border: done ? '1px solid #10b981' : active ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.1)'
                  }}>
                  {done ? (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : active ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dot-pulse" />
                  ) : null}
                </div>
                <span className="text-sm transition-colors duration-300"
                  style={{ color: done ? '#e2e8f0' : active ? '#93c5fd' : '#475569' }}>
                  {step}
                </span>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <p key={messageIndex} className="fade-in text-xs glow" style={{ color:'#64748b' }}>
            {MESSAGES[messageIndex]}{!ready && dots}
          </p>
        </div>

      </div>
    </div>
  )
}

export default function AnalyzingPage() {
  return <Suspense><AnalyzingContent /></Suspense>
}
