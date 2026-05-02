import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default function Article() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/blog" className="text-slate-400 hover:text-white text-sm mb-8 inline-block">← Back to Blog</Link>
        <h1 className="font-display font-bold text-4xl text-white mb-4">What Is a Good IQ Score? The Complete 2025 Guide</h1>
        <p className="text-slate-400 text-sm mb-8">December 28, 2024 · 6 min read</p>
        <div className="space-y-5 text-slate-300 leading-relaxed">
          <p>Is 120 a good IQ? What about 130? The answer depends on context — understanding the full IQ scale puts your score in proper perspective.</p>
          <h2 className="font-display font-bold text-2xl text-white mt-8 mb-4">The IQ Scale</h2>
          <p>Below 70 — Extremely Low (2%) | 70–84 — Low Average (14%) | 85–114 — Average (68%) | 115–129 — Above Average (13%) | 130–144 — Gifted (2%) | 145+ — Genius (0.1%)</p>
          <h2 className="font-display font-bold text-2xl text-white mt-8 mb-4">What This Means For You</h2>
          <p>Most highly successful professionals score between 115-130. High IQ helps, but emotional intelligence, work ethic, and creativity all play enormous roles in real-world success.</p>
          <div className="card p-8 text-center mt-8" style={{borderColor:'rgba(37,99,235,0.2)'}}>
            <h3 className="font-display font-bold text-xl text-white mb-3">Discover Your Score</h3>
            <Link href="/test" className="btn-primary">Take the Free IQ Test</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
