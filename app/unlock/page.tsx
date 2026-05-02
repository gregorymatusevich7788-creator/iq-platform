'use client'

import { useState, Suspense, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, Shield, Star, Zap, Users, Award, AlertTriangle } from 'lucide-react'
import { grantAccess } from '@/lib/payment'
import { supabase } from '@/lib/supabaseClient'

const SOCIAL_PROOF = [
  '🟢 847 people unlocked their results today',
  '⭐⭐⭐⭐⭐ Sarah K. from California just unlocked her score',
  '🧠 Join 2,000,000+ Americans who tested their IQ',
  '🟢 Michael T. from Texas just revealed his IQ score',
  '⭐⭐⭐⭐⭐ Jennifer R. from New York unlocked her results',
  '🟢 A new user just unlocked their cognitive report',
]

const FLOATING_NAMES = [
  '🟢 John just unlocked his IQ score',
  '🟢 Emily from Florida just unlocked her result',
  '🟢 James from Ohio just revealed his score',
  '🟢 Sarah just unlocked her cognitive report',
  '🟢 David from Texas just got his IQ score',
  '🟢 Jessica just unlocked her results',
]

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
  const [spotsLeft] = useState(Math.floor(Math.random() * 8) + 3)
  const [floatingIndex, setFloatingIndex] = useState(0)
  const [floatingVisible, setFloatingVisible] = useState(true)
  const [fakeProgress, setFakeProgress] = useState(90)
  const [progressText, setProgressText] = useState('Processing final calculations...')
  const [readyState, setReadyState] = useState<'processing' | 'almost' | 'ready'>('processing')

  const allFilled = name.length >= 2 && cardNumber.replace(/\s/g, '').length === 16 && expiry.length === 5 && cvv.length === 3

  // Timer
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])

  // Social proof rotation
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

  // Floating social proof
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

  // Fake progress bar + almost ready state
  useEffect(() => {
    let progress = 90
    const iv = setInterval(() => {
      progress += 0.3
      if (progress >= 99) {
        progress = 99
        clearInterval(iv)
        setProgressText('Almost ready...')
        setReadyState('almost')
        setTimeout(() => {
          setProgressText('Your IQ score is ready to be revealed')
          setReadyState('ready')
        }, 1200)
      }
      setFakeProgress(Math.min(progress, 99))
    }, 80)
    return () => clearInterval(iv)
  }, [])

  // Exit resistance
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = 'Your results are ready — don\'t leave now'
      return e.returnValue
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const ss = String(timeLeft % 60).padStart(2, '0')
  const isUrgent = timeLeft < 180
  const isCritical = timeLeft < 60

  const formatCard = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (val: string) => {
    const d = val.replace(/\D/g, '').slice(0, 4)
    return d.length >= 2 ? d.slice(0, 2) + '/' + d.slice(2) : d
  }

  const handlePay = () => {
    if (!agreed) { setError('Please confirm you agree to the terms to continue'); return }
    if (!email || !email.includes('@') || !email.includes('.')) { setError('Please enter a valid email address'); return }
    if (!name || name.length < 2) { setError('Please enter cardholder name'); return }
    if (cardNumber.replace(/\s/g, '').length !== 16) { setError('Please enter a valid 16-digit card number'); return }
    if (expiry.length !== 5) { setError('Please enter expiry date (MM/YY)'); return }
    if (cvv.length !== 3) { setError('Please enter a valid CVV'); return }
    setError('')
    setLoading(true)
    setTimeout(() => {
      grantAccess(sessionId)
      supabase.from('email_leads').insert({ email, session_id: sessionId })
      fetch('/api/send-welcome', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, sessionId }) })
      router.push('/results/' + sessionId)
    }, 2000)
  }

  const timerStyle = {
    background: isUrgent
      ? 'linear-gradient(90deg, rgba(234,179,8,0.2), rgba(234,179,8,0.08))'
      : 'linear-gradient(90deg, rgba(234,179,8,0.12), rgba(234,179,8,0.04))',
    border: isUrgent ? '1px solid rgba(234,179,8,0.5)' : '1px solid rgba(234,179,8,0.25)',
  }

  return (
    <div className="min-h-screen" style={{ background: '#060d1f', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes urgentPulse { 0%,100%{box-shadow:0 0 0 0 rgba(234,179,8,0.4)} 50%{box-shadow:0 0 0 8px rgba(234,179,8,0)} }
        @keyframes ctaPulse { 0%,100%{box-shadow:0 0 30px rgba(59,130,246,0.4),0 4px 20px rgba(0,0,0,0.4)} 50%{box-shadow:0 0 60px rgba(59,130,246,0.8),0 4px 20px rgba(0,0,0,0.4)} }
        @keyframes lockFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes floatIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{transform:scale(0.95);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes progressGlow { 0%,100%{opacity:0.8} 50%{opacity:1} }
        @keyframes redPulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.5s 0.1s ease forwards; opacity:0; }
        .fade-up-3 { animation: fadeUp 0.5s 0.2s ease forwards; opacity:0; }
        .fade-up-4 { animation: fadeUp 0.5s 0.3s ease forwards; opacity:0; }
        .lock-float { animation: lockFloat 2s ease-in-out infinite; }
        .urgent-pulse { animation: urgentPulse 1s infinite; }
        .cta-pulse { animation: ctaPulse 1.5s infinite; }
        .red-pulse { animation: redPulse 1s infinite; }
        .float-in { animation: floatIn 0.4s ease forwards; }
        .scale-in { animation: scaleIn 0.3s ease forwards; }
        .cta-btn {
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          box-shadow: 0 0 30px rgba(59,130,246,0.4), 0 4px 20px rgba(0,0,0,0.4);
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .cta-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: shimmer 2.5s infinite;
        }
        .cta-btn:hover { transform: translateY(-1px); box-shadow: 0 0 50px rgba(59,130,246,0.6), 0 8px 30px rgba(0,0,0,0.4); }
        .cta-btn:active { transform: translateY(0); }
        .cta-btn-filled {
          animation: ctaPulse 1.5s infinite;
          transform: scale(1.01);
        }
        .progress-bar {
          background: linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa);
          background-size: 200% auto;
          animation: shimmer 2s linear infinite, progressGlow 1.5s ease-in-out infinite;
        }
        input[type="text"]:focus { border-color: rgba(59,130,246,0.6) !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); outline: none; }
        .floating-notification {
          position: fixed;
          bottom: 80px;
          left: 16px;
          z-index: 50;
          transition: opacity 0.5s ease;
        }
        .sticky-cta {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 40;
          padding: 12px 16px;
          background: linear-gradient(to top, #060d1f, rgba(6,13,31,0.98));
          border-top: 1px solid rgba(59,130,246,0.2);
        }
      `}</style>

      {/* Floating notification — bottom left */}
      <div className="floating-notification" style={{ opacity: floatingVisible ? 1 : 0 }}>
        <div className="px-3 py-2 rounded-xl text-xs text-slate-300 flex items-center gap-2"
          style={{ background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
          {FLOATING_NAMES[floatingIndex]}
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="sticky-cta">
        <button onClick={handlePay} disabled={loading}
          className="cta-btn w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem',
            opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Unlocking...</>
            : <><Lock size={14} /> Yes, Show Me My IQ Score →</>}
        </button>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 pb-24">

        {/* Fake progress bar */}
        <div className="mb-4 fade-up">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-500"
              style={{ color: readyState === 'ready' ? '#10b981' : readyState === 'almost' ? '#fbbf24' : '#64748b' }}>
              {progressText}
            </span>
            <span className="font-mono" style={{ color: readyState === 'ready' ? '#10b981' : '#64748b' }}>
              {Math.round(fakeProgress)}%
            </span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full progress-bar transition-all duration-300"
              style={{ width: `${fakeProgress}%` }} />
          </div>
        </div>

        {/* Social proof top */}
        <div className="text-center mb-5" style={{ minHeight: '24px' }}>
          <p className="text-xs text-slate-400 transition-opacity duration-400"
            style={{ opacity: socialVisible ? 1 : 0 }}>
            {SOCIAL_PROOF[socialIndex]}
          </p>
        </div>

        {/* Hero — blurred score */}
        <div className="text-center mb-6 fade-up-2">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-4">
            <Award size={12} className="text-blue-400" />
            <span className="text-xs text-blue-400 font-semibold tracking-wide">YOUR IQ SCORE HAS BEEN CALCULATED</span>
          </div>

          <div className="relative inline-flex flex-col items-center mb-2">
            <div className="relative">
              <div className="text-8xl font-black leading-none select-none"
                style={{ fontFamily: "'Syne', sans-serif", color: '#3b82f6', filter: 'blur(12px)', userSelect: 'none' }}>
                1██
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="lock-float w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(6,13,31,0.85)', border: '2px solid rgba(59,130,246,0.4)', backdropFilter: 'blur(4px)' }}>
                  <Lock size={24} className="text-blue-400" />
                </div>
              </div>
            </div>
            <div className="mt-3 px-4 py-1 rounded-full text-xs font-bold select-none"
              style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: 'rgba(148,163,184,0.5)', filter: 'blur(3px)' }}>
              ████ Intelligence Level
            </div>
            <p className="text-slate-400 text-xs mt-2">Unlock to reveal your exact IQ score</p>
            <p className="text-slate-500 text-xs mt-1 italic">Most people are surprised by their result</p>
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-2xl text-white mb-2 leading-tight">
            Your personalized cognitive<br />analysis is ready to view
          </h1>
        </div>

        {/* Timer */}
        <div className="rounded-2xl px-5 py-4 mb-4 fade-up-3"
          style={timerStyle}
          {...(isUrgent ? { className: 'rounded-2xl px-5 py-4 mb-4 fade-up-3 urgent-pulse' } : {})}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                style={{ color: isUrgent ? '#fbbf24' : '#fcd34d' }}>
                ⏳ Your results expire in
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <AlertTriangle size={10} className="text-yellow-500" />
                Only <span className="text-white font-semibold ml-1 mr-1">{spotsLeft} spots</span> remaining
              </div>
            </div>
            <div className="flex-shrink-0 ml-4">
              <span className="text-3xl font-black"
                style={{ fontFamily: "'Syne', sans-serif", color: isUrgent ? '#fbbf24' : '#f59e0b' }}>
                {mm}:{ss}
              </span>
            </div>
          </div>
        </div>

        {/* Critical urgency — under 3 minutes */}
        {isUrgent && (
          <div className="rounded-xl px-4 py-2.5 mb-4 flex items-center gap-2 red-pulse fade-up"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)' }}>
            <AlertTriangle size={13} className="text-red-400 flex-shrink-0" />
            <p className="text-xs text-red-400 font-semibold">
              ⚠️ High demand — results may expire sooner than shown
            </p>
          </div>
        )}

        {/* Loss aversion */}
        <div className="rounded-xl px-4 py-3 mb-5 flex items-start gap-2 fade-up-3"
          style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
          <AlertTriangle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-400 leading-relaxed">
            Your cognitive report will be <strong>permanently deleted</strong> if not accessed within the remaining time.
          </p>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-4 gap-2 mb-5 fade-up-3">
          {[
            { icon: <Shield size={12} className="text-green-400" />, label: 'AI-Verified' },
            { icon: <Award size={12} className="text-blue-400" />, label: 'Scientific' },
            { icon: <Users size={12} className="text-purple-400" />, label: '2M+ Users' },
            { icon: <Zap size={12} className="text-yellow-400" />, label: 'Instant' },
          ].map(({ icon, label }) => (
            <div key={label} className="rounded-xl p-2 text-center flex flex-col items-center gap-1"
              style={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.07)' }}>
              {icon}
              <span className="text-slate-500 text-xs">{label}</span>
            </div>
          ))}
        </div>

        {/* Payment form */}
        <div className="rounded-2xl p-5 mb-4 fade-up-4" style={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }} className="text-white text-base">Secure Checkout</span>
            <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
              <Shield size={11} /><span>256-bit SSL</span>
            </div>
          </div>

          {/* Almost ready state */}
          {readyState !== 'processing' && (
            <div className="mb-4 px-3 py-2 rounded-xl text-xs text-center scale-in"
              style={{
                background: readyState === 'ready' ? 'rgba(16,185,129,0.08)' : 'rgba(234,179,8,0.08)',
                border: `1px solid ${readyState === 'ready' ? 'rgba(16,185,129,0.25)' : 'rgba(234,179,8,0.25)'}`,
                color: readyState === 'ready' ? '#10b981' : '#fbbf24'
              }}>
              {readyState === 'almost' ? '⚡ Finalizing your results...' : '✓ Your IQ score is ready to be revealed'}
            </div>
          )}

          <p className="text-xs text-slate-500 mb-4">Your results will be available instantly after completion</p>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">Full Name</label>
              <input type="text" placeholder="John Smith" value={name} onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-white text-sm transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }} />
            </div>
            <div>
              <label className="text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">Email</label>
              <input type="text" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-white text-sm transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }} />
            </div>
            <div>
              <label className="text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" value={cardNumber}
                onChange={e => setCardNumber(formatCard(e.target.value))}
                className="w-full px-4 py-3 rounded-xl text-white text-sm font-mono transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">Expiry</label>
                <input type="text" placeholder="MM/YY" value={expiry}
                  onChange={e => setExpiry(formatExpiry(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl text-white text-sm font-mono transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }} />
              </div>
              <div>
                <label className="text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">CVV</label>
                <input type="text" placeholder="123" value={cvv}
                  onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  className="w-full px-4 py-3 rounded-xl text-white text-sm font-mono transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }} />
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-3 px-4 py-2.5 rounded-xl text-xs text-red-400 text-center"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
              ⚠️ {error}
            </div>
          )}

          <div className="flex items-center gap-3 mt-4 mb-5">
            {['VISA', 'MC', 'AMEX', 'PayPal'].map(b => (
              <span key={b} className="px-2 py-1 rounded text-xs font-bold text-slate-500"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{b}</span>
            ))}
          </div>

          {/* Field completion trigger */}
          {allFilled && !loading && (
            <div className="mb-3 text-center scale-in">
              <p className="text-xs text-green-400 font-semibold">✓ You're one step away from your result</p>
            </div>
          )}

          <button onClick={handlePay} disabled={loading}
            className={`cta-btn w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2${allFilled && !loading ? ' cta-btn-filled' : ''}`}
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '0.02em',
              opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Unlocking your results...</>
              : <><Lock size={15} /> Yes, Show Me My IQ Score →</>}
          </button>

          {/* Trust stack under button */}
          <div className="flex items-center justify-center gap-4 mt-3">
            {[
              { icon: <Shield size={10} className="text-green-400" />, text: 'Secure checkout' },
              { icon: <Zap size={10} className="text-blue-400" />, text: 'Instant access' },
              { icon: <Users size={10} className="text-purple-400" />, text: 'Used by millions' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1 text-xs text-slate-600">
                {icon}<span>{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <label className="flex items-start gap-3 cursor-pointer" onClick={() => setAgreed(!agreed)}>
              <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded flex items-center justify-center transition-all"
                style={{ background: agreed ? '#3b82f6' : 'rgba(255,255,255,0.05)', border: agreed ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.2)' }}>
                {agreed && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span className="text-xs text-slate-500 leading-relaxed">
                I agree to the Terms & Conditions and Privacy Policy of Neuro Index. I understand this is a subscription service and I may cancel at any time by contacting support@neuro-index.com.
              </span>
            </label>
          </div>
        </div>

        {/* FOMO second block */}
        <div className="rounded-xl px-4 py-3 mb-5 flex items-start gap-2"
          style={{ background: 'rgba(234,179,8,0.05)', border: '1px solid rgba(234,179,8,0.15)' }}>
          <AlertTriangle size={14} className="text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-600 leading-relaxed">
            Your cognitive report will be <strong className="text-yellow-500">permanently deleted</strong> if not accessed within {mm}:{ss}.
          </p>
        </div>

        {/* Trust row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { icon: <Zap size={14} className="text-blue-400" />, title: 'Instant access', sub: 'Results in seconds' },
            { icon: <Shield size={14} className="text-green-400" />, title: 'Cancel anytime', sub: 'No commitment' },
            { icon: <Users size={14} className="text-purple-400" />, title: '2M+ users', sub: 'Trust Neuro Index' },
          ].map(({ icon, title, sub }) => (
            <div key={title} className="rounded-xl p-3 text-center"
              style={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex justify-center mb-1">{icon}</div>
              <div className="text-white text-xs font-semibold">{title}</div>
              <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600">
            <Shield size={11} /><span>Secure 256-bit SSL encryption · PCI compliant</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-600">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms & Conditions</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Refund Policy</span>
          </div>
          <p className="text-xs text-slate-700">© 2025–2026 Neuro Index. All rights reserved.</p>
        </div>

      </div>
    </div>
  )
}

export default function UnlockPage() {
  return <Suspense><UnlockContent /></Suspense>
}
