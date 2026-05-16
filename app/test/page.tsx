'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, CheckCircle, XCircle } from 'lucide-react'
import Image from 'next/image'
import { getRandomQuestions, Question, UserAnswer } from '@/lib/questions'
import { supabase } from '@/lib/supabaseClient'

const STORAGE_KEY = 'iq_test_session'

// ── Visual renderers ─────────────────────────────────────────────────────────

function MatrixQuestion({ q }: { q: Question }) {
  return q.image ? (
    <div className="flex flex-col items-center">
      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white p-2 mb-2 shadow-sm">
        <Image src={q.image} alt="Matrix puzzle" width={240} height={240} className="max-w-full" priority />
      </div>
      <p className="text-xs text-gray-400 mt-1">Find the missing piece</p>
    </div>
  ) : null
}

function PatternQuestion({ q }: { q: Question }) {
  return q.image ? (
    <div className="flex flex-col items-center">
      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white p-3 shadow-sm w-full">
        <Image src={q.image} alt="Pattern sequence" width={320} height={80} className="w-full h-auto" priority />
      </div>
    </div>
  ) : null
}

function SequenceQuestion({ q }: { q: Question }) {
  return q.image ? (
    <div className="flex flex-col items-center">
      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white p-3 shadow-sm w-full">
        <Image src={q.image} alt="Visual sequence" width={340} height={80} className="w-full h-auto" priority />
      </div>
    </div>
  ) : null
}

function RotationQuestion({ q }: { q: Question }) {
  return q.image ? (
    <div className="flex flex-col items-center">
      <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Original</div>
      <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-3 shadow-sm">
        <Image src={q.image} alt="Original shape" width={100} height={100} priority />
      </div>
    </div>
  ) : null
}

function OddQuestion({ q }: { q: Question }) {
  if (!q.options.some(o => o.image)) return null
  return (
    <div className="text-xs font-medium text-center text-gray-500 mt-1">
      Three figures share a hidden rule — one does not.
    </div>
  )
}

function QuestionVisual({ q }: { q: Question }) {
  switch (q.type) {
    case 'matrix': return <MatrixQuestion q={q} />
    case 'pattern': return <PatternQuestion q={q} />
    case 'sequence': return <SequenceQuestion q={q} />
    case 'rotation': return <RotationQuestion q={q} />
    case 'odd': return <OddQuestion q={q} />
    default: return null
  }
}

// ── Answer option renderers ───────────────────────────────────────────────────

function ImageOption({
  option, index, selected, correct, onSelect, disabled
}: {
  option: { text?: string; image?: string }
  index: number
  selected: number | null
  correct: number
  onSelect: (i: number) => void
  disabled: boolean
}) {
  const isSelected = selected === index
  const isCorrect = selected !== null && index === correct
  const isWrong = isSelected && !isCorrect

  let border = '1.5px solid #e5e7eb'
  let bg = 'white'
  if (isCorrect) { border = '2px solid #16a34a'; bg = '#f0fdf4' }
  else if (isWrong) { border = '2px solid #dc2626'; bg = '#fef2f2' }
  else if (isSelected) { border = '2px solid #2563eb'; bg = '#eff6ff' }

  return (
    <button
      onClick={() => !disabled && onSelect(index)}
      disabled={disabled}
      className="relative flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all duration-200"
      style={{ border, background: bg, cursor: disabled ? 'default' : 'pointer' }}
      onMouseEnter={e => { if (!disabled && selected === null) { (e.currentTarget as HTMLElement).style.borderColor = '#2563eb'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' } }}
      onMouseLeave={e => { if (!disabled && selected === null) { (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLElement).style.transform = 'none' } }}
    >
      <div className="text-xs font-bold text-gray-400 absolute top-2 left-3">{['A','B','C','D'][index]}</div>
      {option.image && (
        <div className="mt-2">
          <Image src={option.image} alt={`Option ${['A','B','C','D'][index]}`} width={80} height={80} />
        </div>
      )}
      {isCorrect && <CheckCircle size={14} className="absolute top-2 right-2" style={{ color: '#16a34a' }} />}
      {isWrong && <XCircle size={14} className="absolute top-2 right-2" style={{ color: '#dc2626' }} />}
    </button>
  )
}

function TextOption({
  option, index, selected, correct, onSelect, disabled
}: {
  option: { text?: string; image?: string }
  index: number
  selected: number | null
  correct: number
  onSelect: (i: number) => void
  disabled: boolean
}) {
  const isSelected = selected === index
  const isCorrect = selected !== null && index === correct
  const isWrong = isSelected && !isCorrect

  let border = '1.5px solid #e5e7eb'
  let bg = 'white'
  let textColor = '#374151'
  if (isCorrect) { border = '2px solid #16a34a'; bg = '#f0fdf4'; textColor = '#15803d' }
  else if (isWrong) { border = '2px solid #dc2626'; bg = '#fef2f2'; textColor = '#b91c1c' }
  else if (isSelected) { border = '2px solid #2563eb'; bg = '#eff6ff' }

  return (
    <button
      onClick={() => !disabled && onSelect(index)}
      disabled={disabled}
      className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-sm font-medium w-full transition-all duration-200"
      style={{ border, background: bg, color: textColor, cursor: disabled ? 'default' : 'pointer' }}
      onMouseEnter={e => { if (!disabled && selected === null) { (e.currentTarget as HTMLElement).style.borderColor = '#2563eb'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' } }}
      onMouseLeave={e => { if (!disabled && selected === null) { (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLElement).style.transform = 'none' } }}
    >
      <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{ background: '#f3f4f6', color: '#6b7280' }}>
        {['A','B','C','D'][index]}
      </span>
      <span className="flex-1 whitespace-pre-line">{option.text}</span>
      {isCorrect && <CheckCircle size={16} style={{ color: '#16a34a', flexShrink: 0 }} />}
      {isWrong && <XCircle size={16} style={{ color: '#dc2626', flexShrink: 0 }} />}
    </button>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TestPage() {
  const router = useRouter()
  const [questions] = useState(() => getRandomQuestions(30))
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<UserAnswer[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [startTime] = useState<number>(Date.now())
  const [elapsed, setElapsed] = useState(0)
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('iq_session_id')
      if (existing) return existing
      const id = crypto.randomUUID()
      localStorage.setItem('iq_session_id', id)
      return id
    }
    return ''
  })
  // email gate removed
  // email state removed
  // pendingSession removed
  const [toast, setToast] = useState('')
  const [fadeKey, setFadeKey] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000)
    return () => clearInterval(iv)
  }, [startTime])

  useEffect(() => {
    if (current === 12) { setToast('Strong performance detected! Keep going.'); setTimeout(() => setToast(''), 4000) }
    if (current === 20) { setToast('Almost there — final stretch!'); setTimeout(() => setToast(''), 4000) }
  }, [current])

  const formatTime = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`

  const selectAnswer = useCallback(async (optionIndex: number) => {
    if (selected !== null) return
    setSelected(optionIndex)

    const q = questions[current]
    const isCorrect = optionIndex === (q.correctAnswer ?? q.correct)
    const newAnswer: UserAnswer = { questionId: q.id, selectedOption: optionIndex, isCorrect }
    const updatedAnswers = [...answers, newAnswer]

    setTimeout(async () => {
      const nextIdx = current + 1
      if (nextIdx >= questions.length) {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000)
        localStorage.setItem('iq_completed', JSON.stringify({ value: true, time: Date.now() }))
        try {
          const res = await fetch('/api/calculate-iq', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, answers: updatedAnswers.map(a => ({ questionId: a.questionId, selectedOption: a.selectedOption })), timeTaken }),
          })
          const data = await res.json()
          const sid = data.sessionId || sessionId
          try {
            const { data: { user } } = await supabase.auth.getUser()
            if (user && data.result) {
              await supabase.from('test_results').insert({ user_id: user.id, session_id: sid, iq_score: data.result.iq, percentile: data.result.percentile, category: data.result.category, time_taken: timeTaken, answers: updatedAnswers })
            }
          } catch {}
          localStorage.setItem('iq_last_session', sid)
          router.push("/test/analyzing?session=" + sid)
        } catch {
          localStorage.setItem('iq_last_session', sessionId)
          router.push("/test/analyzing?session=" + sessionId)
        }
        // direct to analyzing
      } else {
        setAnswers(updatedAnswers)
        setFadeKey(k => k + 1)
        setCurrent(nextIdx)
        setSelected(null)
      }
    }, 700)
  }, [selected, current, questions, answers, sessionId, startTime])

  const progress = (current / questions.length) * 100
  const CATEGORY_COLOR: Record<string, string> = {
    pattern: '#2563eb', logic: '#16a34a', numerical: '#f59e0b', spatial: '#7c3aed'
  }
  const CATEGORY_LABEL: Record<string, string> = {
    pattern: 'Pattern Recognition', logic: 'Logical Reasoning', numerical: 'Numerical Ability', spatial: 'Spatial Reasoning'
  }
  const TYPE_LABEL: Record<string, string> = {
    matrix: 'Matrix', pattern: 'Pattern', sequence: 'Sequence', odd: 'Odd One Out', rotation: 'Rotation', logic: 'Logic', text: 'Reasoning'
  }


  const q = questions[current]
  const hasImageOptions = q.options.some(o => o.image)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f5f7fb' }}>
      {/* Progress header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-4 py-3"
        style={{ borderBottom: '1px solid #e5e7eb' }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold" style={{ color: '#111827' }}>
              {current + 1}<span style={{ color: '#9ca3af' }}>/{questions.length}</span>
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: `${CATEGORY_COLOR[q.category]}12`, color: CATEGORY_COLOR[q.category] }}>
              {TYPE_LABEL[q.type]}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: '#f3f4f6', color: '#6b7280' }}>
              {CATEGORY_LABEL[q.category]}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-mono" style={{ color: '#6b7280' }}>
            <Clock size={13} />{formatTime(elapsed)}
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#2563eb,#1d4ed8)' }} />
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-semibold text-white shadow-lg animate-slide-down"
          style={{ background: '#2563eb' }}>{toast}</div>
      )}

      {/* Question */}
      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div key={fadeKey} className="max-w-2xl w-full animate-fade-in">
          {/* Difficulty */}
          <div className="flex items-center gap-2 mb-5">
            {[1,2,3].map(i => (
              <div key={i} className="h-1.5 w-8 rounded-full"
                style={{ background: i <= q.weight ? '#2563eb' : '#e5e7eb' }} />
            ))}
            <span className="text-xs" style={{ color: '#9ca3af' }}>
              {q.weight === 1 ? 'Standard' : q.weight === 2 ? 'Advanced' : 'Expert'}
            </span>
          </div>

          {/* Question card */}
          <div className="card p-6 mb-5">
            <h2 className="font-bold text-xl md:text-2xl leading-snug mb-5 whitespace-pre-line"
              style={{ color: '#111827', fontFamily: "'Lora', serif" }}>
              {q.question}
            </h2>
            <QuestionVisual q={q} />
          </div>

          {/* Answers */}
          {hasImageOptions ? (
            <div className="grid grid-cols-2 gap-3">
              {q.options.map((opt, i) => (
                <ImageOption key={i} option={opt} index={i} selected={selected} correct={q.correctAnswer ?? q.correct}
                  onSelect={selectAnswer} disabled={selected !== null} />
              ))}
            </div>
          ) : (
            <div className="space-y-2.5">
              {q.options.map((opt, i) => (
                <TextOption key={i} option={opt} index={i} selected={selected} correct={q.correctAnswer ?? q.correct}
                  onSelect={selectAnswer} disabled={selected !== null} />
              ))}
            </div>
          )}

          {/* Motivational nudge */}
          {current >= 20 && (
            <p className="text-center text-sm mt-5 font-medium" style={{ color: '#16a34a' }}>
              Final stretch — your IQ score is almost ready! 🧠
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
