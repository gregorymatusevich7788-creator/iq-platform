import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default function Article() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/blog" className="text-slate-400 hover:text-white text-sm mb-8 inline-block">← Back to Blog</Link>
        <h1 className="font-display font-bold text-4xl text-white mb-4">10 Proven Cognitive Benefits of Brain Training Games</h1>
        <p className="text-slate-400 text-sm mb-8">December 12, 2024 · 8 min read</p>
        <div className="space-y-5 text-slate-300 leading-relaxed">
          <p>Meta-analyses of 50+ studies confirm that consistent brain training improves working memory, processing speed, and fluid intelligence.</p>
          <h2 className="font-display font-bold text-2xl text-white mt-8 mb-4">Top Benefits</h2>
          <p>1. Improved Working Memory — up to 30% increase after consistent training.</p>
          <p>2. Faster Processing Speed — up to 25% faster visual processing after 4 weeks.</p>
          <p>3. Better Attention Control — reduced mind-wandering, improved sustained focus.</p>
          <p>4. Enhanced Problem Solving — builds flexible thinking for novel challenges.</p>
          <p>5. Reduced Cognitive Decline — up to 48% reduction in age-related decline.</p>
          <p>6. Better Academic Performance — 12-point improvement in standardized tests after 8 weeks.</p>
          <p>7. Improved Multitasking — better handling of multiple information streams.</p>
          <p>8. Greater Mental Stamina — maintain peak performance over longer periods.</p>
          <p>9. Stress Resilience — improved emotional regulation under pressure.</p>
          <p>10. Higher Fluid IQ — fluid intelligence is directly trainable through targeted games.</p>
          <div className="card p-8 text-center mt-8" style={{borderColor:'rgba(37,99,235,0.2)'}}>
            <h3 className="font-display font-bold text-xl text-white mb-3">Start Training Today</h3>
            <Link href="/games" className="btn-primary">Play Brain Games</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
