'use client'




import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, RotateCcw } from 'lucide-react'

const GRID = 5
type Phase = 'ready' | 'show' | 'play' | 'result'

function generateMines(count: number): Set<number> {
  const mines = new Set<number>()
  while (mines.size < count) mines.add(Math.floor(Math.random() * GRID * GRID))
  return mines
}

export default function MinesGame() {
  const [level, setLevel] = useState(1)
  const [phase, setPhase] = useState<Phase>('ready')
  const [mines, setMines] = useState<Set<number>>(new Set())
  const [clicked, setClicked] = useState<Set<number>>(new Set())
  const [score, setScore] = useState(0)
  const [countdown, setCountdown] = useState(3)
  const [result, setResult] = useState<'win' | 'lose' | null>(null)
  const mineCount = 3 + level

  useEffect(() => {
    if (phase !== 'show') return
    setCountdown(3)
    const interval = setInterval(() => {
      setCountdown(c => { if (c <= 1) { clearInterval(interval); setPhase('play'); return 0 } return c - 1 })
    }, 1000)
    return (
    ) => clearInterval(interval)
  }, [phase])

  function startLevel() {
    setMines(generateMines(mineCount)); setClicked(new Set()); setResult(null); setPhase('show')
  }

  function handleClick(idx: number) {
    if (phase !== 'play' || clicked.has(idx)) return
    if (mines.has(idx)) { setResult('lose'); setPhase('result'); return }
    const nc = new Set(clicked).add(idx); setClicked(nc)
    if (nc.size >= GRID * GRID - mineCount) { setScore(s => s + level * 20); setResult('win'); setPhase('result') }
  }

  return (<div className="min-h-screen px-4 py-8">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/games" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm"><ArrowLeft size={16} /> Back</Link>
          <div className="flex items-center gap-4">
            <span className="font-display font-bold text-white">Level {level}</span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg" style={{background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.2)'}}>
              <Star size={13} className="text-yellow-400 fill-yellow-400" /><span className="font-mono text-yellow-400 font-bold text-sm">{score}</span>
            </div>
          </div>
        </div>
        <h1 className="font-display font-bold text-3xl text-white mb-2">Avoid the Mines</h1>
        <p className="text-slate-400 text-sm mb-8">Memorize mine positions, then click all safe cells.</p>
        {phase === 'ready' && (
          <div className="card p-8 text-center">
            <div className="text-5xl mb-4">💣</div>
            <h3 className="font-display font-bold text-2xl text-white mb-2">Level {level}</h3>
            <p className="text-slate-400 mb-6">Memorize <span className="text-red-400 font-bold">{mineCount} mines</span> in 3 seconds</p>
            <button onClick={startLevel} className="btn-primary w-full justify-center">Start Level</button>
          </div>
        )}
        {(phase === 'show' || phase === 'play') && (
          <div>
            {phase === 'show' && <div className="flex justify-between mb-4"><p className="text-red-400 font-bold">Memorize the mines!</p><div className="font-display font-bold text-3xl text-red-400">{countdown}s</div></div>}
            {phase === 'play' && <p className="text-slate-300 font-semibold mb-4">Click safe cells! ({GRID*GRID-mineCount-clicked.size} left)</p>}
            <div className="card p-4">
              <div className="grid gap-2" style={{gridTemplateColumns:`repeat(${GRID}, 1fr)`}}>
                {Array.from({length:GRID*GRID}).map((_,idx) => {
                  const isMine = mines.has(idx), isClicked = clicked.has(idx)
                  let bg = 'var(--bg-700)', content = null
                  if (phase==='show' && isMine) { bg='rgba(239,68,68,0.3)'; content='💣' }
                  if (phase==='play' && isClicked) { bg='rgba(16,185,129,0.2)'; content='✓' }
                  return <button key={idx} onClick={()=>handleClick(idx)} className="aspect-square rounded-lg flex items-center justify-center text-lg transition-all hover:opacity-80" style={{background:bg,border:'1px solid rgba(255,255,255,0.05)'}}>{content}</button>
                })}
              </div>
            </div>
          </div>
        )}
        {phase === 'result' && (
          <div className="card p-8 text-center">
            {result==='win' ? (<><div className="text-5xl mb-3">🎉</div><h3 className="font-display font-bold text-2xl text-green-400 mb-2">Level Cleared!</h3><p className="text-slate-400 mb-6">+{level*20} points</p><button onClick={()=>{setLevel(l=>l+1);startLevel()}} className="btn-primary w-full justify-center mb-3">Next Level</button></>) : (<><div className="text-5xl mb-3">💥</div><h3 className="font-display font-bold text-2xl text-red-400 mb-2">Boom!</h3><p className="text-slate-400 mb-6">You hit a mine!</p><button onClick={startLevel} className="btn-primary w-full justify-center mb-3"><RotateCcw size={15}/> Try Again</button></>)}
            <Link href="/test" className="btn-ghost w-full justify-center text-sm">Take the IQ Test →</Link>
          </div>
        )}
      </div>
    </div>
  )
}