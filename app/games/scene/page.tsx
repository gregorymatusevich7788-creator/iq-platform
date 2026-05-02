'use client'



import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, RotateCcw } from 'lucide-react'
const ITEMS=['🍎','🚗','🏠','🌟','🎈','🐱','🌺','🎭','🍕','⚽','🎸','🦊','🌈','🎯','🍦','🔑']
type Phase='ready'|'study'|'find'|'result'
export default function SceneScrutinizerGame(){
  const [level,setLevel]=useState(1)
  const [phase,setPhase]=useState<Phase>('ready')
  const [original,setOriginal]=useState<string[]>([])
  const [modified,setModified]=useState<string[]>([])
  const [changedIdx,setChangedIdx]=useState(-1)
  const [selected,setSelected]=useState<number|null>(null)
  const [score,setScore]=useState(0)
  const sceneSize=6+level*2
  function startLevel(){
    const scene=[...ITEMS].sort(()=>Math.random()-0.5).slice(0,sceneSize)
    const mod=[...scene];const idx=Math.floor(Math.random()*sceneSize)
    let newItem;do{newItem=ITEMS[Math.floor(Math.random()*ITEMS.length)]}while(newItem===scene[idx])
    mod[idx]=newItem;setOriginal(scene);setModified(mod);setChangedIdx(idx);setSelected(null);setPhase('study')
  }
  function handleGuess(idx:number){if(phase!=='find')return;setSelected(idx);if(idx===changedIdx)setScore(s=>s+level*10);setPhase('result')}
  const cols=level<=2?4:5
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
      <h1 className="font-display font-bold text-3xl text-white mb-2">Scene Scrutinizer</h1>
      <p className="text-slate-400 text-sm mb-8">Study the scene, then find what changed.</p>
      {phase==='ready'&&<div className="card p-8 text-center"><div className="text-5xl mb-4">🔍</div><h3 className="font-display font-bold text-2xl text-white mb-2">Level {level}</h3><p className="text-slate-400 mb-6">Find the <span className="text-purple-400 font-bold">1 changed item</span> in {sceneSize} items</p><button onClick={startLevel} className="btn-primary w-full justify-center">Start</button></div>}
      {phase==='study'&&<div><p className="text-purple-400 font-bold mb-4">📖 Study carefully!</p><div className="card p-4 mb-5"><div className="grid gap-2" style={{gridTemplateColumns:`repeat(${cols},1fr)`}}>{original.map((item,i)=><div key={i} className="aspect-square rounded-xl flex items-center justify-center text-2xl" style={{background:'var(--bg-700)'}}>{item}</div>)}</div></div><button onClick={()=>setPhase('find')} className="btn-primary w-full justify-center">I memorized it →</button></div>}
      {phase==='find'&&<div><p className="text-slate-300 font-semibold mb-4">🔍 Tap the changed item!</p><div className="card p-4"><div className="grid gap-2" style={{gridTemplateColumns:`repeat(${cols},1fr)`}}>{modified.map((item,i)=><button key={i} onClick={()=>handleGuess(i)} className="aspect-square rounded-xl flex items-center justify-center text-2xl transition-all hover:scale-110 active:scale-95" style={{background:'var(--bg-700)',border:'1px solid rgba(255,255,255,0.05)'}}>{item}</button>)}</div></div></div>}
      {phase==='result'&&<div className="card p-8 text-center">{selected===changedIdx?(<><div className="text-5xl mb-3">✅</div><h3 className="font-display font-bold text-2xl text-green-400 mb-2">Spot on!</h3><p className="text-slate-400 mb-6">+{level*10} points</p><button onClick={()=>{setLevel(l=>l+1);startLevel()}} className="btn-primary w-full justify-center mb-3">Next Level</button></>):(<><div className="text-5xl mb-3">❌</div><h3 className="font-display font-bold text-2xl text-red-400 mb-2">Wrong!</h3><p className="text-slate-400 mb-6">The change was: {original[changedIdx]} → {modified[changedIdx]}</p><button onClick={startLevel} className="btn-primary w-full justify-center mb-3"><RotateCcw size={15}/> Try Again</button></>)}<Link href="/test" className="btn-ghost w-full justify-center text-sm">Take the IQ Test →</Link></div>}
    </div></div>
  )
}