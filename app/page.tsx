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
