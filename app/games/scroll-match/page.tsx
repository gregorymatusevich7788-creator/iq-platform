'use client'



import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, RotateCcw } from 'lucide-react'

const SYMBOLS = ['🔥','⚡','🌊','🌿','💎','🎯','🚀','🎲','🦋','🌙','⭐','🎪']

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makeCards(pairs: number) {
  const syms = SYMBOLS.slice(0, pairs)
  return shuffle([...syms, ...syms]).map((sym, id) => ({ id, sym, flipped: false, matched: false }))
}

export default function MemoryMatchGame() {
  const [level, setLevel] = useState(1)
  const [cards, setCards] = useState(() => makeCards(6))
  const [flipped, setFlipped] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const [busy, setBusy] = useState(false)
  const pairs = Math.min(6 + (level - 1) * 2, 12)
  const cols = level <= 2 ? 4 : 6
  const matched = cards.filter(c => c.matched).length / 2

  function reset(lvl: number) {
    setCards(makeCards(Math.min(6 + (lvl - 1) * 2, 12)))
    setFlipped([])
    setMoves(0)
    setWon(false)
    setBusy(false)
  }

  function flip(id: number) {
    if (busy) return
    const card = cards.find(c => c.id === id)
    if (!card || card.flipped || card.matched) return
    if (flipped.length === 1 && flipped[0] === id) return
    const next = [...flipped, id]
    setCards(p => p.map(c => c.id === id ? { ...c, flipped: true } : c))
    if (next.length < 2) { setFlipped(next); return }
    setMoves(m => m + 1)
    setBusy(true)
    const [ai, bi] = next
    const a = cards.find(c => c.id === ai)!
    const b = cards.find(c => c.id === bi)!
    if (a.sym === b.sym) {
      setTimeout(() => {
        setCards(p => {
          const nc = p.map(c => (c.id === ai || c.id === bi) ? { ...c, matched: true } : c)
          if (nc.every(c => c.matched)) { setWon(true); setScore(s => s + pairs * 10 * level) }
          return nc
        })
        setFlipped([])
        setBusy(false)
      }, 400)
    } else {
      setTimeout(() => {
        setCards(p => p.map(c => (c.id === ai || c.id === bi) ? { ...c, flipped: false } : c))
        setFlipped([])
        setBusy(false)
      }, 800)
    }
  }

  return (<div className="min-h-screen px-4 py-8">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/games" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm">
            <ArrowLeft size={16} /> Back
          </Link>
          <div className="flex items-center gap-4">
            <span className="font-mono text-slate-400 text-sm">{moves} moves</span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg"
              style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <Star size={13} className="text-yellow-400 fill-yellow-400" />
              <span className="font-mono text-yellow-400 font-bold text-sm">{score}</span>
            </div>
          </div>
        </div>

        <h1 className="font-display font-bold text-3xl text-white mb-2">Memory Match</h1>
        <p className="text-slate-400 text-sm mb-2">Level {level} — {matched}/{pairs} pairs</p>
        <div className="h-1.5 rounded-full overflow-hidden mb-6" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${(matched / pairs) * 100}%` }} />
        </div>

        {won ? (
          <div className="card p-8 text-center">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="font-display font-bold text-2xl text-green-400 mb-2">Level {level} Complete!</h3>
            <p className="text-slate-400 mb-6">Done in {moves} moves</p>
            <button onClick={() => { setLevel(l => l + 1); reset(level + 1) }}
              className="btn-primary w-full justify-center mb-3">Next Level</button>
            <Link href="/test" className="btn-ghost w-full justify-center text-sm">Take the IQ Test</Link>
          </div>
        ) : (
          <div>
            <div className="card p-4">
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {cards.map(card => (
                  <button key={card.id} onClick={() => flip(card.id)}
                    className="aspect-square rounded-xl flex items-center justify-center text-2xl transition-all duration-200 hover:scale-105"
                    style={{
                      background: card.matched ? 'rgba(16,185,129,0.15)' : card.flipped ? 'rgba(37,99,235,0.2)' : 'var(--bg-700)',
                      border: card.matched ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.05)',
                      cursor: card.matched ? 'default' : 'pointer',
                    }}>
                    {(card.flipped || card.matched) ? card.sym : '?'}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => reset(level)} className="btn-ghost w-full justify-center mt-4 text-sm">
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        )}
      </div>
    </div>
  )
}