'use client'

import { useState, Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, Shield, Star, AlertTriangle, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

const SOCIAL_PROOF = [
  '🟢 847 people unlocked their results today',
  '⭐⭐⭐⭐⭐ Sarah K. from California just unlocked her score',
  '🧠 Join 2,000,000+ Americans who tested their IQ',
  '🟢 Michael T. from Texas just revealed his IQ score',
  '⭐⭐⭐⭐⭐ Jennifer R. from New York unlocked her results',
]

const FLOATING_NAMES = [
  '🟢 John just unlocked his IQ score',
  '🟢 Emily from Florida — IQ 118 revealed',
  '🟢 James from Texas just revealed his results',
  '🟢 Sarah just unlocked her score — IQ 121',
  '🟢 David from Ohio just got his IQ score',
]

function getFunnelState() {
  return {
    session: localStorage.getItem('iq_session_id'),
    started: JSON.parse(localStorage.getItem('iq_started') || 'null'),
    completed: JSON.parse(localStorage.getItem('iq_completed') || 'null'),
    paywall: JSON.parse(localStorage.getItem('iq_reached_paywall') || 'null'),
    paid: JSON.parse(localStorage.getItem('iq_paid') || 'null'),
  }
}

function UnlockContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session') || ''
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [email, setEmail] = useState('')
  const [timeLeft, setTimeLeft] = useState(10 * 60)
  const [socialIndex, setSocialIndex] = useState(0)
  const [socialVisible, setSocialVisible] = useState(true)
  const [floatingIndex, setFloatingIndex] = useState(0)
  const [floatingVisible, setFloatingVisible] = useState(true)
  const [fakeProgress, setFakeProgress] = useState(90)
  const [progressText, setProgressText] = useState('Processing neural patterns...')
  const [readyState, setReadyState] = useState<'processing' | 'almost' | 'ready'>('processing')

  const allFilled =
    name.length >= 2 &&
    cardNumber.replace(/\s/g, '').length === 16 &&
    expiry.length === 5 &&
    cvv.length === 3

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => (s > 0 ? s - 1 : 10 * 60)), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSocialVisible(false)
      setTimeout(() => {
        setSocialIndex(i => (i + 1) % SOCIAL_PROOF.length)
        setSocialVisible(true)
      }, 400)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingVisible(false)
      setTimeout(() => {
        setFloatingIndex(i => (i + 1) % FLOATING_NAMES.length)
        setFloatingVisible(true)
      }, 500)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let progress = 90
    const STEPS = [
      'Processing neural patterns...',
      'Comparing against national averages...',
      'Calculating cognitive profile...',
      'Finalizing IQ estimate...',
    ]
    let stepIdx = 0
    const iv = setInterval(() => {
      progress += 0.3
      if (progress >= 99) {
        progress = 99
        clearInterval(iv)
        setProgressText('Your IQ score is ready to be revealed')
        setReadyState('ready')
      } else {
        const newStep = Math.floor(((progress - 90) / 9) * STEPS.length)
        if (newStep !== stepIdx && newStep < STEPS.length) {
          stepIdx = newStep
          setProgressText(STEPS[stepIdx])
          if (progress > 95) setReadyState('almost')
        }
      }
      setFakeProgress(Math.min(progress, 99))
    }, 80)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    localStorage.setItem('iq_reached_paywall', JSON.stringify({ value: true, time: Date.now() }))
  }, [])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = 'Your results will be lost if you leave now'
      return e.returnValue
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const ss = String(timeLeft % 60).padStart(2, '0')
  const isUrgent = timeLeft < 180

  const formatCard = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (val: string) => {
    const d = val.replace(/\D/g, '').slice(0, 4)
    return d.length >= 2 ? d.slice(0, 2) + '/' + d.slice(2) : d
  }

  const handlePay = async () => {
    if (!agreed) { setError('Please confirm you agree to the terms to continue'); return }
    if (!email || !email.includes('@') || !email.includes('.')) { setError('Please enter a valid email address'); return }
    if (cardNumber.replace(/\s/g, '').length !== 16) { setError('Please enter a valid 16-digit card number'); return }
    if (expiry.length !== 5) { setError('Please enter expiry date (MM/YY)'); return }
    if (cvv.length !== 3) { setError('Please enter a valid CVV'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/payment/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
      if (!res.ok) throw new Error('Payment failed')

      try { await supabase.from('email_leads').insert({ email, session_id: sessionId }) } catch {}
      try {
        await fetch('/api/send-welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, sessionId }),
        })
      } catch {}

      localStorage.setItem('iq_paid', JSON.stringify({ value: true, time: Date.now() }))
      console.log('IQ FULL FUNNEL:', getFunnelState())
      router.push('/results/' + sessionId)
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: '#f5f7fb' }}>
      {/* Floating notification */}
      <div
        className="fixed bottom-6 left-4 z-50 transition-opacity duration-500"
        style={{ opacity: floatingVisible ? 1 : 0 }}
      >
        <div
          className="px-3 py-2 rounded-xl text-xs flex items-center gap-2"
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            color: '#374151',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          {FLOATING_NAMES[floatingIndex]}
        </div>
      </div>



      {/* Urgency bar */}
      <div
        className="sticky top-0 z-50 py-2.5 px-4 text-center text-sm font-semibold"
        style={{
          background: isUrgent ? '#dc2626' : '#2563eb',
          color: 'white',
        }}
      >
        ⏱ Results expire in {mm}:{ss}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-8 items-start justify-center">
          {/* Left sidebar — trust content (hidden on mobile) */}
          <div className="hidden lg:flex flex-col gap-5 w-72 flex-shrink-0 pt-2">

            {/* IQ fact card */}
            <div className="card p-5">
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#2563eb' }}>Did you know?</div>
              <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
                Only <strong style={{ color: '#111827' }}>2% of the population</strong> scores above 130 on a standardized IQ test — placing them in the "gifted" category.
              </p>
            </div>

            {/* Distribution visual */}
            <div className="card p-5">
              <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#6b7280' }}>IQ distribution</div>
              {[
                { label: 'Genius 130+', pct: 2, color: '#2563eb' },
                { label: 'Above avg 115–130', pct: 14, color: '#3b82f6' },
                { label: 'Average 85–115', pct: 68, color: '#93c5fd' },
                { label: 'Below avg 70–85', pct: 14, color: '#dbeafe' },
                { label: 'Low 70−', pct: 2, color: '#eff6ff' },
              ].map(({ label, pct, color }) => (
                <div key={label} className="mb-2">
                  <div className="flex justify-between text-xs mb-1" style={{ color: '#6b7280' }}>
                    <span>{label}</span><span>{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: '#e5e7eb' }}>
                    <div className="h-full rounded-full" style={{ width: `${pct === 2 ? 6 : pct}%`, minWidth: pct === 2 ? 8 : 0, background: color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Famous IQs */}
            <div className="card p-5">
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Famous IQ scores</div>
              {[
                { name: 'Albert Einstein', iq: '160', icon: '🔬' },
                { name: 'Marilyn Monroe', iq: '163', icon: '⭐' },
                { name: 'Elon Musk', iq: '155', icon: '🚀' },
                { name: 'Average American', iq: '98', icon: '🇺🇸' },
              ].map(({ name, iq, icon }) => (
                <div key={name} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <div className="flex items-center gap-2">
                    <span>{icon}</span>
                    <span className="text-sm" style={{ color: '#374151' }}>{name}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: '#2563eb' }}>IQ {iq}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Center — paywall */}
          <div className="w-full max-w-lg flex-shrink-0">
        {/* Analysis progress */}
        <div className="card p-5 mb-5 animate-fade-in">
          <div className="flex justify-between text-xs mb-2">
            <span style={{ color: readyState === 'ready' ? '#16a34a' : '#6b7280' }}>
              {progressText}
            </span>
            <span className="font-mono font-semibold" style={{ color: readyState === 'ready' ? '#16a34a' : '#2563eb' }}>
              {Math.round(fakeProgress)}%
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${fakeProgress}%`,
                background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
              }}
            />
          </div>
          {readyState === 'ready' && (
            <p className="text-xs font-medium mt-2 text-center animate-fade-in" style={{ color: '#16a34a' }}>
              ✓ Your cognitive profile is ready to be revealed
            </p>
          )}
        </div>

        {/* Social proof ticker */}
        <div
          className="card p-3 mb-5 text-center"
          style={{ transition: 'opacity 0.3s', opacity: socialVisible ? 1 : 0 }}
        >
          <p className="text-sm font-medium" style={{ color: '#374151' }}>
            {SOCIAL_PROOF[socialIndex]}
          </p>
        </div>

        {/* What you unlock */}
        <div className="card p-6 mb-5" style={{ border: '1.5px solid rgba(37,99,235,0.2)', background: 'linear-gradient(135deg, rgba(37,99,235,0.04) 0%, #ffffff 100%)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-center" style={{ color: '#9ca3af' }}>
            What You Unlock Today
          </p>
          <div className="space-y-3">
            {[
              { icon: '📄', title: 'Full IQ Score + PDF Certificate', sub: 'Official cognitive report with your exact IQ score and percentile ranking' },
              { icon: '🧩', title: 'Brain Training Games', sub: 'Unlimited access to cognitive exercises that improve memory, focus, and reasoning' },
              { icon: '⚡', title: 'Priority Support', sub: 'Fast-track responses from our cognitive assessment team' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
                <div>
                  <div className="text-sm font-semibold" style={{ color: '#111827' }}>{title}</div>
                  <div className="text-xs leading-relaxed mt-0.5" style={{ color: '#6b7280' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scientific trust badges */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { icon: <Shield size={16} style={{ color: '#16a34a' }} />, title: '256-bit SSL', sub: 'Bank-grade security' },
            { icon: <Star size={16} style={{ color: '#f59e0b' }} />, title: '4.9★ Rating', sub: '12,847 reviews' },
            { icon: <CheckCircle size={16} style={{ color: '#2563eb' }} />, title: 'Instant Access', sub: 'Results in seconds' },
          ].map(({ icon, title, sub }) => (
            <div key={title} className="card p-3 text-center">
              <div className="flex justify-center mb-1">{icon}</div>
              <div className="text-xs font-semibold" style={{ color: '#111827' }}>{title}</div>
              <div className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Payment form */}
        <div className="card p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-base" style={{ color: '#111827' }}>Secure Checkout</span>
            <div
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}
            >
              <Shield size={11} /> 256-bit SSL
            </div>
          </div>

          {readyState !== 'processing' && (
            <div
              className="mb-4 px-3 py-2 rounded-xl text-xs text-center animate-scale-in"
              style={{
                background: readyState === 'ready' ? 'rgba(22,163,74,0.08)' : 'rgba(245,158,11,0.08)',
                border: `1px solid ${readyState === 'ready' ? 'rgba(22,163,74,0.25)' : 'rgba(245,158,11,0.25)'}`,
                color: readyState === 'ready' ? '#16a34a' : '#d97706',
              }}
            >
              {readyState === 'almost' ? '⚡ Finalizing your cognitive profile...' : '✓ Your IQ score is ready to be revealed'}
            </div>
          )}

          <p className="text-xs mb-4" style={{ color: '#9ca3af' }}>
            Your results will be available instantly after completion
          </p>

          <div className="space-y-3">

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{ color: '#6b7280' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{ color: '#6b7280' }}>
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={e => setCardNumber(formatCard(e.target.value))}
                className="input font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{ color: '#6b7280' }}>
                  Expiry
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={e => setExpiry(formatExpiry(e.target.value))}
                  className="input font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{ color: '#6b7280' }}>
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  className="input font-mono"
                />
              </div>
            </div>
          </div>

          {error && (
            <div
              className="mt-3 px-4 py-2.5 rounded-xl text-xs text-center"
              style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#dc2626' }}
            >
              ⚠️ {error}
            </div>
          )}

          <div className="flex items-center gap-2 mt-4 mb-4 flex-wrap">
            {['VISA', 'MC', 'AMEX', 'PayPal'].map(b => (
              <span
                key={b}
                className="px-2.5 py-1 rounded text-xs font-bold"
                style={{ background: '#f9fafb', border: '1px solid #e5e7eb', color: '#6b7280' }}
              >
                {b}
              </span>
            ))}
          </div>

          {allFilled && !loading && (
            <div className="mb-3 text-center animate-fade-in">
              <p className="text-xs font-semibold" style={{ color: '#16a34a' }}>✓ You&apos;re one step away from your result</p>
            </div>
          )}

          <button
            onClick={handlePay}
            disabled={loading}
            className="btn-primary w-full py-4 text-base"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Unlocking results...</>
            ) : (
              <><Lock size={16} /> Start My 3-Day Trial → <span style={{ fontSize: "11px", opacity: 0.75, marginLeft: 4 }}>$0.49</span></>
            )}
          </button>

          <div className="flex items-center justify-center gap-4 mt-3 flex-wrap">
            {[
              { icon: <Shield size={11} style={{ color: '#16a34a' }} />, text: 'Secure payment' },
              { icon: <CheckCircle size={11} style={{ color: '#2563eb' }} />, text: 'Instant access' },
              { icon: <Star size={11} style={{ color: '#f59e0b' }} />, text: '3-day free trial' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1 text-xs" style={{ color: '#9ca3af' }}>
                {icon}<span>{text}</span>
              </div>
            ))}
          </div>

          {/* Terms */}
          <div
            className="mt-4 rounded-xl p-4"
            style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
          >
            <label
              className="flex items-start gap-3 cursor-pointer"
              onClick={() => setAgreed(!agreed)}
            >
              <div
                className="mt-0.5 flex-shrink-0 w-4 h-4 rounded flex items-center justify-center transition-all"
                style={{
                  background: agreed ? '#2563eb' : 'white',
                  border: agreed ? '1px solid #2563eb' : '1.5px solid #d1d5db',
                }}
              >
                {agreed && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>
                By starting my 3-day trial ($0.49), I authorize IqHero to charge $49.99/month after the trial ends unless I cancel before then at support@iqhero.com. I agree to the Terms &amp; Conditions and Privacy Policy.
              </span>
            </label>
          </div>
        </div>

        {/* FOMO urgency block */}
        <div
          className="rounded-xl px-4 py-3 mb-5 flex items-start gap-2"
          style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
        >
          <AlertTriangle size={14} style={{ color: '#d97706', flexShrink: 0, marginTop: 2 }} />
          <p className="text-xs leading-relaxed" style={{ color: '#92400e' }}>
            Your results will be <strong>permanently deleted</strong> in {mm}:{ss}. Complete checkout now to preserve your cognitive report.
          </p>
        </div>

        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs" style={{ color: '#9ca3af' }}>
            <Shield size={11} /> Secure 256-bit SSL encryption · PCI compliant
          </div>
          <div className="flex items-center justify-center gap-4 text-xs" style={{ color: '#9ca3af' }}>
            <span className="cursor-pointer hover:underline">Privacy Policy</span>
            <span className="cursor-pointer hover:underline">Terms & Conditions</span>
            <span className="cursor-pointer hover:underline">Refund Policy</span>
          </div>
          <p className="text-xs" style={{ color: '#d1d5db' }}>© 2026 IqHero. All rights reserved.</p>

        </div>
          </div>

          {/* Right sidebar — social proof (hidden on mobile) */}
          <div className="hidden lg:flex flex-col gap-5 w-72 flex-shrink-0 pt-2">

            {/* Live counter */}
            <div className="card p-5 text-center">
              <div className="text-3xl font-bold mb-1" style={{ color: '#111827', fontFamily: "'Lora', serif" }}>2,847,391</div>
              <div className="text-xs" style={{ color: '#6b7280' }}>Americans tested their IQ</div>
              <div className="mt-3 flex items-center justify-center gap-1.5">
                <div className="live-dot" />
                <span className="text-xs font-medium" style={{ color: '#16a34a' }}>847 unlocked today</span>
              </div>
            </div>

            {/* Testimonials */}
            <div className="card p-5">
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>What they say</div>
              {[
                { name: 'Sarah K.', state: 'California', text: 'My score was 118 — way higher than I expected!', stars: 5 },
                { name: 'James T.', state: 'Texas', text: 'The cognitive breakdown showed exactly where I am strong.', stars: 5 },
                { name: 'Emily R.', state: 'New York', text: 'Worth it. The PDF certificate looks totally official.', stars: 5 },
              ].map(({ name, state, text, stars }) => (
                <div key={name} className="mb-4 pb-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg,#2563eb,#1d4ed8)' }}>
                      {name[0]}
                    </div>
                    <div>
                      <div className="text-xs font-semibold" style={{ color: '#111827' }}>{name}</div>
                      <div className="text-xs" style={{ color: '#9ca3af' }}>{state}</div>
                    </div>
                    <div className="ml-auto text-xs" style={{ color: '#f59e0b' }}>{'★'.repeat(stars)}</div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Security badges */}
            <div className="card p-5">
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Security</div>
              {[
                { icon: '🔒', text: '256-bit SSL encryption' },
                { icon: '✅', text: 'PCI DSS compliant' },
                { icon: '🛡', text: 'No stored card data' },
                { icon: '↩️', text: 'Cancel anytime' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 mb-2 text-sm" style={{ color: '#374151' }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default function UnlockPage() {
  return <Suspense><UnlockContent /></Suspense>
}
