'use client'



import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, RotateCcw } from 'lucide-react'
type Dir='up'|'down'|'left'|'right'
type Phase='ready'|'show'|'play'|'result'
const DIRS:Dir[]=['up','down','left','right']
const ARROWS:Record<Dir,string>={up:'⬆️',down:'⬇️',left:'⬅️',right:'➡️'}
const KEYS:Record<string,Dir>={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'}
export default function DungeonsGame(){
  const [level,setLevel]=useState(1)
  const [phase,setPhase]=useState<Phase>('ready')
  const [path,setPath]=useState<Dir[]>([])
  const [playerPath,setPlayerPath]=useState<Dir[]>([])
  const [currentShow,setCurrentShow]=useState(-1)
  const [score,setScore]=useState(0)
  const steps=3+level
  function startLevel(){const p=Array.from({length:steps},()=>DIRS[Math.floor(Math.random()*4)]) as Dir[];setPath(p);setPlayerPath([]);setPhase('show');setCurrentShow(0)}
  useEffect(()=>{
    if(phase!=='show')return
    if(currentShow>=path.length){setTimeout(()=>{setPhase('play');setCurrentShow(-1)},600);return}
    const t=setTimeout(()=>setCurrentShow(c=>c+1),800)
    return()=>clearTimeout(t)
  },[phase,currentShow,path.length])
  function handleDir(dir:Dir){
    if(phase!=='play')return
    const np=[...playerPath,dir];setPlayerPath(np)
    if(np[np.length-1]!==path[np.length-1]){setPhase('result');return}
    if(np.length===path.length){setScore(s=>s+level*15);setPhase('result')}
  }
  useEffect(()=>{
    function k(e:KeyboardEvent){const d=KEYS[e.key];if(d)handleDir(d)}
    window.addEventListener('keydown',k);return()=>window.removeEventListener('keydown',k)
  },[phase,playerPath,path])
  const won=phase==='result'&&playerPath.length===path.length&&playerPath.every((d,i)=>d===path[i])
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
      <h1 className="font-display font-bold text-3xl text-white mb-2">Dungeons & Gems</h1>
      <p className="text-slate-400 text-sm mb-8">Memorize the path, then repeat it.</p>
      {phase==='ready'&&<div className="card p-8 text-center"><div className="text-5xl mb-4">⚔️</div><h3 className="font-display font-bold text-2xl text-white mb-2">Level {level}</h3><p className="text-slate-400 mb-6">Remember <span className="text-cyan-400 font-bold">{steps} moves</span></p><button onClick={startLevel} className="btn-primary w-full justify-center">Enter Dungeon</button></div>}
      {phase==='show'&&<div><p className="text-cyan-400 font-bold mb-4">Watch! ({currentShow}/{path.length})</p><div className="card p-8 text-center mb-4"><div className="text-6xl mb-2">{currentShow<path.length?ARROWS[path[currentShow]]:'🏆'}</div><p className="text-slate-400 text-sm">Step {Math.min(currentShow+1,path.length)} of {path.length}</p></div><div className="flex gap-2 justify-center">{path.map((d,i)=><div key={i} className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{background:i<currentShow?'rgba(6,182,212,0.2)':i===currentShow?'rgba(6,182,212,0.4)':'var(--bg-700)',border:i===currentShow?'1px solid rgba(6,182,212,0.5)':'1px solid rgba(255,255,255,0.05)'}}>{i<currentShow?ARROWS[path[i]]:'?'}</div>)}</div></div>}
      {phase==='play'&&<div><div className="flex justify-between mb-4"><p className="text-slate-300 font-semibold">Repeat the path!</p><span className="text-slate-500 text-sm">{playerPath.length}/{path.length}</span></div><div className="flex gap-2 justify-center mb-6">{path.map((_,i)=><div key={i} className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{background:i<playerPath.length?'rgba(16,185,129,0.2)':'var(--bg-700)',border:i<playerPath.length?'1px solid rgba(16,185,129,0.3)':'1px solid rgba(255,255,255,0.05)'}}>{i<playerPath.length?ARROWS[playerPath[i]]:'·'}</div>)}</div><div className="flex flex-col items-center gap-2"><button onClick={()=>handleDir('up')} className="w-16 h-16 rounded-xl text-2xl transition-all active:scale-95" style={{background:'var(--bg-700)',border:'1px solid rgba(255,255,255,0.1)'}}>⬆️</button><div className="flex gap-2"><button onClick={()=>handleDir('left')} className="w-16 h-16 rounded-xl text-2xl transition-all active:scale-95" style={{background:'var(--bg-700)',border:'1px solid rgba(255,255,255,0.1)'}}>⬅️</button><div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl" style={{background:'var(--bg-800)'}}>🧙</div><button onClick={()=>handleDir('right')} className="w-16 h-16 rounded-xl text-2xl transition-all active:scale-95" style={{background:'var(--bg-700)',border:'1px solid rgba(255,255,255,0.1)'}}>➡️</button></div><button onClick={()=>handleDir('down')} className="w-16 h-16 rounded-xl text-2xl transition-all active:scale-95" style={{background:'var(--bg-700)',border:'1px solid rgba(255,255,255,0.1)'}}>⬇️</button></div><p className="text-slate-500 text-xs text-center mt-3">Arrow keys or tap buttons</p></div>}
      {phase==='result'&&<div className="card p-8 text-center">{won?(<><div className="text-5xl mb-3">💎</div><h3 className="font-display font-bold text-2xl text-green-400 mb-2">Gems collected!</h3><p className="text-slate-400 mb-6">+{level*15} points</p><button onClick={()=>{setLevel(l=>l+1);startLevel()}} className="btn-primary w-full justify-center mb-3">Next Level</button></>):(<><div className="text-5xl mb-3">💀</div><h3 className="font-display font-bold text-2xl text-red-400 mb-2">Wrong path!</h3><div className="mb-4 text-sm text-slate-400"><p className="mb-1">Correct path:</p><div className="flex gap-1 justify-center flex-wrap">{path.map((d,i)=><span key={i} className="text-xl">{ARROWS[d]}</span>)}</div></div><button onClick={startLevel} className="btn-primary w-full justify-center mb-3"><RotateCcw size={15}/> Try Again</button></>)}<Link href="/test" className="btn-ghost w-full justify-center text-sm">Take the IQ Test →</Link></div>}
    </div></div>
  )
}