'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Lock, CheckCircle, Award, Brain, Zap, ChevronRight } from 'lucide-react'
import { hasAccess } from '@/lib/payment'
import Navbar from '@/components/Navbar'

const AVATARS = [
  { initials: 'JS', color: '#3b82f6' },
  { initials: 'MK', color: '#10b981' },
  { initials: 'AR', color: '#a855f7' },
  { initials: 'DL', color: '#f59e0b' },
  { initials: 'TN', color: '#ef4444' },
]

const TESTIMONIALS = [
  { name: 'Emily Parker', age: 36, text: 'Taking the Neuro Index test really opened my eyes. The AI analysis was spot on — I finally understand my cognitive strengths and where to improve.' },
  { name: 'James Carter', age: 58, text: 'The report was incredibly accurate about what I\'m good at and what I need to work on. My problem-solving has gotten noticeably better since I started the brain training.' },
  { name: 'Michael Thompson', age: 29, text: 'I wasn\'t sure it would work, but the cognitive breakdown was surprisingly detailed. My focus and memory have improved significantly in just a few weeks.' },
]

export default function ResultsPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = params.sessionId as string
  const [timeLeft, setTimeLeft] = useState(5 * 60)

  useEffect(() => {
    if (typeof window !== 'undefined' && !hasAccess(sessionId)) {
      window.location.href = '/unlock?session=' + sessionId
      return
    }
    const t = setInterval(() => setTimeLeft(s => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [sessionId])

  const mm = String(Math.floor(timeLeft / 60))
  const ss = String(timeLeft % 60).padStart(2, '0')
  const isUrgent = timeLeft < 120

  const go = () => router.push('/certificate/' + sessionId)

  return (
    <div style={{ background: '#060d1f', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(59,130,246,0.3)} 50%{box-shadow:0 0 40px rgba(59,130,246,0.6)} }
        .fade-1{animation:fadeUp 0.5s 0.1s ease both}
        .fade-2{animation:fadeUp 0.5s 0.2s ease both}
        .fade-3{animation:fadeUp 0.5s 0.3s ease both}
        .fade-4{animation:fadeUp 0.5s 0.4s ease both}
        .fade-5{animation:fadeUp 0.5s 0.5s ease both}
        .urgent{animation:pulse 1s infinite}
        .card-glow{animation:glow 2s ease-in-out infinite}
        .cta-btn {
          background: linear-gradient(135deg, #1d4ed8, #7c3aed);
          box-shadow: 0 0 30px rgba(99,102,241,0.4);
          transition: all 0.2s ease;
          position: relative; overflow: hidden;
        }
        .cta-btn::after {
          content:''; position:absolute; top:0; left:-100%;
          width:60%; height:100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent);
          animation: shimmer 2.5s infinite;
        }
        .cta-btn:hover{transform:translateY(-1px);box-shadow:0 0 50px rgba(99,102,241,0.6)}
        .cta-btn:active{transform:translateY(0)}
        .check-item{display:flex;align-items:flex-start;gap:10px;margin-bottom:12px}
        .check-icon{color:#3b82f6;flex-shrink:0;margin-top:2px}
      `}</style>

      {/* Sticky top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: '#0b122b', borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '10px 16px', textAlign: 'center'
      }}>
        <span className="text-xs text-slate-400">Your IQ Score is ready! Offer ends in: </span>
        <span className={`text-sm font-black ml-1 ${isUrgent ? 'urgent' : ''}`}
          style={{ fontFamily: "'Syne',sans-serif", color: isUrgent ? '#fbbf24' : '#3b82f6' }}>
          {mm}:{ss}
        </span>
      </div>

      <div style={{ paddingTop: '44px' }}>
        <Navbar />
      </div>

      <div className="max-w-md mx-auto px-4 py-6 pb-24">

        {/* HERO — comparison cards */}
        <div className="fade-1 mb-6">
          <div className="grid grid-cols-3 gap-3 mb-6">
            {/* Monroe */}
            <div className="rounded-2xl p-4 text-center" style={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-3xl mb-2">👩</div>
              <div className="text-blue-400 font-black text-sm" style={{ fontFamily: "'Syne',sans-serif" }}>IQ 114</div>
              <div className="text-slate-500 text-xs mt-1 leading-tight">Marilyn Monroe</div>
            </div>

            {/* YOU — center, elevated */}
            <div className="rounded-2xl p-4 text-center card-glow" style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.1))',
              border: '2px solid rgba(59,130,246,0.4)',
              transform: 'scale(1.05)'
            }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
                <Lock size={18} className="text-blue-400" />
              </div>
              <div className="text-white font-black text-sm" style={{ fontFamily: "'Syne',sans-serif" }}>IQ ???</div>
              <div className="text-blue-400 text-xs mt-1 font-semibold">You</div>
            </div>

            {/* Einstein */}
            <div className="rounded-2xl p-4 text-center" style={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-3xl mb-2">🧠</div>
              <div className="text-purple-400 font-black text-sm" style={{ fontFamily: "'Syne',sans-serif" }}>IQ 160</div>
              <div className="text-slate-500 text-xs mt-1 leading-tight">Albert Einstein</div>
            </div>
          </div>

          <div className="text-center mb-5">
            <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>
              Your IQ Results Ready!
            </h1>
            <p className="text-blue-400 font-semibold text-base">See How You Performed!</p>
          </div>

          <button onClick={go} className="cta-btn w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 mb-4"
            style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.95rem' }}>
            Explore Full IQ Report Now <ChevronRight size={16} />
          </button>

          <div className="text-center text-xs text-slate-600 tracking-widest">
            Mensa · Scientific American · Yahoo · Forbes
          </div>
        </div>

        {/* Plan section */}
        <div className="rounded-2xl p-5 mb-4 fade-2" style={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="text-center mb-4">
            <h2 className="text-lg font-black text-white mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>
              Try Neuro Index Full Access
            </h2>
            <p className="text-slate-500 text-xs">Full access plan</p>
          </div>

          <div className="mb-5">
            {[
              'Discover your accurate IQ score with our scientifically validated test',
              'See how you compare against 2M+ Americans',
              'Uncover your cognitive strengths and growth areas',
              'Get your official AI-verified IQ Certificate',
              'Access all 6 brain training games',
            ].map(item => (
              <div key={item} className="check-item">
                <CheckCircle size={16} className="check-icon" />
                <span className="text-slate-300 text-sm leading-snug">{item}</span>
              </div>
            ))}
          </div>

          <button onClick={go} className="cta-btn w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 mb-4"
            style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.95rem' }}>
            Continue <ChevronRight size={16} />
          </button>

          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">Over 2,847,293 tests taken · Avg IQ: 97</p>
            <div className="flex items-center">
              {AVATARS.map((a, i) => (
                <div key={a.initials} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: a.color, marginLeft: i > 0 ? '-6px' : '0', border: '2px solid #0a1628', fontSize: '8px' }}>
                  {a.initials}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Neuro Index */}
        <div className="rounded-2xl p-5 mb-4 fade-3" style={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-base font-black text-white mb-4" style={{ fontFamily: "'Syne',sans-serif" }}>
            Why Neuro Index?
          </h2>
          {[
            { icon: '🎓', title: 'Accurate IQ Testing You Can Trust', desc: 'Scientifically validated using established cognitive assessment methods' },
            { icon: '📊', title: 'Insights Made Just for You', desc: 'Detailed breakdown across 4 cognitive domains with personalized analysis' },
            { icon: '🎮', title: 'Training That Really Works', desc: '6 brain training games built on modern neuroscience research' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 mb-4 last:mb-0">
              <div className="text-2xl flex-shrink-0">{icon}</div>
              <div>
                <div className="text-white text-sm font-semibold mb-0.5">{title}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Personal IQ Report — blurred */}
        <div className="rounded-2xl p-5 mb-4 fade-3" style={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Brain size={18} className="text-blue-400" />
            <h2 className="text-base font-black text-white" style={{ fontFamily: "'Syne',sans-serif" }}>
              Personal IQ Report
            </h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            You demonstrate strong logical reasoning and pattern recognition abilities. Your results highlight impressive cognitive strengths and untapped potential.
          </p>
          <div className="relative">
            <div className="text-slate-500 text-sm leading-relaxed" style={{ filter: 'blur(5px)', userSelect: 'none' }}>
              Scoring among the top performers, you demonstrate exceptional skill in logic and pattern recognition. We have found many positive aspects for you. Your results indicate above-average processing speed and working memory capacity that sets you apart from most test takers in your age group.
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(6,13,31,0.9)', border: '1px solid rgba(59,130,246,0.3)' }}>
                <Lock size={16} className="text-blue-400" />
              </div>
              <button onClick={go} className="text-blue-400 text-xs font-semibold underline">
                To read the full report, you need full access
              </button>
            </div>
          </div>
        </div>

        {/* What You'll Gain */}
        <div className="rounded-2xl p-5 mb-4 fade-4" style={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-base font-black text-white mb-4" style={{ fontFamily: "'Syne',sans-serif" }}>
            What You'll Gain
          </h2>
          {[
            'Stay ahead of the crowd and excel in competitive situations',
            'Advance your career and achieve your professional ambitions',
            'Enhance your decision-making in work, relationships, and daily life',
            'Increase confidence and self-belief to tackle challenges with ease',
          ].map(item => (
            <div key={item} className="check-item">
              <CheckCircle size={15} className="check-icon" />
              <span className="text-slate-300 text-sm leading-snug">{item}</span>
            </div>
          ))}
        </div>

        {/* Master Key Skills */}
        <div className="rounded-2xl p-5 mb-4 fade-4" style={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-base font-black text-white mb-4" style={{ fontFamily: "'Syne',sans-serif" }}>
            Master Key Skills
          </h2>
          {[
            'Tackle challenging problems with focus and confidence',
            'Pick up new skills quickly and remember them longer',
            'Strengthen critical thinking and decision-making abilities',
            'Boost your memory and recall to perform at your best',
          ].map(item => (
            <div key={item} className="check-item">
              <CheckCircle size={15} className="check-icon" />
              <span className="text-slate-300 text-sm leading-snug">{item}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-4 fade-5">
          <h2 className="text-base font-black text-white mb-4 text-center" style={{ fontFamily: "'Syne',sans-serif" }}>
            Our customers
          </h2>
          <div className="space-y-3">
            {TESTIMONIALS.map(({ name, age, text }) => (
              <div key={name} className="rounded-xl p-4" style={{ background: '#0b122b', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2"
                  style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}>
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-white text-sm font-semibold text-center">{name}, {age}</div>
                <div className="text-slate-500 text-xs text-center mb-2">📍 United States</div>
                <p className="text-slate-400 text-xs leading-relaxed text-center">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="fade-5">
          <button onClick={go} className="cta-btn w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2"
            style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.95rem' }}>
            <Award size={16} /> Get My IQ Certificate Now!
          </button>
        </div>

      </div>

      {/* Sticky bottom CTA */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        padding: '12px 16px',
        background: 'linear-gradient(to top, #060d1f, rgba(6,13,31,0.98))',
        borderTop: '1px solid rgba(59,130,246,0.2)'
      }}>
        <button onClick={go} className="cta-btn w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2"
          style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.9rem' }}>
          <Award size={15} /> Get My IQ Certificate Now!
        </button>
      </div>

    </div>
  )
}
