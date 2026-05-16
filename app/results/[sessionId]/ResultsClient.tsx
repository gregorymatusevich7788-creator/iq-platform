'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, CheckCircle, Award, Share2, Copy } from 'lucide-react'
import Navbar from '@/components/Navbar'

const TESTIMONIALS = [
  { name: 'Emily Parker', age: 36, text: 'The AI analysis was spot on — I finally understand my cognitive strengths.' },
  { name: 'James Carter', age: 58, text: 'Surprisingly detailed. My problem-solving has noticeably improved.' },
  { name: 'Michael Thompson', age: 29, text: 'The cognitive breakdown was accurate and actionable.' },
]

export default function ResultsClient({ sessionId }: { sessionId: string }) {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(5 * 60)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    localStorage.setItem('iq_last_session', sessionId)
    localStorage.setItem('iq_completion_status', 'paid')
  }, [sessionId])

  const shareUrl = `https://iqhero.app/test`
  const shareText = `I just took a real IQ test! Think you can beat me? 🧠`
  const mm = String(Math.floor(timeLeft / 60))
  const ss = String(timeLeft % 60).padStart(2, '0')
  const go = () => router.push('/certificate/' + sessionId)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: '#f5f7fb', minHeight: '100vh' }}>
      {/* Urgency bar */}
      <div className="sticky top-0 z-50 py-2.5 px-4 text-center text-sm font-semibold"
        style={{ background: timeLeft < 120 ? '#dc2626' : '#2563eb', color: 'white' }}>
        ⏱ Your certificate expires in {mm}:{ss}
      </div>

      <Navbar />

      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* Hero comparison */}
        <div className="card p-5 mb-5 fade-up-1">
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { emoji: '👩', label: 'Marilyn Monroe', iq: '114', color: '#6b7280' },
              { emoji: '🧠', label: 'You', iq: '???', you: true },
              { emoji: '🔬', label: 'Albert Einstein', iq: '160', color: '#6b7280' },
            ].map(({ emoji, label, iq, you, color }) => (
              <div key={label} className="rounded-xl p-3 text-center transition-all"
                style={{
                  background: you ? 'rgba(37,99,235,0.08)' : '#f9fafb',
                  border: you ? '2px solid rgba(37,99,235,0.3)' : '1px solid #e5e7eb',
                  transform: you ? 'scale(1.05)' : 'none',
                }}>
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="font-bold text-sm" style={{ color: you ? '#2563eb' : color }}>IQ {iq}</div>
                <div className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{label}</div>
              </div>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-center mb-1" style={{ color: '#111827', fontFamily: "'Lora', serif" }}>
            Your Results Are Ready!
          </h1>
          <p className="text-center text-sm mb-4" style={{ color: '#6b7280' }}>See how you compare against millions of Americans</p>
          <button onClick={go} className="btn-primary w-full py-4 text-base">
            Explore Full IQ Report Now →
          </button>
        </div>

        {/* What you get */}
        <div className="card p-5 mb-4 fade-up-2">
          <h2 className="font-bold text-base mb-4" style={{ color: '#111827', fontFamily: "'Lora', serif" }}>
            What&apos;s included in your report
          </h2>
          {[
            'Your accurate IQ score with scientific percentile ranking',
            'Comparison against 2M+ Americans',
            'Cognitive strengths & growth areas breakdown',
            'Official AI-verified IQ Certificate',
            'Access to all brain training games',
          ].map(item => (
            <div key={item} className="flex items-start gap-2.5 mb-3">
              <CheckCircle size={15} style={{ color: '#16a34a', flexShrink: 0, marginTop: 2 }} />
              <span className="text-sm" style={{ color: '#374151' }}>{item}</span>
            </div>
          ))}
          <button onClick={go} className="btn-primary w-full py-3.5">Continue →</button>
        </div>

        {/* Blurred personal report */}
        <div className="card p-5 mb-4 fade-up-2">
          <h2 className="font-bold text-base mb-3" style={{ color: '#111827', fontFamily: "'Lora', serif" }}>
            Personal IQ Report
          </h2>
          <p className="text-sm mb-3" style={{ color: '#6b7280' }}>
            You demonstrate strong logical reasoning and pattern recognition abilities.
          </p>
          <div className="relative">
            <p className="text-sm leading-relaxed" style={{ color: '#6b7280', filter: 'blur(4px)', userSelect: 'none' }}>
              Scoring among the top performers, you demonstrate exceptional skill in logic and pattern recognition. Your results indicate above-average processing speed and working memory capacity that sets you apart from most test takers in your age group.
            </p>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                style={{ background: 'white', border: '1px solid #e5e7eb' }}>
                <Lock size={14} style={{ color: '#2563eb' }} />
                <button onClick={go} className="text-sm font-semibold" style={{ color: '#2563eb' }}>
                  Unlock full report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-4 fade-up-3">
          <h2 className="font-bold text-base mb-4 text-center" style={{ color: '#111827', fontFamily: "'Lora', serif" }}>
            What our users say
          </h2>
          <div className="space-y-3">
            {TESTIMONIALS.map(({ name, age, text }) => (
              <div key={name} className="card p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: 'linear-gradient(135deg,#2563eb,#1d4ed8)' }}>
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#111827' }}>{name}, {age}</div>
                    <div className="text-xs" style={{ color: '#9ca3af' }}>📍 United States</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="card p-5 mb-4 fade-up-4">
          <div className="flex items-center gap-2 mb-2">
            <Share2 size={16} style={{ color: '#2563eb' }} />
            <h2 className="font-bold text-base" style={{ color: '#111827' }}>Challenge Your Friends</h2>
          </div>
          <p className="text-xs mb-4" style={{ color: '#9ca3af' }}>Share the test and see who scores higher</p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={handleCopy}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs font-semibold transition-all"
              style={{ background: '#f9fafb', border: '1px solid #e5e7eb', color: copied ? '#16a34a' : '#6b7280' }}>
              <Copy size={15} />{copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs font-semibold transition-all"
              style={{ background: '#f9fafb', border: '1px solid #e5e7eb', color: '#6b7280' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Twitter
            </button>
            <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank')}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs font-semibold transition-all"
              style={{ background: '#f9fafb', border: '1px solid #e5e7eb', color: '#6b7280' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </button>
          </div>
        </div>

        <div className="text-center mb-4">
          <button onClick={() => { localStorage.removeItem('iq_completion_status'); router.push('/test') }}
            className="text-xs underline" style={{ color: '#9ca3af' }}>
            Retake the test →
          </button>
        </div>

        <button onClick={go} className="btn-primary w-full py-4 text-base fade-up-4">
          <Award size={16} /> Get My IQ Certificate Now →
        </button>
      </div>

      {/* Sticky bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 bg-white/95 backdrop-blur-md"
        style={{ borderTop: '1px solid #e5e7eb' }}>
        <button onClick={go} className="btn-primary w-full py-3.5 text-sm">
          <Award size={15} /> Get My IQ Certificate Now →
        </button>
      </div>
    </div>
  )
}
