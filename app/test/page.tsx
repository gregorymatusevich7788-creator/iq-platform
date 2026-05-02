'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Clock, CheckCircle, XCircle, Brain } from 'lucide-react'
import { QUESTIONS, getRandomQuestions, UserAnswer, calculateIQ } from '@/lib/questions'
import { supabase } from '@/lib/supabaseClient'

const STORAGE_KEY = 'iq_test_session'

export default function TestPage() {
  const router = useRouter()
  const [started, setStarted] = useState(true)
  const [questions] = useState(() => getRandomQuestions(30))
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<UserAnswer[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [elapsed, setElapsed] = useState(0)
  const [toastMsg, setToastMsg] = useState('')
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [email, setEmail] = useState('')
  const [pendingSessionId, setPendingSessionId] = useState('')

  // Timer
  useEffect(() => {
    if (!started) return
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [started, startTime])

  // Motivational toast at Q10
  useEffect(() => {
    if (current === 10 && started) {
      setToastMsg("You're doing well! Early indicators suggest strong performance 📈")
      setTimeout(() => setToastMsg(''), 4000)
    }
  }, [current, started])

  // Restore session
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const { answers: savedAnswers, current: savedCurrent, startTime: savedStart } = JSON.parse(saved)
        if (savedAnswers?.length > 0) {
          setAnswers(savedAnswers)
          setCurrent(savedCurrent)
          setStartTime(savedStart)
          setStarted(true)
        }
      }
    } catch {}
  }, [])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  function startTest() {
    const now = Date.now()
    setStartTime(now)
    setStarted(true)
    localStorage.removeItem(STORAGE_KEY)
  }

  function selectAnswer(optionIndex: number) {
    if (selected !== null) return
    setSelected(optionIndex)

    const q = questions[current]
    const isCorrect = optionIndex === q.correct
    const newAnswer: UserAnswer = {
      questionId: q.id,
      selectedOption: optionIndex,
      isCorrect,
    }

    // Auto-advance after 600ms
    setTimeout(async () => {
      const updatedAnswers = [...answers, newAnswer]
      const nextIdx = current + 1

      if (nextIdx >= questions.length) {
        // Done — calculate and navigate
        const timeTaken = Math.floor((Date.now() - startTime) / 1000)
        const result = calculateIQ(updatedAnswers, timeTaken)
        const resultData = { ...result, answers: updatedAnswers, timeTaken }
        const sessionId = `result_${Date.now()}`
        localStorage.setItem(sessionId, JSON.stringify(resultData))
        localStorage.removeItem(STORAGE_KEY)

        // Save to Supabase if logged in
        try {
          const { data: { user } } = await supabase.auth.getUser()
          if (user) {
            await supabase.from('test_results').insert({
              user_id: user.id,
              session_id: sessionId,
              iq_score: result.iq,
              percentile: result.percentile,
              category: result.category,
              time_taken: timeTaken,
              answers: updatedAnswers,
            })
          }
        } catch (e) {}

        localStorage.setItem('iq_last_result', JSON.stringify(resultData))
        setPendingSessionId(sessionId)
        setShowEmailCapture(true)
      } else {
        setAnswers(updatedAnswers)
        setCurrent(nextIdx)
        setSelected(null)
        // Persist session
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          answers: updatedAnswers,
          current: nextIdx,
          startTime,
        }))
      }
    }, 600)
  }

  const progress = (current / questions.length) * 100

  const getMotivation = (current: number) => {
    if (current === 0) return null
    if (current === 5) return { msg: "Great start! Early signs look promising 🚀", color: "#3b82f6" }
    if (current === 10) return { msg: "You're in the top 30% so far! Keep going 📈", color: "#10b981" }
    if (current === 15) return { msg: "Halfway there! You're performing above average ⚡", color: "#f59e0b" }
    if (current === 20) return { msg: "Almost done! Strong performance detected 🧠", color: "#a855f7" }
    if (current === 25) return { msg: "Final stretch! Your score is looking impressive 🎯", color: "#10b981" }
    return null
  }
  const motivation = getMotivation(current)

  if (showEmailCapture) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#060d1f' }}>
        <div className="max-w-md w-full rounded-2xl p-8 text-center"
          style={{ background: '#0a1628', border: '1px solid rgba(37,99,235,0.3)' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', boxShadow: '0 0 30px rgba(37,99,235,0.4)' }}>
            <span className="text-2xl">🧠</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-2">Your results are ready!</h2>
          <p className="text-slate-400 text-sm mb-6">Enter your email to see your IQ score and get your personalized cognitive report.</p>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && router.push('/results/' + pendingSessionId)}
            className="w-full px-4 py-3 rounded-xl text-white text-sm mb-3 outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
          <button
            onClick={() => {
              if (email) {
                localStorage.setItem('user_email', email)
                try {
                  supabase.from('email_leads').insert({ email, session_id: pendingSessionId }).then(() => {})
                } catch (e) {}
              }
              router.push("/test/analyzing?session=" + pendingSessionId)
            }}
            className="w-full py-4 rounded-xl font-display font-bold text-sm uppercase tracking-widest text-white mb-3"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', boxShadow: '0 0 20px rgba(37,99,235,0.3)' }}>
            See My IQ Score →
          </button>
          <button onClick={() => router.push("/test/analyzing?session=" + pendingSessionId)}
            className="text-slate-600 text-xs hover:text-slate-400 transition-colors">
            Skip for now
          </button>
        </div>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }} />
        <div className="max-w-lg w-full relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', boxShadow: '0 0 30px rgba(37,99,235,0.4)' }}>
              <Brain size={28} className="text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl text-white mb-3">IQ Test</h1>
            <p className="text-slate-400">Scientifically validated · 30 Questions · ~20 minutes</p>
          </div>

          <div className="card p-8 mb-6">
            <h3 className="font-display font-semibold text-white mb-5 uppercase tracking-widest text-sm">Test Overview</h3>
            <div className="space-y-3 mb-6">
              {[
                { icon: '📊', label: '30 questions across 4 categories' },
                { icon: '⏱', label: 'No time limit (20 min average)' },
                { icon: '⚡', label: 'Instant results when you finish' },
                { icon: '🔄', label: 'Your progress is automatically saved' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm text-slate-300">
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Pattern Recognition', count: 10, color: '#3b82f6' },
                { label: 'Logical Reasoning', count: 8, color: '#10b981' },
                { label: 'Numerical', count: 6, color: '#f59e0b' },
                { label: 'Spatial', count: 6, color: '#a855f7' },
              ].map(({ label, count, color }) => (
                <div key={label} className="p-3 rounded-xl text-xs"
                  style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
                  <div className="font-bold mb-0.5" style={{ color }}>{label}</div>
                  <div className="text-slate-500">{count} questions</div>
                </div>
              ))}
            </div>

            <button onClick={startTest} className="btn-primary w-full justify-center text-base py-4">
              Start the Test
              <ChevronRight size={18} />
            </button>
          </div>

          <p className="text-center text-slate-600 text-xs">
            For entertainment purposes. Results may vary from clinical IQ assessments.
          </p>
        </div>
      </div>
    )
  }

  const question = questions[current]
  const CATEGORY_LABELS: Record<string, string> = {
    pattern: 'Pattern Recognition',
    logic: 'Logical Reasoning',
    numerical: 'Numerical',
    spatial: 'Spatial Reasoning',
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-border px-4 py-3"
        style={{ background: 'rgba(5,7,13,0.9)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Brain size={15} style={{ color: '#3b82f6' }} />
            <span className="font-mono">{current + 1} / {questions.length}</span>
            <span className="text-slate-700">·</span>
            <span className="text-xs px-2 py-0.5 rounded-md"
              style={{ background: 'rgba(37,99,235,0.1)', color: '#93bbff' }}>
              {CATEGORY_LABELS[question.category]}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-sm text-slate-400">
            <Clock size={14} />
            {formatTime(elapsed)}
          </div>
        </div>
        {/* Progress bar */}
        <div className="max-w-3xl mx-auto h-1.5 bg-bg-700 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #1d4ed8, #3b82f6)' }} />
        </div>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-semibold text-white shadow-lg"
          style={{ background: 'rgba(37,99,235,0.9)', backdropFilter: 'blur(8px)' }}>
          {toastMsg}
        </div>
      )}

      {/* Question */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="max-w-2xl w-full">
          {/* Difficulty */}
          <div className="flex items-center gap-2 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-6 h-1.5 rounded-full"
                style={{ background: i < question.weight ? '#2563eb' : 'var(--bg-600)' }} />
            ))}
            <span className="text-slate-600 text-xs ml-1">
              {question.weight === 1 ? 'Easy' : question.weight === 2 ? 'Medium' : 'Hard'}
            </span>
          </div>

          {/* Question text */}
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white leading-snug mb-10 whitespace-pre-line">
            {question.question}
          </h2>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.options.map((option, i) => {
              let borderColor = 'var(--border)'
              let bg = 'var(--bg-800)'
              let textColor = '#cbd5e1'
              let icon = null

              if (selected !== null) {
                if (i === question.correct) {
                  borderColor = '#10b981'
                  bg = 'rgba(16,185,129,0.08)'
                  textColor = '#6ee7b7'
                  icon = <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
                } else if (i === selected) {
                  borderColor = '#ef4444'
                  bg = 'rgba(239,68,68,0.08)'
                  textColor = '#fca5a5'
                  icon = <XCircle size={18} className="text-red-400 flex-shrink-0" />
                } else {
                  textColor = '#475569'
                }
              }

              return (
                <button key={i} onClick={() => selectAnswer(i)} disabled={selected !== null}
                  className="flex items-center gap-3 p-5 rounded-xl text-left font-semibold text-base transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    border: `1.5px solid ${borderColor}`,
                    background: bg,
                    color: textColor,
                    cursor: selected !== null ? 'default' : 'pointer',
                  }}>
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: 'var(--bg-700)', color: '#64748b' }}>
                    {['A', 'B', 'C', 'D'][i]}
                  </span>
                  <span className="flex-1">{option}</span>
                  {icon}
                </button>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
