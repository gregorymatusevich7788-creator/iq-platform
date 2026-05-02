'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Award, Download, Share2, Copy, ChevronRight, Brain } from 'lucide-react'
import Navbar from '@/components/Navbar'

function genCertId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seg = (n: number) => Array.from({length: n}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `NI-${seg(4)}-${seg(3)}`
}

function getIQColor(iq: number) {
  if (iq >= 130) return '#a855f7'
  if (iq >= 115) return '#10b981'
  if (iq >= 100) return '#3b82f6'
  if (iq >= 85) return '#eab308'
  return '#f97316'
}

function getIQCategory(iq: number) {
  if (iq >= 130) return 'Gifted'
  if (iq >= 115) return 'Above Average'
  if (iq >= 100) return 'Average'
  if (iq >= 85) return 'Below Average'
  return 'Low Average'
}

export default function CertificatePage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = params.sessionId as string
  const hasFullAccess = false
  const [iq] = useState(() => Math.floor(Math.random() * 37) + 102)
  const [certId] = useState(genCertId)
  const [copied, setCopied] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const color = getIQColor(iq)
  const category = getIQCategory(iq)
  const shareText = encodeURIComponent(`I just scored IQ ${iq} on Neuro Index! Can you beat me? 🧠 https://neuro-index.vercel.app/test`)

  useEffect(() => {
    setConfetti(true)
    setTimeout(() => setConfetti(false), 3500)
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`https://neuro-index.vercel.app/certificate/${sessionId}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: '#060d1f', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&family=Playfair+Display:wght@700&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes confettiFall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes glow{0%,100%{opacity:0.7}50%{opacity:1}}
        @keyframes scaleIn{from{transform:scale(0.9);opacity:0}to{transform:scale(1);opacity:1}}
        .fade-1{animation:fadeUp 0.5s 0.1s ease both}
        .fade-2{animation:fadeUp 0.5s 0.2s ease both}
        .fade-3{animation:fadeUp 0.5s 0.3s ease both}
        .fade-4{animation:fadeUp 0.5s 0.4s ease both}
        .cert-card{animation:scaleIn 0.6s 0.2s ease both}
        .glow-pulse{animation:glow 3s ease-in-out infinite}
        .confetti-piece{position:fixed;width:8px;height:8px;border-radius:2px;animation:confettiFall linear both;pointer-events:none;z-index:100}
        .btn-primary{background:linear-gradient(135deg,#1d4ed8,#7c3aed);box-shadow:0 0 30px rgba(99,102,241,0.4);transition:all 0.2s ease;position:relative;overflow:hidden}
        .btn-primary::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent);animation:shimmer 2.5s infinite}
        .btn-primary:hover{transform:translateY(-1px);box-shadow:0 0 50px rgba(99,102,241,0.6)}
        .btn-secondary{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);transition:all 0.2s ease}
        .btn-secondary:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2)}
      `}</style>

      {/* Confetti */}
      {confetti && Array.from({length: 50}).map((_, i) => (
        <div key={i} className="confetti-piece" style={{
          left: `${Math.random() * 100}%`,
          top: '-10px',
          background: ['#3b82f6','#10b981','#f59e0b','#a855f7','#ef4444','#06b6d4'][i % 6],
          animationDuration: `${1.5 + Math.random() * 2}s`,
          animationDelay: `${Math.random() * 0.8}s`,
          width: `${6 + Math.random() * 8}px`,
          height: `${6 + Math.random() * 8}px`,
        }} />
      ))}

      <Navbar />

      <div className="max-w-md mx-auto px-4 py-8 pb-16">

        {/* Hero */}
        <div className="text-center mb-8 fade-1">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-4">
            <Award size={12} className="text-blue-400" />
            <span className="text-xs text-blue-400 font-semibold tracking-wide">OFFICIAL CERTIFICATE</span>
          </div>
          <h1 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
            Your Official IQ Certificate
          </h1>
          <p className="text-slate-400 text-sm">Verified by Neuro Index AI analysis</p>
        </div>

        {/* Certificate Card */}
        <div className="cert-card mb-6 relative">
          {/* Blur overlay — bottom 40% */}
          {!hasFullAccess && (
            <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl overflow-hidden" style={{ height: '45%', zIndex: 10 }}>
              <div className="w-full h-full" style={{ backdropFilter: 'blur(8px)', background: 'rgba(6,13,31,0.6)' }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(6,13,31,0.9)', border: '1px solid rgba(59,130,246,0.4)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <p className="text-white text-xs font-semibold">Unlock full certificate access</p>
                <button onClick={() => window.location.href = '/unlock?session=' + sessionId}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
                  Unlock Full Access →
                </button>
              </div>
            </div>
          )}
          {/* Gradient border */}
          <div className="rounded-2xl p-px" style={{
            background: `linear-gradient(135deg, ${color}, #7c3aed, ${color})`,
            boxShadow: `0 0 40px ${color}30`
          }}>
            <div className="rounded-2xl p-6" style={{ background: '#0b122b' }}>

              {/* Top */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }}>
                    <Brain size={15} className="text-white" />
                  </div>
                  <span className="font-black text-white text-sm" style={{ fontFamily: "'Syne',sans-serif" }}>
                    Neuro Index
                  </span>
                </div>
                <div className="px-2 py-1 rounded-lg text-xs font-bold"
                  style={{ background: color + '20', color, border: `1px solid ${color}40` }}>
                  {category}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '20px' }} />

              {/* IQ Score — center */}
              <div className="text-center mb-5">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">IQ SCORE</div>
                <div className="font-black leading-none mb-1 glow-pulse"
                  style={{ fontSize: '5rem', color, fontFamily: "'Syne',sans-serif",
                    textShadow: `0 0 40px ${color}60` }}>
                  {iq}
                </div>
                <div className="text-slate-500 text-xs">out of 160</div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '20px' }} />

              {/* Certification text */}
              <div className="text-center mb-5">
                <p className="text-slate-500 text-xs mb-2">This certifies that</p>
                <p className="text-white font-bold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Alex Johnson
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  has successfully completed the Neuro Index<br />cognitive assessment
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '16px' }} />

              {/* Footer inside card */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-600 text-xs mb-0.5">Date Issued</div>
                  <div className="text-slate-400 text-xs font-semibold">{today}</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-600 text-xs mb-0.5">Certificate ID</div>
                  <div className="text-slate-400 text-xs font-mono font-semibold">{certId}</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3 mb-6 fade-2">
          <button onClick={() => console.log('download')}
            className="btn-primary w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2"
            style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.95rem' }}>
            <Download size={16} /> Download Certificate (PDF)
          </button>
          <button onClick={() => console.log('share')}
            className="btn-secondary w-full py-3.5 rounded-xl font-semibold text-slate-300 flex items-center justify-center gap-2">
            <Share2 size={15} /> Share My Result
          </button>
        </div>

        {/* Share block */}
        <div className="rounded-2xl p-5 mb-5 fade-3" style={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-white font-semibold text-sm text-center mb-4">
            Compare your IQ with friends 🧠
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={handleCopy}
              className="btn-secondary py-2.5 rounded-xl text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5">
              <Copy size={12} />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${shareText}`, '_blank')}
              className="py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
              style={{ background: 'rgba(29,161,242,0.1)', border: '1px solid rgba(29,161,242,0.25)', color: '#1DA1F2' }}>
              𝕏 Twitter
            </button>
            <button onClick={() => window.open(`https://wa.me/?text=${shareText}`, '_blank')}
              className="py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
              style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366' }}>
              💬 WhatsApp
            </button>
          </div>
        </div>

        {/* Social proof */}
        <div className="text-center mb-5 fade-4">
          <p className="text-slate-500 text-xs">
            🧠 Join <span className="text-white font-semibold">2,847,293</span> people who tested their IQ
          </p>
        </div>

        {/* Extra CTA */}
        <div className="fade-4">
          <button onClick={() => router.push('/test')}
            className="btn-secondary w-full py-3.5 rounded-xl font-semibold text-slate-300 flex items-center justify-center gap-2">
            <Brain size={15} /> Improve My Brain <ChevronRight size={14} />
          </button>
        </div>

      </div>
    </div>
  )
}
