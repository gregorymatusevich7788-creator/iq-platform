'use client'



import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, RotateCcw } from 'lucide-react'
const BIRDS = ['🐦','🦅','🦆','🦉','🦚','🐧','🦜','🕊️']
type Phase = 'ready'|'show'|'answer'|'result'
export default function BirdWatchingGame() {
  const [level,setLevel]=useState(1)
  const [phase,setPhase]=useState<Phase>('ready')
  const [birds,setBirds]=useState<number[]>([])
  const [selected,setSelected]=useState<number[]>([])
  const [score,setScore]=useState(0)
  const [countdown,setCountdown]=useState(3)
  const [correct,setCorrect]=useState<boolean|null>(null)
  const birdCount=2+level
  function startLevel(){
    const b:number[]=[]
    while(b.length<birdCount){const r=Math.floor(Math.random()*BIRDS.length);if(!b.includes(r))b.push(r)}
    setBirds(b);setSelected([]);setCorrect(null);setPhase('show');setCountdown(3)
  }
  useEffect(()=>{
    if(phase!=='show')return
    const t=setInterval(()=>setCountdown(c=>{if(c<=1){clearInterval(t);setPhase('answer');return 0}return c-1}),1000)
    return()=>clearInterval(t)
  },[phase])
  function handleSelect(i:number){if(phase!=='answer')return;setSelected(p=>p.includes(i)?p.filter(x=>x!==i):[...p,i])}
  function checkAnswer(){
    const ok=birds.every(b=>selected.includes(b))&&selected.length===birds.length
    setCorrect(ok);if(ok)setScore(s=>s+level*15);setPhase('result')
  }
  return(
    <div className="min-h-screen px-4 py-8"><div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link href="/games" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm"><ArrowLeft size={16}/> Back</Link>
        <div className="flex items-center gap-4"><span className="font-display font-bold text-white">Level {level}</span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg" style={{background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.2)'}}>
            <Star size={13} className="text-yellow-400 fill-yellow-400"/><span className="font-mono text-yellow-400 font-bold text-sm">{score}</span>
          </div>
        </div>
      </div>
      <h1 className="font-display font-bold text-3xl text-white mb-2">Bird Watching</h1>
      <p className="text-slate-400 text-sm mb-8">Remember which birds appeared!</p>
      {phase==='ready'&&<div className="card p-8 text-center"><div className="text-5xl mb-4">🐦</div><h3 className="font-display font-bold text-2xl text-white mb-2">Level {level}</h3><p className="text-slate-400 mb-6">Spot <span className="text-blue-400 font-bold">{birdCount} birds</span> in 3 seconds</p><button onClick={startLevel} className="btn-primary w-full justify-center">Start</button></div>}
      {phase==='show'&&<div><div className="flex justify-between mb-4"><p className="text-blue-400 font-bold">Watch!</p><span className="font-display font-bold text-2xl text-blue-400">{countdown}s</span></div><div className="card p-8 flex gap-4 flex-wrap justify-center">{birds.map(b=><span key={b} className="text-5xl">{BIRDS[b]}</span>)}</div></div>}
      {phase==='answer'&&<div><p className="text-slate-300 font-semibold mb-4">Which birds? Select {birdCount}:</p><div className="grid grid-cols-4 gap-3 mb-6">{BIRDS.map((_,i)=><button key={i} onClick={()=>handleSelect(i)} className="aspect-square rounded-xl text-3xl flex items-center justify-center transition-all" style={{background:selected.includes(i)?'rgba(37,99,235,0.2)':'var(--bg-700)',border:selected.includes(i)?'2px solid #2563eb':'1px solid rgba(255,255,255,0.05)',transform:selected.includes(i)?'scale(1.1)':'scale(1)'}}>{BIRDS[i]}</button>)}</div><button onClick={checkAnswer} disabled={selected.length!==birdCount} className={`btn-primary w-full justify-center ${selected.length!==birdCount?'opacity-40 cursor-not-allowed':''}`}>Check Answer</button></div>}
      {phase==='result'&&<div className="card p-8 text-center">{correct?(<><div className="text-5xl mb-3">🎉</div><h3 className="font-display font-bold text-2xl text-green-400 mb-2">Correct!</h3><p className="text-slate-400 mb-6">+{level*15} points</p><button onClick={()=>{setLevel(l=>l+1);startLevel()}} className="btn-primary w-full justify-center mb-3">Next Level</button></>):(<><div className="text-5xl mb-3">😅</div><h3 className="font-display font-bold text-2xl text-orange-400 mb-2">Not quite!</h3><div className="mb-4"><p className="text-slate-400 text-sm mb-2">The birds were:</p><div className="flex justify-center gap-2">{birds.map(b=><span key={b} className="text-2xl">{BIRDS[b]}</span>)}</div></div><button onClick={startLevel} className="btn-primary w-full justify-center mb-3"><RotateCcw size={15}/> Try Again</button></>)}<Link href="/test" className="btn-ghost w-full justify-center text-sm">Take the IQ Test →</Link></div>}
    </div></div>
  )
}