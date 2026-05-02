'use client'




import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, RotateCcw, Star } from 'lucide-react'

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#a855f7', '#ec4899']
const GRID = 4

type Phase = 'ready' | 'show' | 'recall' | 'result'

function generatePattern(count: number): number[][] {
  const grid = Array.from({ length: GRID }, () => Array(GRID).fill(0))
  let placed = 0
  while (placed < count) {
    const r = Math.floor(Math.random() * GRID)
    const c = Math.floor(Math.random() * GRID)
    if (grid[r][c] === 0) {
      grid[r][c] = Math.floor(Math.random() * COLORS.length) + 1
      placed++
    }
  }
  return grid
}

export default function ColoredTilesGame() {
  const [level, setLevel] = useState(1)
  const [phase, setPhase] = useState<Phase>('ready')
  const [pattern, setPattern] = useState<number[][]>([])
  const [playerGrid, setPlayerGrid] = useState<number[][]>([])
  const [selectedColor, setSelectedColor] = useState(1)
  const [score, setScore] = useState(0)
  const [countdown, setCountdown] = useState(3)
  const [mistakes, setMistakes] = useState(0)

  const tilesCount = 3 + level * 2
  const showTime = Math.max(2, 5 - level * 0.5) * 1000

  const startLevel = useCallback(() => {
    const p = generatePattern(Math.min(tilesCount, GRID * GRID - 1))
    setPattern(p)
    setPlayerGrid(Array.from({ length: GRID }, () => Array(GRID).fill(0)))
    setMistakes(0)
    setPhase('show')
    setCountdown(Math.ceil(showTime / 1000))
  }, [tilesCount, showTime])

  useEffect(() => {
    if (phase !== 'show') return
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval)
          setPhase('recall')
          return 0
        }
        return c - 1
      })
    }, 1000)
    return (
    ) => clearInterval(interval)
  }, [phase])

  function handleCellClick(r: number, c: number) {
    if (phase !== 'recall') return
    const newGrid = playerGrid.map((row) => [...row])
    newGrid[r][c] = newGrid[r][c] === selectedColor ? 0 : selectedColor
    setPlayerGrid(newGrid)
  }

  function checkAnswer() {
    let correct = 0
    let total = 0
    let wrong = 0
    for (let r = 0; r < GRID; r++) {
      for (let c = 0; c < GRID; c++) {
        if (pattern[r][c] > 0) {
          total++
          if (playerGrid[r][c] === pattern[r][c]) correct++
        }
        if (playerGrid[r][c] > 0 && playerGrid[r][c] !== pattern[r][c]) wrong++
      }
    }
    const pts = Math.max(0, (correct - wrong) * 10 * level)
    setScore((s) => s + pts)
    setMistakes(wrong)
    setPhase('result')
  }

  const displayGrid = phase === 'show' ? pattern : playerGrid

  return (<div className="min-h-screen px-4 py-8">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/games" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Back
          </Link>
          <div className="flex items-center gap-4">
            <span className="font-display font-bold text-white">Level {level}</span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <Star size={13} className="text-yellow-400 fill-yellow-400" />
              <span className="font-mono text-yellow-400 font-bold text-sm">{score}</span>
            </div>
          </div>
        </div>

        <h1 className="font-display font-bold text-3xl text-white mb-2">Colored Tiles</h1>
        <p className="text-slate-400 text-sm mb-8">Memorize the pattern, then recreate it from memory.</p>

        {/* READY */}
        {phase === 'ready' && (
          <div className="card p-8 text-center">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="font-display font-bold text-2xl text-white mb-2">Level {level}</h3>
            <p className="text-slate-400 mb-6">Memorize {Math.min(tilesCount, GRID * GRID - 1)} colored tiles</p>
            <button onClick={startLevel} className="btn-primary w-full justify-center">
              Start Level
            </button>
          </div>
        )}

        {/* SHOW */}
        {phase === 'show' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-300 font-semibold">Memorize this pattern!</p>
              <div className="font-display font-bold text-2xl text-blue-400">{countdown}s</div>
            </div>
            <div className="card p-4">
              <div className="grid grid-cols-4 gap-2">
                {pattern.map((row, r) => row.map((cell, c) => (
                  <div key={`${r}-${c}`}
                    className="aspect-square rounded-lg transition-all duration-300"
                    style={{ background: cell ? COLORS[cell - 1] : 'var(--bg-700)', boxShadow: cell ? `0 0 10px ${COLORS[cell - 1]}40` : 'none' }} />
                )))}
              </div>
            </div>
          </div>
        )}

        {/* RECALL */}
        {phase === 'recall' && (
          <div>
            <p className="text-slate-300 font-semibold mb-4">Recreate the pattern!</p>
            {/* Color picker */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {COLORS.map((color, i) => (
                <button key={i} onClick={() => setSelectedColor(i + 1)}
                  className="w-10 h-10 rounded-xl transition-all duration-200"
                  style={{
                    background: color,
                    transform: selectedColor === i + 1 ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: selectedColor === i + 1 ? `0 0 15px ${color}` : 'none',
                    outline: selectedColor === i + 1 ? `2px solid white` : 'none',
                  }} />
              ))}
              <button onClick={() => setSelectedColor(0)}
                className={`w-10 h-10 rounded-xl border-2 text-xs font-bold transition-all ${selectedColor === 0 ? 'border-white text-white scale-110' : 'border-slate-600 text-slate-500'}`}>
                ✕
              </button>
            </div>
            <div className="card p-4 mb-4">
              <div className="grid grid-cols-4 gap-2">
                {playerGrid.map((row, r) => row.map((cell, c) => (
                  <button key={`${r}-${c}`} onClick={() => handleCellClick(r, c)}
                    className="aspect-square rounded-lg transition-all duration-150 hover:opacity-80 active:scale-95"
                    style={{
                      background: cell ? COLORS[cell - 1] : 'var(--bg-700)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }} />
                )))}
              </div>
            </div>
            <button onClick={checkAnswer} className="btn-primary w-full justify-center">
              Check Answer
            </button>
          </div>
        )}

        {/* RESULT */}
        {phase === 'result' && (
          <div className="card p-8 text-center">
            {mistakes === 0 ? (
              <>
                <div className="text-5xl mb-3">🎉</div>
                <h3 className="font-display font-bold text-2xl text-green-400 mb-2">Perfect!</h3>
                <p className="text-slate-400 mb-6">Level {level} complete! +{10 * level * tilesCount} points</p>
                <button onClick={() => { setLevel((l) => l + 1); startLevel() }} className="btn-primary w-full justify-center mb-3">
                  Next Level
                </button>
              </>
            ) : (
              <>
                <div className="text-5xl mb-3">😅</div>
                <h3 className="font-display font-bold text-2xl text-orange-400 mb-2">{mistakes} mistakes</h3>
                <p className="text-slate-400 mb-6">Keep practicing to improve your working memory!</p>
                <button onClick={startLevel} className="btn-primary w-full justify-center mb-3">
                  <RotateCcw size={15} /> Try Again
                </button>
              </>
            )}
            <Link href="/test" className="btn-ghost w-full justify-center text-sm">
              Take the IQ Test →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}