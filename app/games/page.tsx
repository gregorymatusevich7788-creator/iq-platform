import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Brain Training Games — Boost Your IQ | Neuro Index',
  description: 'Play scientifically-designed brain training games to improve memory, focus, and cognitive performance.',
}


const GAMES = [
  {
    slug: 'colored-tiles',
    name: 'Colored Tiles',
    emoji: '🎨',
    category: 'Working Memory',
    desc: 'Memorize the color and position of tiles, then recreate the pattern from memory.',
    difficulty: 'Easy → Hard',
    trains: 'Working memory, visual recall',
    color: '#3b82f6',
  },
  {
    slug: 'mines',
    name: 'Avoid the Mines',
    emoji: '💣',
    category: 'Concentration',
    desc: 'Memorize the positions of mines shown for 3 seconds, then navigate around them.',
    difficulty: 'Medium',
    trains: 'Short-term memory, concentration',
    color: '#ef4444',
  },
  {
    slug: 'scroll-match',
    name: 'Scroll & Match',
    emoji: '🔄',
    category: 'Focus',
    desc: 'Match four tiles in sequence to sharpen focus and processing speed.',
    difficulty: 'Easy',
    trains: 'Focus, reaction time',
    color: '#10b981',
  },
  {
    slug: 'birds',
    name: 'Bird Watching',
    emoji: '🐦',
    category: 'Short-Term Memory',
    desc: 'Track birds flying across the screen and recall their positions.',
    difficulty: 'Medium',
    trains: 'Short-term memory, tracking',
    color: '#f59e0b',
  },
  {
    slug: 'scene',
    name: 'Scene Scrutinizer',
    emoji: '🔍',
    category: 'Attention to Detail',
    desc: 'Memorize a scene and identify what changed between viewings.',
    difficulty: 'Hard',
    trains: 'Attention, observation skills',
    color: '#a855f7',
  },
  {
    slug: 'dungeons',
    name: 'Dungeons & Gems',
    emoji: '⚔️',
    category: 'Spatial Memory',
    desc: 'Memorize the safe path through a dungeon to collect gemstones.',
    difficulty: 'Medium → Hard',
    trains: 'Spatial memory, path planning',
    color: '#06b6d4',
  },
]

export default function GamesPage() {

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-14">
        <div className="text-center mb-14">
          <div className="section-label mx-auto w-fit mb-4">Brain Training</div>
          <h1 className="font-display font-bold text-5xl text-white mb-4">Brain Training Games</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Scientifically designed games to improve your cognitive abilities.
            Regular practice can measurably improve your IQ score.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAMES.map(({ slug, name, emoji, category, desc, difficulty, trains, color }) => (
            <Link key={slug} href={`/games/${slug}`}
              className="card-hover p-7 group flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{emoji}</div>
                <span className="text-xs px-2 py-1 rounded-lg font-semibold"
                  style={{ background: `${color}15`, color, border: `1px solid ${color}20` }}>
                  {category}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">
                {name}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{desc}</p>
              <div className="space-y-1.5 text-xs text-slate-500">
                <div>⚡ Difficulty: {difficulty}</div>
                <div>🧠 Trains: {trains}</div>
              </div>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold" style={{ color }}>
                Play Now <ChevronRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
