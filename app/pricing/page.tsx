import Link from 'next/link'
import { Lock, ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Pricing — Cerebrum Index',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)' }}>
          <Lock size={24} style={{ color: '#3b82f6' }} />
        </div>
        <h1 className="font-display font-bold text-5xl text-white mb-4">Coming Soon</h1>
        <p className="text-slate-400 text-lg mb-8">
          We&apos;re setting up our premium plans. Take the free IQ test now and unlock your results when we launch.
        </p>
        <Link href="/test" className="btn-primary">
          Take the Free Test First <ChevronRight size={16} />
        </Link>
      </main>
      <Footer />
    </div>
  )
}
