'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const STEPS = [
  'Processing pattern recognition',
  'Measuring logical reasoning',
  'Analyzing memory performance',
  'Calculating cognitive percentile',
  'Finalizing IQ profile',
]

function LogoMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="white" fillOpacity="0.2"/>
      <rect x="10" y="10" width="4" height="20" rx="2" fill="white"/>
      <circle cx="26" cy="20" r="8" stroke="white" strokeWidth="3.5" fill="none"/>
      <line x1="31" y1="27" x2="36" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

function AnalyzingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session') || ''
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const total = 9000
    const stepDuration = total / (STEPS.length + 1)

    STEPS.forEach((_, i) => {
      setTimeout(() => {
        setActiveStep(i + 1)
        setCompletedSteps(prev => [...prev, i])
      }, stepDuration * (i + 1))
    })

    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 97) { clearInterval(iv); return 97 }
        return Math.min(p + 0.4, 97)
      })
    }, 40)

    setTimeout(() => { setProgress(100); setReady(true) }, total - 800)
    setTimeout(async () => {
      try {
        const res = await fetch('/api/access/check?session=' + sessionId)
        const data = await res.json()
        router.push(data.hasAccess ? '/results/' + sessionId : '/unlock?session=' + sessionId)
      } catch {
        router.push('/unlock?session=' + sessionId)
      }
    }, total)

    return () => clearInterval(iv)
  }, [router, sessionId])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(160deg, #f8fafc 0%, #eff6ff 100%)' }}>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-12">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
            <LogoMark />
          </div>
          <span className="font-bold text-lg" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>
            Iq<span style={{ color: '#2563eb' }}>Hero</span>
          </span>
        </div>

        {/* Headline */}
        <div className="text-center mb-10">
          <h1 className="font-bold text-2xl mb-2.5" style={{ color: '#0f172a', fontFamily: "'Lora', serif", letterSpacing: '-0.01em' }}>
            {ready ? 'Analysis Complete ✓' : 'Analyzing Your Cognitive Profile'}
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
            {ready
              ? 'Redirecting to your results...'
              : 'Comparing your answers against millions of cognitive patterns'}
          </p>
        </div>

        {/* Big percentage */}
        <div className="text-center mb-8">
          <span className="font-bold tabular-nums"
            style={{ fontSize: 72, lineHeight: 1, color: '#2563eb', fontFamily: "'Lora', serif", letterSpacing: '-0.03em' }}>
            {Math.round(progress)}
          </span>
          <span className="text-2xl font-bold" style={{ color: '#2563eb' }}>%</span>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
            <div className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
                boxShadow: '0 0 12px rgba(37,99,235,0.4)',
              }} />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {STEPS.map((step, i) => {
            const done = completedSteps.includes(i)
            const active = activeStep === i && !done
            return (
              <div key={step} className="flex items-center gap-3 transition-all duration-500"
                style={{ opacity: done || active || i === 0 ? 1 : i <= activeStep ? 0.6 : 0.25 }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: done ? '#2563eb' : active ? 'rgba(37,99,235,0.12)' : '#f1f5f9',
                    border: done ? 'none' : active ? '1.5px solid rgba(37,99,235,0.4)' : '1.5px solid #e2e8f0',
                  }}>
                  {done ? (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : active ? (
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#2563eb' }} />
                  ) : null}
                </div>
                <span className="text-sm font-medium transition-colors duration-300"
                  style={{ color: done ? '#0f172a' : active ? '#2563eb' : '#94a3b8' }}>
                  {step}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function AnalyzingPage() {
  return <Suspense><AnalyzingContent /></Suspense>
}
