'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ChevronRight, Zap, Brain, Award, BarChart3,
  CheckCircle, Star, ChevronDown, Globe, Clock, Shield,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { IQ_BY_COUNTRY, IQ_BY_US_STATE, IQ_BY_AGE } from '@/lib/iqData'

function useCountdown(seconds: number) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const ss = String(timeLeft % 60).padStart(2, '0')
  return { mm, ss, timeLeft }
}

function useLiveCounter(base: number) {
  const [count, setCount] = useState(base)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3))
    }, 8000)
    return () => clearInterval(interval)
  }, [])
  return count.toLocaleString()
}

const SAMPLE_Q = {
  question: 'What number comes next in the sequence?',
  sequence: '3 → 6 → 12 → 24 → ?',
  options: ['36', '48', '42', '30'],
  correct: 1,
}

function SampleQuestion() {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null
  return (
    <div className="card p-8 max-w-xl mx-auto">
      <div className="section-label mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        Try a sample question
      </div>
      <p className="text-slate-300 text-sm mb-2">{SAMPLE_Q.question}</p>
      <p className="font-display font-bold text-3xl text-white mb-6 tracking-wide">{SAMPLE_Q.sequence}</p>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {SAMPLE_Q.options.map((opt, i) => {
          let style = 'border border-border bg-bg-700 text-slate-300 hover:border-accent/50 hover:text-white'
          if (answered) {
            if (i === SAMPLE_Q.correct) style = 'border border-green-500 bg-green-500/10 text-green-400'
            else if (i === selected) style = 'border border-red-500 bg-red-500/10 text-red-400'
            else style = 'border border-border bg-bg-700 text-slate-500 opacity-50'
          }
          return (
            <button key={i} disabled={answered} onClick={() => setSelected(i)}
              className={`py-3 rounded-xl font-display font-bold text-xl transition-all duration-200 ${style}`}>
              {opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={`text-sm p-4 rounded-xl ${selected === SAMPLE_Q.correct ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {selected === SAMPLE_Q.correct ? '✓ Correct! Each number is doubled. Ready for 30 more?' : '✗ The answer is 48 (each number × 2). Don\'t worry — take the full test!'}
        </div>
      )}
      {answered && (
        <Link href="/test" className="btn-primary w-full justify-center mt-4">
          Take the Full Test <ChevronRight size={16} />
        </Link>
      )}
    </div>
  )
}

const FAQS = [
  { q: 'Is this IQ test really free?', a: 'Taking the test is 100% free with no signup required. After completing the test, you can unlock your full IQ score, AI certificate, and detailed breakdown after completing the test.' },
  { q: 'How accurate is this IQ test?', a: 'Our test was developed using validated cognitive assessment methods from academic research. While no online test replaces a clinical evaluation, our results correlate strongly with professionally administered tests and are used by 2M+ Americans.' },
  { q: 'How long does the test take?', a: 'The test consists of 30 questions and takes most people 15–20 minutes. There is no time limit, so take your time for the most accurate result.' },
  { q: 'What\'s a good IQ score?', a: 'The average IQ is 100. Scores between 85–115 are "Average" (68% of people). Above 115 is "Above Average," and above 130 is "Gifted." Only 2% of people score above 130.' },
  { q: 'What do I get after unlocking my results?', a: 'You get instant access to: your exact IQ score + percentile rank, a full cognitive breakdown across 4 categories, a printable AI-verified certificate, and all 6 brain training games. Cancel anytime.' },
  { q: 'Can I improve my IQ score?', a: 'Yes! Research shows targeted cognitive training can improve IQ by 8–15 points. Our 6 brain training games are specifically designed to improve memory, logic, pattern recognition, and processing speed.' },
  { q: 'Will I get a certificate?', a: 'Yes — an official AI-verified PDF certificate with your name, score, and date is included. It\'s shareable on LinkedIn and perfect for personal achievement.' },
  { q: 'How is the IQ score calculated?', a: 'Your raw score is normalized to the standard bell curve (mean 100, SD 15). Scores are weighted by question difficulty and adjusted for time taken.' },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded-xl overflow-hidden transition-all duration-200 hover:border-accent/30">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left">
        <span className="font-semibold text-white text-sm">{q}</span>
        <ChevronDown size={16} className={`text-slate-500 transition-transform duration-200 flex-shrink-0 ml-4 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-border pt-4">{a}</div>}
    </div>
  )
}

function RankingsPreview() {
  const [tab, setTab] = useState<'country' | 'state' | 'age'>('state')
  const tabs = [
    { id: 'state' as const, label: 'By US State' },
    { id: 'country' as const, label: 'By Country' },
    { id: 'age' as const, label: 'By Age' },
  ]
  const data = tab === 'country'
    ? IQ_BY_COUNTRY.slice(0, 6).map((d) => ({ label: `${d.flag} ${d.country}`, iq: d.iq, rank: d.rank }))
    : tab === 'state'
    ? IQ_BY_US_STATE.slice(0, 6).map((d) => ({ label: `🇺🇸 ${d.state}`, iq: d.iq, rank: d.rank }))
    : IQ_BY_AGE.slice(0, 6).map((d, i) => ({ label: d.range, iq: d.avgIQ, rank: i + 1 }))
  return (
    <div className="card p-6">
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(({ id, label }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-4 py-2 rounded-lg text-xs font-display font-bold uppercase tracking-wide transition-all ${tab === id ? 'bg-accent text-white' : 'text-slate-400 border border-border hover:text-white'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {data.map(({ label, iq, rank }) => (
          <div key={label} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-600 w-5">#{rank}</span>
              <span className="text-slate-300 text-sm">{label}</span>
            </div>
            <span className="font-display font-bold text-white">{iq}</span>
          </div>
        ))}
      </div>
      <Link href={`/rankings/by-${tab === 'country' ? 'country' : tab === 'state' ? 'state' : 'age'}`}
        className="btn-ghost w-full justify-center mt-5 text-xs">
        View Full Rankings <ChevronRight size={13} />
      </Link>
    </div>
  )
}

export default function HomePage() {
  const liveCount = useLiveCounter(847)
  const { mm, ss } = useCountdown(10 * 60)

  const STATS = [
    { value: '2,847,391', label: 'Americans Tested' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '98.3%', label: 'Accuracy Rate' },
    { value: '20 min', label: 'Average Time' },
  ]

  const FEATURES = [
    { icon: Zap, title: 'Instant Results', desc: 'See your IQ score the moment you submit. No waiting, no email — just instant answers.', color: '#f59e0b' },
    { icon: Brain, title: 'Built by Psychologists', desc: 'Developed using validated cognitive assessment methods from academic research. Not a buzzfeed quiz.', color: '#3b82f6' },
    { icon: Award, title: 'Official AI Certificate', desc: 'Get a shareable PDF certificate with your name, score, and AI analysis — perfect for LinkedIn.', color: '#10b981' },
    { icon: BarChart3, title: 'Detailed Breakdown', desc: 'See your performance across Logic, Pattern Recognition, Numerical, and Spatial categories.', color: '#a855f7' },
  ]

  const GAMES = [
    { name: 'Colored Tiles', desc: 'Memorize color positions to boost working memory', emoji: '🎨', href: '/games/colored-tiles' },
    { name: 'Avoid the Mines', desc: 'Remember bomb positions in 3 seconds', emoji: '💣', href: '/games/mines' },
    { name: 'Scroll & Match', desc: 'Match 4 tiles to sharpen focus', emoji: '🔄', href: '/games/scroll-match' },
    { name: 'Bird Watching', desc: 'Track birds to improve short-term memory', emoji: '🐦', href: '/games/birds' },
    { name: 'Scene Scrutinizer', desc: 'Spot differences to improve attention', emoji: '🔍', href: '/games/scene' },
    { name: 'Dungeons & Gems', desc: 'Memorize the path through dungeons', emoji: '⚔️', href: '/games/dungeons' },
  ]

  const TESTIMONIALS = [
    { name: 'Mike T.', location: 'Texas', score: 128, rating: 5, text: 'I scored 128! I knew I was smart but now I have official proof. The certificate looks incredibly professional — shared it on LinkedIn immediately.' },
    { name: 'Jennifer R.', location: 'New York', score: 134, rating: 5, text: 'Finally an IQ test that feels legitimate. The AI analysis of my cognitive strengths was surprisingly accurate. Best decision I ever made.' },
    { name: 'Amanda S.', location: 'Florida', score: 119, rating: 5, text: 'My whole family took it. I beat my husband by 12 points 😂. After 3 months of brain training I retook the test and improved by 7 points!' },
    { name: 'David K.', location: 'California', score: 141, rating: 5, text: 'As someone who has taken multiple IQ tests, this is the most comprehensive online version I\'ve found. The score was very close to my clinical assessment.' },
  ]

  const IQ_SCALE = [
    { label: 'Below 70', name: 'Extremely Low', color: '#ef4444', pct: '2%' },
    { label: '70–84', name: 'Low Average', color: '#f97316', pct: '14%' },
    { label: '85–114', name: 'Average', color: '#3b82f6', pct: '68%', highlight: true },
    { label: '115–129', name: 'Above Average', color: '#10b981', pct: '13%' },
    { label: '130–144', name: 'Gifted', color: '#a855f7', pct: '2%' },
    { label: '145+', name: 'Genius', color: '#f59e0b', pct: '0.1%' },
  ]

  const BLOG_POSTS = [
    { slug: 'average-iq-by-state', title: 'Average IQ by US State [2025 Ranking]', excerpt: 'See how all 50 states rank in average IQ — and find out where your state stands nationally.', date: 'Jan 15, 2025', readTime: '5 min' },
    { slug: 'can-you-raise-your-iq', title: 'Can You Actually Raise Your IQ? Science Says Yes', excerpt: '7 science-backed methods proven to improve cognitive performance and boost your IQ score.', date: 'Jan 8, 2025', readTime: '7 min' },
    { slug: 'iq-vs-eq', title: 'IQ vs EQ: Which Matters More for Success?', excerpt: 'Research reveals the surprising answer about which type of intelligence predicts life outcomes.', date: 'Dec 28, 2024', readTime: '6 min' },
  ]

  return (
    <div className="min-h-screen">
      <div className="w-full text-center py-2.5 px-4 text-xs font-semibold"
        style={{ background: 'linear-gradient(90deg, #1d4ed8, #2563eb)', color: 'white' }}>
        🔥 Limited time offer — Start your free IQ test now
      </div>

      <Navbar />

      <div className="flex justify-center pt-4 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          🔴 LIVE: {liveCount} people taking the test right now
        </div>
      </div>

      <section className="relative overflow-hidden pt-12 pb-24 px-4">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="section-label mx-auto w-fit mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            SCIENTIFICALLY VALIDATED · TRUSTED BY 2,847,293 AMERICANS
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-white leading-none tracking-tight mb-6">
            The Average American IQ
            <br />
            is <span className="gradient-text">97.</span>
            <br />
            Where Do <span className="gradient-text">You</span> Rank?
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Take our free, scientifically validated IQ test and find out exactly where you rank against 2.8 million Americans. Most people are surprised by their result.
          </p>
          <p className="text-slate-500 text-sm mb-10">
            
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Link href="/test" className="btn-primary w-full max-w-2xl py-10 text-3xl font-black tracking-wide"
              style={{ boxShadow: '0 0 40px rgba(37,99,235,0.4)' }}>
              Start Free IQ Test →
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 mb-12">
            {['100% Free to Start', 'Instant Results', 'No Registration Required', 'AI Certificate Included'].map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-green-400" />{b}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="font-bold text-white">4.9/5</span>
            <span className="text-slate-500 text-sm">· 12,847 reviews · 2,847,293 Americans tested</span>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(({ value, label }) => (
              <div key={label} className="card p-5 text-center">
                <div className="font-display font-bold text-2xl md:text-3xl mb-1" style={{ color: '#93bbff' }}>{value}</div>
                <div className="text-slate-500 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4" style={{ background: 'var(--bg-900)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">What You Unlock</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
              Your Full IQ Report
            </h2>
            <p className="text-slate-400 mt-3 text-sm">Everything you need to understand your cognitive profile</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              { icon: '🧠', title: 'Exact IQ Score + Percentile', desc: 'See exactly where you rank vs. 2.8M Americans' },
              { icon: '📊', title: 'Full Cognitive Breakdown', desc: 'Pattern recognition, logic, numerical & spatial scores' },
              { icon: '🏆', title: 'Printable AI Certificate', desc: 'Official, shareable certificate verified by AI' },
              { icon: '🎮', title: 'All 6 Brain Training Games', desc: 'Improve memory, focus & processing speed daily' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  {icon}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{title}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/test" className="btn-primary text-base px-8 py-4">
              Start Free IQ Test →
            </Link>
            <p className="text-slate-600 text-xs mt-3">Full access · Cancel anytime</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit mb-4">How It Works</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white">3 Steps to Know Your IQ</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', icon: '📝', title: 'Take the Free IQ Test', desc: '30 questions covering pattern recognition, logic, numbers, and spatial reasoning. Takes 20 minutes.' },
              { n: '02', icon: '🧠', title: 'Get Your IQ Score Instantly', desc: 'Our AI calculates your score in seconds using a scientifically validated algorithm and bell curve normalization.' },
              { n: '03', icon: '🏆', title: 'Unlock Your Full Report', desc: 'Get your exact score, certificate, and cognitive breakdown. Train your brain with 6 games.' },
            ].map(({ n, icon, title, desc }) => (
              <div key={n} className="card-hover p-8 relative">
                <div className="font-mono text-xs text-slate-700 mb-4">{n}</div>
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-display font-bold text-lg text-white mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/test" className="btn-primary">Start the Free IQ Test <ChevronRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section id="sample-question" className="py-20 px-4" style={{ background: 'var(--bg-900)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Interactive Demo</div>
            <h2 className="font-display font-bold text-4xl text-white">Try a Sample Question</h2>
            <p className="text-slate-400 mt-3">Answer this to see what the full test is like — most people are surprised</p>
          </div>
          <SampleQuestion />
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit mb-4">Why Neuro Index</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white">Not Just Another IQ Quiz</h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">We built the test we wished existed — scientifically validated, beautifully designed, with real results.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card-hover p-8 flex gap-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4" style={{ background: 'var(--bg-900)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit mb-4">IQ Scale</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white">What Does Your Score Mean?</h2>
            <p className="text-slate-400 mt-4">The average American IQ is 97. Where do you fall on the scale?</p>
          </div>
          <div className="flex rounded-2xl overflow-hidden mb-8 h-16">
            {IQ_SCALE.map(({ label, name, color, pct, highlight }) => (
              <div key={label} className="flex-1 flex flex-col items-center justify-center text-xs font-bold transition-all hover:flex-[2] cursor-default"
                style={{ background: `${color}${highlight ? '30' : '15'}`, borderBottom: `3px solid ${color}` }}>
                <span style={{ color }} className="hidden md:block">{name}</span>
                <span className="text-slate-400 font-mono hidden md:block">{pct}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {IQ_SCALE.map(({ label, name, color, pct, highlight }) => (
              <div key={label} className={`card p-4 ${highlight ? 'ring-1' : ''}`}
                style={highlight ? { borderColor: color } : {}}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-full" style={{ background: color }} />
                  <span className="font-display font-bold text-white text-sm">{name}</span>
                </div>
                <div className="text-slate-400 text-xs">{label} · {pct} of population</div>
                {highlight && <div className="text-xs mt-1" style={{ color }}>← Most Americans score here</div>}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-4">Curious which category you fall in?</p>
            <Link href="/test" className="btn-primary">Take the Free Test Now <ChevronRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit mb-4">Real Results</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white">2,847,293 Americans Already Know Their IQ</h2>
            <p className="text-slate-400 mt-3">Here is what they are saying</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {TESTIMONIALS.map(({ name, location, score, rating, text }) => (
              <div key={name} className="card-hover p-7">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rating }).map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ background: 'rgba(59,130,246,0.1)', color: '#93bbff', border: '1px solid rgba(59,130,246,0.2)' }}>
                    IQ {score}
                  </span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm"
                    style={{ background: 'var(--accent-glow)', border: '1px solid var(--border-accent)', color: '#93bbff' }}>
                    {name[0]}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{name}</div>
                    <div className="text-slate-500 text-xs">{location}, USA</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="font-display font-bold text-xl text-white">4.9/5</span>
            <span className="text-slate-500 text-sm">based on 12,847 reviews</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-4" style={{ background: 'var(--bg-900)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mx-auto w-fit mb-4"><Globe size={12} /> IQ Rankings</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white">IQ Rankings By State, Country & Age</h2>
            <p className="text-slate-400 mt-3">See how different groups compare — where does your state rank?</p>
          </div>
          <div className="max-w-2xl mx-auto"><RankingsPreview /></div>
          <div className="text-center mt-8">
            <Link href="/rankings" className="btn-ghost text-sm">View All Rankings <ChevronRight size={14} /></Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit mb-4">Brain Training</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white">Train Your Brain. Raise Your IQ.</h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">Research shows targeted cognitive training can improve IQ by 8-15 points. Our 6 scientifically designed games target each cognitive domain.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GAMES.map(({ name, desc, emoji, href }) => (
              <Link key={name} href={href} className="card-hover p-6 flex items-start gap-4 group">
                <div className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'var(--bg-700)' }}>{emoji}</div>
                <div>
                  <h3 className="font-display font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{name}</h3>
                  <p className="text-slate-400 text-sm">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/games" className="btn-ghost">Discover All 6 Games <ChevronRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4" style={{ background: 'var(--bg-900)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit mb-4">Intelligence Insights</div>
            <h2 className="font-display font-bold text-4xl text-white">Learn More About Your Intelligence</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map(({ slug, title, excerpt, date, readTime }) => (
              <Link key={slug} href={`/blog/${slug}`} className="card-hover group overflow-hidden">
                <div className="h-44 flex items-center justify-center text-6xl" style={{ background: 'var(--bg-700)' }}>🧠</div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span>{date}</span><span>·</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {readTime} read</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-2 group-hover:text-blue-400 transition-colors leading-snug">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="btn-ghost">View All 23 Articles <ChevronRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit mb-4">FAQ</div>
            <h2 className="font-display font-bold text-4xl text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq) => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1628, #0e1f45, #0a1628)' }}>
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)' }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="text-5xl mb-6">🧠</div>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-white leading-tight mb-5">
            Are You Smarter Than
            <br />
            <span className="gradient-text">The Average American?</span>
          </h2>
          <p className="text-slate-300 text-lg mb-4 max-w-xl mx-auto">
            Take our certified IQ test to find out exactly where you rank. Free, instant, and trusted by 2.8M+ Americans.
          </p>
          <p className="text-slate-500 text-sm mb-10">
            
          </p>
          <Link href="/test" className="btn-primary w-full max-w-2xl py-10 text-3xl font-black tracking-wide"
            style={{ boxShadow: '0 0 40px rgba(37,99,235,0.4)' }}>
            Start the Free Test Now →
          </Link>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-500 flex-wrap">
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Free to start</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> No signup needed</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Instant results</span>
            <span className="flex items-center gap-2"><Shield size={14} className="text-green-400" /> Cancel anytime</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
