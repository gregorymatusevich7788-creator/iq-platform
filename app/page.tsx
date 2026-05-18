'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const TICKER_MESSAGES = [
  '🟢 Sarah from California just unlocked her score',
  '🟢 James from Texas completed the IQ test',
  '🟢 847 users unlocked results today',
  '🟢 Emily from New York received IQ 121',
  '🟢 David from Florida just finished the assessment',
]

const FAQS = [
  {
    q: 'Is this IQ test scientifically valid?',
    a: 'Our assessment is inspired by established psychometric methods used in cognitive science research. It measures pattern recognition, logical reasoning, numerical ability, and spatial intelligence — core dimensions of general intelligence (g-factor).',
  },
  {
    q: 'How long does the test take?',
    a: 'The full assessment consists of 25–30 questions and typically takes 15–20 minutes to complete. Each question is designed to evaluate a specific cognitive domain, ensuring a comprehensive profile.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account is required to take the free IQ test. Simply start the assessment and receive your cognitive profile at the end.',
  },
  {
    q: 'What does my IQ score mean?',
    a: 'IQ scores follow a bell curve with an average of 100. Scores between 90–110 are considered average, 110–130 above average, and 130+ in the superior range. Your score reflects your performance relative to population norms.',
  },
  {
    q: 'How is my score calculated?',
    a: 'Your raw score is calculated based on number of correct answers, question difficulty weights, and response patterns across cognitive domains. It is then normalized against national averages.',
  },
  {
    q: 'Can I retake the test?',
    a: 'Yes, you can retake the assessment at any time. For the most accurate result, we recommend taking the test in a quiet environment without distractions.',
  },
]

export default function HomePage() {
  const [tickerIndex, setTickerIndex] = useState(0)
  const [tickerVisible, setTickerVisible] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Clear stale session so homepage never bounces to paywall
  useEffect(() => {
    localStorage.removeItem('iq_last_session')
    localStorage.removeItem('iq_completed')
    localStorage.removeItem('iq_session_id')
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerVisible(false)
      setTimeout(() => {
        setTickerIndex(i => (i + 1) % TICKER_MESSAGES.length)
        setTickerVisible(true)
      }, 400)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#f5f7fb' }}>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section
        className="relative overflow-hidden py-16 md:py-24 px-4"
        style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f5f7fb 100%)' }}
      >
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="hero-badge mb-6 animate-fade-in">
            <span className="live-dot" />
            Scientifically Inspired Assessment · 2,847,391 Americans Tested
          </div>

          <h1
            className="font-bold text-4xl md:text-6xl leading-tight md:leading-[1.1] mb-6 fade-up-1"
            style={{
              color: '#111827',
              fontFamily: "'Lora', serif",
              letterSpacing: '-0.02em',
            }}
          >
            Discover Your{' '}
            <span className="gradient-text">True IQ Potential</span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-4 fade-up-2 leading-relaxed"
            style={{ color: '#6b7280' }}
          >
            Join millions of Americans who tested their intelligence with IqHero&apos;s
            scientifically inspired cognitive assessment.
          </p>

          <div className="fade-up-3 mb-8">
            <Link
              href="/test"
              className="btn-primary rounded-2xl inline-flex" style={{ fontSize: "1.5rem", padding: "1.5rem 3.5rem", letterSpacing: "-0.01em" }}
            >
              Take the Free IQ Test →
            </Link>
            <p className="text-sm mt-3" style={{ color: '#9ca3af' }}>
              No signup required · 20 minutes · Instant results
            </p>
          </div>

          {/* Trust stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto fade-up-4">
            {[
              { value: '2,847,391', label: 'Americans Tested' },
              { value: '4.9★', label: 'Average Rating' },
              { value: 'Science-Based', label: 'Methodology' },
              { value: '20 Minutes', label: 'Assessment Time' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="card py-4 px-3 text-center"
              >
                <div
                  className="font-bold text-base md:text-lg mb-0.5"
                  style={{ color: '#111827' }}
                >
                  {value}
                </div>
                <div className="text-xs" style={{ color: '#6b7280' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LIVE TICKER ═══ */}
      <div
        className="py-3 px-4 text-center"
        style={{ background: '#eef2f7', borderBottom: '1px solid #e5e7eb' }}
      >
        <p
          className="text-sm font-medium transition-opacity duration-300"
          style={{ color: '#374151', opacity: tickerVisible ? 1 : 0 }}
        >
          {TICKER_MESSAGES[tickerIndex]}
        </p>
      </div>

      {/* ═══ MEDIA LOGOS ═══ */}
      <section className="py-12 px-4" style={{ background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-8"
            style={{ color: '#9ca3af' }}
          >
            As Seen In
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {['Mensa', 'Scientific American', 'Yahoo', 'Forbes', 'Vox'].map(name => (
              <span
                key={name}
                className="font-bold text-sm md:text-base"
                style={{ color: '#d1d5db', letterSpacing: '0.04em' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-16 px-4" style={{ background: '#f5f7fb' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label">How It Works</div>
            <h2
              className="text-2xl md:text-4xl font-bold"
              style={{ color: '#111827', fontFamily: "'Lora', serif" }}
            >
              Your cognitive profile in 3 steps
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Take the Assessment',
                desc: '25 calibrated questions measuring pattern recognition, logical reasoning, and spatial intelligence.',
              },
              {
                step: '02',
                title: 'AI Analysis',
                desc: 'Our algorithm compares your responses against millions of data points to calculate your cognitive profile.',
              },
              {
                step: '03',
                title: 'Get Your IQ Score',
                desc: 'Receive your complete IQ score with percentile ranking and a detailed breakdown by cognitive domain.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="card p-6">
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: '#2563eb' }}
                >
                  Step {step}
                </div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: '#111827' }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SCIENTIFIC CTA ═══ */}
      <section
        className="py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Are you smarter than<br />the average American?
          </h2>
          <p className="text-blue-200 mb-8 text-lg">
            Most people are surprised by their result.
          </p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-blue-700 bg-white text-lg transition-all hover:bg-blue-50 hover:shadow-lg"
          >
            Start Free Assessment →
          </Link>
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            {['Free to start', 'No signup needed', 'Instant results'].map(t => (
              <span key={t} className="flex items-center gap-2 text-sm text-blue-200">
                <CheckCircle size={14} className="text-blue-300" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST BADGES ═══ */}
      <section className="py-14 px-4" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: '#111827', fontFamily: "'Lora', serif" }}
            >
              Trusted by millions worldwide
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: '🧠', title: 'Cognitive Science', desc: 'Based on established psychometric research' },
              { icon: '🔒', title: '100% Private', desc: 'Your data is never sold or shared' },
              { icon: '⚡', title: 'Instant Results', desc: 'Get your score immediately after completion' },
              { icon: '📊', title: 'Detailed Report', desc: 'Full breakdown across 4 cognitive domains' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card p-5 text-center">
                <div className="text-2xl mb-3">{icon}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: '#111827' }}>{title}</div>
                <div className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-16 px-4" style={{ background: '#f5f7fb' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label">FAQ</div>
            <h2
              className="text-2xl md:text-4xl font-bold"
              style={{ color: '#111827', fontFamily: "'Lora', serif" }}
            >
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="card overflow-hidden cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between p-5">
                  <span className="font-semibold text-sm md:text-base" style={{ color: '#111827' }}>
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp size={18} style={{ color: '#6b7280' }} />
                  ) : (
                    <ChevronDown size={18} style={{ color: '#6b7280' }} />
                  )}
                </div>
                {openFaq === i && (
                  <div
                    className="px-5 pb-5 text-sm leading-relaxed animate-fade-in"
                    style={{ color: '#6b7280' }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ BRAIN FACTS ═══ */}
      <section className="py-16 px-4" style={{ background: '#f5f7fb' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label">Neuroscience</div>
            <h2 className="text-2xl md:text-4xl font-bold" style={{ color: '#111827', fontFamily: "'Lora', serif" }}>
              The science behind your IQ
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { stat: '86B', label: 'Neurons in your brain', desc: 'Each neuron connects to up to 10,000 others — your IQ reflects how efficiently these networks fire.' },
              { stat: '23%', label: 'Of people score above 110', desc: 'Scoring above average puts you ahead of over 200 million Americans in cognitive processing speed.' },
              { stat: '50%', label: 'IQ is genetic', desc: 'Twin studies show up to 50–80% of IQ variation is heritable — but environment and training matter too.' },
            ].map(({ stat, label, desc }) => (
              <div key={stat} className="card p-6 text-center">
                <div className="text-4xl font-bold mb-1" style={{ color: '#2563eb', fontFamily: "'Lora', serif" }}>{stat}</div>
                <div className="font-semibold text-sm mb-2" style={{ color: '#111827' }}>{label}</div>
                <div className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAMOUS IQs ═══ */}
      <section className="py-16 px-4" style={{ background: 'white' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label">Hall of Fame</div>
            <h2 className="text-2xl md:text-4xl font-bold" style={{ color: '#111827', fontFamily: "'Lora', serif" }}>
              How do you compare to history&apos;s greatest minds?
            </h2>
            <p className="mt-3 text-base" style={{ color: '#6b7280' }}>
              Most people are surprised to find they score higher than they expected.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { name: 'Albert Einstein', iq: 160, emoji: '🔬', field: 'Physics' },
              { name: 'Leonardo da Vinci', iq: 180, emoji: '🎨', field: 'Art & Science' },
              { name: 'Stephen Hawking', iq: 160, emoji: '🌌', field: 'Cosmology' },
              { name: 'Marilyn Monroe', iq: 163, emoji: '⭐', field: 'Entertainment' },
              { name: 'Elon Musk', iq: 155, emoji: '🚀', field: 'Technology' },
              { name: 'Bill Gates', iq: 151, emoji: '💻', field: 'Computing' },
              { name: 'Average American', iq: 98, emoji: '🇺🇸', field: 'Population avg' },
              { name: 'You', iq: '???' as string | number, emoji: '🧠', field: 'Take the test!' },
            ].map(({ name, iq, emoji, field }) => (
              <div key={name} className="card p-4 text-center" style={name === 'You' ? { border: '2px solid #2563eb', background: 'rgba(37,99,235,0.03)' } : {}}>
                <div className="text-2xl mb-2">{emoji}</div>
                <div className="font-bold text-lg mb-0.5" style={{ color: name === 'You' ? '#2563eb' : '#111827', fontFamily: "'Lora', serif" }}>
                  {iq}
                </div>
                <div className="text-xs font-semibold mb-0.5" style={{ color: '#111827' }}>{name}</div>
                <div className="text-xs" style={{ color: '#9ca3af' }}>{field}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/test" className="btn-primary px-10 py-4 text-base rounded-2xl">
              Find Your Place on the Scale →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ WHAT YOU GET ═══ */}
      <section className="py-16 px-4" style={{ background: '#f5f7fb' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label">What you get</div>
            <h2 className="text-2xl md:text-4xl font-bold" style={{ color: '#111827', fontFamily: "'Lora', serif" }}>
              A complete cognitive profile — not just a number
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: '📊',
                title: 'Your Exact IQ Score',
                desc: 'A precise score calibrated against 2.8 million Americans. Includes your national percentile rank and score category — from Average to Very Superior.',
              },
              {
                icon: '📄',
                title: 'Official PDF Certificate',
                desc: 'A printable certificate with your name, score, date, and session ID. Looks professional and official — shareable on LinkedIn or with friends.',
              },
              {
                icon: '🧩',
                title: 'Cognitive Domain Breakdown',
                desc: 'Detailed scores across 4 domains: Pattern Recognition, Logical Reasoning, Numerical Ability, and Spatial Intelligence.',
              },
              {
                icon: '📈',
                title: 'Bell Curve Comparison',
                desc: 'See exactly where you land on the normal distribution — with comparisons to historical geniuses and the average American.',
              },
              {
                icon: '🎮',
                title: 'Brain Training Games',
                desc: 'Unlimited access to scientifically designed cognitive exercises targeting memory, focus, processing speed, and reasoning.',
              },
              {
                icon: '⚡',
                title: 'Priority Support',
                desc: 'Questions about your score or methodology? Get fast-track responses from our cognitive assessment team within hours.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card p-5 flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                <div>
                  <div className="font-bold text-base mb-1" style={{ color: '#111827' }}>{title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IQ SCALE ═══ */}
      <section className="py-16 px-4" style={{ background: 'white' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label">Score Guide</div>
            <h2 className="text-2xl md:text-4xl font-bold" style={{ color: '#111827', fontFamily: "'Lora', serif" }}>
              What does your IQ score mean?
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { range: '130+', label: 'Very Superior', pct: '2%', color: '#2563eb', bg: 'rgba(37,99,235,0.07)', desc: 'Gifted level. Top 2% of the population.' },
              { range: '120–129', label: 'Superior', pct: '7%', color: '#3b82f6', bg: 'rgba(59,130,246,0.07)', desc: 'Well above average. Strong analytical ability.' },
              { range: '110–119', label: 'High Average', pct: '16%', color: '#6366f1', bg: 'rgba(99,102,241,0.07)', desc: 'Above average. College-level performance.' },
              { range: '90–109', label: 'Average', pct: '50%', color: '#8b5cf6', bg: 'rgba(139,92,246,0.07)', desc: 'Normal range. Most Americans score here.' },
              { range: '80–89', label: 'Low Average', pct: '16%', color: '#a78bfa', bg: 'rgba(167,139,250,0.07)', desc: 'Slightly below average range.' },
              { range: '70–79', label: 'Borderline', pct: '7%', color: '#c4b5fd', bg: 'rgba(196,181,253,0.07)', desc: 'Well below average.' },
            ].map(({ range, label, pct, color, bg, desc }) => (
              <div key={range} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: bg, border: `1px solid ${color}20` }}>
                <div className="text-center w-20 flex-shrink-0">
                  <div className="font-bold text-sm font-mono" style={{ color }}>{range}</div>
                  <div className="text-xs" style={{ color: '#9ca3af' }}>{pct} of pop.</div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-0.5" style={{ color: '#111827' }}>{label}</div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16 px-4" style={{ background: '#f5f7fb' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label">Reviews</div>
            <h2 className="text-2xl md:text-4xl font-bold" style={{ color: '#111827', fontFamily: "'Lora', serif" }}>
              What Americans say after testing
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: 'Sarah K.', state: 'California', score: 121, text: 'I scored 121 — way higher than I expected! The cognitive breakdown showed exactly where my strengths are. The PDF certificate looks completely official.' },
              { name: 'James T.', state: 'Texas', score: 108, text: 'Really well-designed test. The visual questions felt like a real IQ assessment. I liked that it showed my percentile rank compared to other Americans.' },
              { name: 'Emily R.', state: 'New York', score: 134, text: 'Scored 134! The detailed report was fascinating — I knew I was good at patterns but did not realize my spatial reasoning was that strong.' },
              { name: 'Michael P.', state: 'Florida', score: 116, text: 'I have taken other IQ tests online and this one felt the most legitimate. The analyzing screen made it feel like real AI was processing my results.' },
              { name: 'Jessica L.', state: 'Ohio', score: 127, text: 'The brain training games are actually addictive. I have been playing them daily and I can feel my focus improving. Great value with the subscription.' },
              { name: 'David M.', state: 'Georgia', score: 99, text: 'Scored right at average which surprised me — I thought I'd be higher. But the breakdown showed I'm strong in logic and weaker in spatial. Very useful.' },
            ].map(({ name, state, score, text }) => (
              <div key={name} className="card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#2563eb,#1d4ed8)' }}>
                    {name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#111827' }}>{name}</div>
                    <div className="text-xs" style={{ color: '#9ca3af' }}>{state} · IQ {score}</div>
                  </div>
                  <div className="ml-auto text-sm" style={{ color: '#f59e0b' }}>★★★★★</div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-14 px-4" style={{ background: 'white', borderTop: '1px solid #e5e7eb' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield size={16} style={{ color: '#16a34a' }} />
            <span className="text-sm font-medium" style={{ color: '#16a34a' }}>
              Secure, Private & Free
            </span>
          </div>
          <h2
            className="text-2xl md:text-4xl font-bold mb-4"
            style={{ color: '#111827', fontFamily: "'Lora', serif" }}
          >
            Ready to discover your IQ?
          </h2>
          <p className="text-base mb-8" style={{ color: '#6b7280' }}>
            Join 2.8 million Americans who already know their score.
          </p>
          <Link href="/test" className="btn-primary text-base px-10 py-4 rounded-2xl">
            Take the Free IQ Test →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
