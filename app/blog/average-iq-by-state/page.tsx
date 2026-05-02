import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default function Article() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/blog" className="text-slate-400 hover:text-white text-sm mb-8 inline-block">← Back to Blog</Link>
        <h1 className="font-display font-bold text-4xl text-white mb-4">Average IQ by US State [2025 Complete Ranking]</h1>
        <p className="text-slate-400 text-sm mb-8">January 15, 2025 · 5 min read</p>
        <div className="space-y-5 text-slate-300 leading-relaxed">
          <p>Massachusetts leads the nation with an average IQ of 104.3, while Mississippi ranks last at 94.2. Research suggests these differences are driven by education quality, economic factors, and access to cognitive enrichment — not inherent differences between populations.</p>
          <h2 className="font-display font-bold text-2xl text-white mt-8 mb-4">Top 5 States by IQ</h2>
          <p>1. Massachusetts — 104.3 | 2. New Hampshire — 104.2 | 3. Vermont — 103.8 | 4. Connecticut — 103.7 | 5. New Jersey — 103.7</p>
          <h2 className="font-display font-bold text-2xl text-white mt-8 mb-4">Find Your Score</h2>
          <p>State averages are just averages. Individual scores vary enormously within each state. Take our test to see exactly where you stand.</p>
          <div className="card p-8 text-center mt-8" style={{borderColor:'rgba(37,99,235,0.2)'}}>
            <h3 className="font-display font-bold text-xl text-white mb-3">Find Out Your IQ Score</h3>
            <Link href="/test" className="btn-primary">Take the Free Test</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
