import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default function Article() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/blog" className="text-slate-400 hover:text-white text-sm mb-8 inline-block">← Back to Blog</Link>
        <h1 className="font-display font-bold text-4xl text-white mb-4">Can You Actually Raise Your IQ? What Science Says in 2025</h1>
        <p className="text-slate-400 text-sm mb-8">January 8, 2025 · 7 min read</p>
        <div className="space-y-5 text-slate-300 leading-relaxed">
          <p>The latest research confirms: yes, you can improve your cognitive performance — but it requires consistent, targeted effort. Users who train consistently for 30 days report an average improvement of 6–11 IQ points.</p>
          <h2 className="font-display font-bold text-2xl text-white mt-8 mb-4">7 Evidence-Based Methods</h2>
          <p>🧩 Brain Training Games — improve fluid intelligence by 6-11 points over 30 days.</p>
          <p>😴 Quality Sleep — 7-9 hours improves cognitive processing speed by up to 20%.</p>
          <p>🏃 Aerobic Exercise — 30 min cardio 3x per week increases BDNF and improves learning.</p>
          <p>🥗 Nutrition — Omega-3s, blueberries, and leafy greens have demonstrated cognitive benefits.</p>
          <p>📚 Continuous Learning — builds new neural pathways and increases cognitive reserve.</p>
          <p>🧘 Stress Reduction — meditation for 10 min daily reduces cortisol and improves working memory.</p>
          <p>👥 Social Engagement — regular meaningful conversation improves reasoning and verbal IQ.</p>
          <div className="card p-8 text-center mt-8" style={{borderColor:'rgba(37,99,235,0.2)'}}>
            <h3 className="font-display font-bold text-xl text-white mb-3">Start Improving Today</h3>
            <Link href="/test" className="btn-primary">Take the Baseline Test</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
