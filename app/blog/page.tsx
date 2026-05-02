import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'IQ Blog — Intelligence, Brain Training & Cognitive Science | Neuro Index',
  description: 'Read our latest articles on IQ scores, brain training, cognitive science, and how to improve your intelligence.',
}

const ARTICLES = [
  { slug: 'average-iq-by-state', title: 'Average IQ by US State', desc: 'Which states have the highest IQ scores? A data-driven breakdown of intelligence across America.', date: 'Feb 12, 2026', tag: 'Data' },
  { slug: 'what-is-a-good-iq-score', title: 'What Is a Good IQ Score?', desc: 'Understanding IQ ranges, what they mean, and how your score compares to the population.', date: 'Feb 8, 2026', tag: 'Guide' },
  { slug: 'can-you-raise-your-iq', title: 'Can You Raise Your IQ?', desc: 'Science-backed methods to improve your cognitive performance and boost your IQ score.', date: 'Feb 1, 2026', tag: 'Science' },
  { slug: 'iq-vs-eq', title: 'IQ vs EQ: Which Matters More?', desc: 'The debate between intelligence quotient and emotional intelligence — what the research says.', date: 'Jan 25, 2026', tag: 'Research' },
  { slug: 'brain-training-benefits', title: 'Brain Training Benefits', desc: 'Does brain training actually work? What cognitive science tells us about mental exercise.', date: 'Jan 18, 2026', tag: 'Training' },
  { slug: 'how-iq-is-measured', title: 'How IQ Is Measured', desc: 'The history and science behind IQ testing — from Binet to modern cognitive assessments.', date: 'Mar 1, 2026', tag: 'Science' },
  { slug: 'iq-and-success', title: 'Does IQ Predict Success?', desc: 'What research says about the relationship between IQ and career, income, and life outcomes.', date: 'Mar 2, 2026', tag: 'Research' },
  { slug: 'foods-that-boost-iq', title: '10 Foods That Boost Brain Power', desc: 'Nutrition science reveals which foods can improve memory, focus, and cognitive performance.', date: 'Mar 3, 2026', tag: 'Health' },
  { slug: 'sleep-and-iq', title: 'How Sleep Affects Your IQ', desc: 'The surprising connection between sleep quality and cognitive performance.', date: 'Mar 4, 2026', tag: 'Health' },
  { slug: 'famous-high-iq', title: 'Famous People With the Highest IQs', desc: 'From Einstein to Hawking — the most brilliant minds in history and their IQ scores.', date: 'Mar 5, 2026', tag: 'Culture' },
  { slug: 'what-is-iq', title: 'What Is IQ? Complete Guide', desc: 'Everything you need to know about IQ — what it measures, how it works, and what your score means.', date: 'Mar 6, 2026', tag: 'Guide' },
  { slug: 'iq-distribution', title: 'IQ Score Distribution Chart', desc: 'See exactly what percentage of the population has each IQ score range.', date: 'Mar 6, 2026', tag: 'Data' },
  { slug: 'genius-iq', title: 'What IQ Is Considered Genius?', desc: 'What score qualifies as genius? Learn about Mensa and genius-level IQ thresholds.', date: 'Mar 6, 2026', tag: 'Science' },
  { slug: 'iq-and-genetics', title: 'Is IQ Genetic?', desc: 'How much of your IQ is determined by genetics vs environment? The latest science.', date: 'Mar 6, 2026', tag: 'Research' },
  { slug: 'fluid-vs-crystallized', title: 'Fluid vs Crystallized Intelligence', desc: 'Two types of intelligence that change differently with age — and why it matters.', date: 'Mar 6, 2026', tag: 'Science' },
  { slug: 'exercise-and-iq', title: 'How Exercise Boosts Your IQ', desc: 'Scientific evidence that physical exercise measurably improves cognitive performance.', date: 'Mar 7, 2026', tag: 'Health' },
  { slug: 'music-and-iq', title: 'Does Music Training Increase IQ?', desc: 'The Mozart Effect explained — what science really says about music and intelligence.', date: 'Mar 7, 2026', tag: 'Culture' },
  { slug: 'bilingual-iq', title: 'Does Being Bilingual Make You Smarter?', desc: 'Research on bilingualism and cognitive performance. Does speaking two languages boost IQ?', date: 'Mar 7, 2026', tag: 'Research' },
  { slug: 'iq-by-country', title: 'Average IQ by Country', desc: 'Which countries have the highest average IQ? Complete global rankings with data.', date: 'Mar 7, 2026', tag: 'Data' },
  { slug: 'meditation-and-iq', title: 'Does Meditation Increase IQ?', desc: 'Can mindfulness meditation make you smarter? Science-backed results.', date: 'Mar 7, 2026', tag: 'Health' },
  { slug: 'iq-test-accuracy', title: 'How Accurate Are Online IQ Tests?', desc: 'What makes an IQ test reliable and how our test compares to clinical assessments.', date: 'Mar 7, 2026', tag: 'Guide' },
  { slug: 'iq-in-children', title: 'IQ in Children: Development & Giftedness', desc: 'How IQ develops in children, signs of giftedness, and how to support cognitive development.', date: 'Mar 7, 2026', tag: 'Guide' },
  { slug: 'iq-and-creativity', title: 'IQ and Creativity: Are Smart People More Creative?', desc: 'The threshold hypothesis and the surprising relationship between intelligence and creativity.', date: 'Mar 7, 2026', tag: 'Research' },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-14">
        <div className="text-center mb-12">
          <div className="section-label mx-auto w-fit mb-4">Blog</div>
          <h1 className="font-display font-bold text-5xl text-white mb-4">Intelligence & Brain Science</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Science-backed articles on IQ, cognition, and how to improve your mental performance.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {ARTICLES.map(({ slug, title, desc, date, tag }) => (
            <Link key={slug} href={'/blog/' + slug} className="card-hover p-6 group flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs px-2 py-1 rounded-lg font-semibold"
                  style={{ background: 'rgba(37,99,235,0.1)', color: '#60a5fa', border: '1px solid rgba(37,99,235,0.2)' }}>{tag}</span>
                <span className="text-slate-500 text-xs">{date}</span>
              </div>
              <h2 className="font-display font-bold text-lg text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{desc}</p>
              <div className="flex items-center gap-1 text-sm font-semibold text-blue-400">
                Read More <ChevronRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
