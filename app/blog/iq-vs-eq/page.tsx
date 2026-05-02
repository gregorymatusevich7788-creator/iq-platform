import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default function Article() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/blog" className="text-slate-400 hover:text-white text-sm mb-8 inline-block">← Back to Blog</Link>
        <h1 className="font-display font-bold text-4xl text-white mb-4">IQ vs EQ: Which Matters More for Success?</h1>
        <p className="text-slate-400 text-sm mb-8">December 20, 2024 · 6 min read</p>
        <div className="space-y-5 text-slate-300 leading-relaxed">
          <p>IQ predicts academic performance strongly. But for career success and life satisfaction, EQ is often an equal or stronger predictor. The most successful people combine both.</p>
          <h2 className="font-display font-bold text-2xl text-white mt-8 mb-4">IQ vs EQ</h2>
          <p>IQ predicts: academic performance, technical problem-solving, processing speed, pattern recognition, logical reasoning.</p>
          <p>EQ predicts: leadership success, team performance, relationship quality, conflict resolution, sales and persuasion.</p>
          <h2 className="font-display font-bold text-2xl text-white mt-8 mb-4">The Verdict</h2>
          <p>IQ gets you in the room. EQ determines how far you go once you are there. Developing both is the key to peak performance in any field.</p>
          <div className="card p-8 text-center mt-8" style={{borderColor:'rgba(37,99,235,0.2)'}}>
            <h3 className="font-display font-bold text-xl text-white mb-3">Measure Your IQ</h3>
            <Link href="/test" className="btn-primary">Take the Free Test</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
