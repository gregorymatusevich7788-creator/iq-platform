'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#060d1f' }}>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs text-blue-400 font-semibold tracking-wide">LEGAL</span>
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-3">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Last updated: March 2026</p>
        </div>

        <div className="space-y-8 text-slate-400 text-sm leading-relaxed">
          {[
            { title: '1. Acceptance of Terms', content: 'By accessing and using Neuro Index, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.' },
            { title: '2. Description of Service', content: 'Neuro Index provides an online IQ testing platform, cognitive analysis, AI-generated certificates, and brain training games. The test is designed for entertainment and self-assessment purposes and should not be used as a substitute for professional psychological evaluation.' },
            { title: '3. Subscription & Billing', content: 'We offer a 2-day trial for $0.70, after which your subscription automatically renews at $49.90/month. You can cancel at any time before the trial ends to avoid being charged. Cancellations must be made by emailing support@neuro-index.com. No refunds are issued for partial subscription periods.' },
            { title: '4. Free Trial', content: 'The $0.70 trial gives you full access to all features for 2 days. At the end of the trial period, if you have not cancelled, your payment method will be charged $49.90/month automatically. You may cancel at any time during the trial with no charge beyond the initial $0.70.' },
            { title: '5. Cancellation Policy', content: 'You may cancel your subscription at any time by emailing support@neuro-index.com. Cancellations take effect immediately. We do not offer refunds for unused subscription periods after the trial ends.' },
            { title: '6. Accuracy of Results', content: 'Our IQ test is designed to provide an estimate of cognitive ability and is not a clinically validated psychological assessment. Results are for informational and entertainment purposes only. We do not guarantee the accuracy of any IQ score produced by our platform.' },
            { title: '7. User Conduct', content: 'You agree not to misuse our services, attempt to access unauthorized areas, reverse engineer our software, or use our platform for any unlawful purpose. We reserve the right to terminate accounts that violate these terms.' },
            { title: '8. Intellectual Property', content: 'All content on Neuro Index, including test questions, designs, logos, and AI-generated content, is owned by or licensed to Neuro Index. You may not reproduce, distribute, or create derivative works without our express written permission.' },
            { title: '9. Limitation of Liability', content: 'Neuro Index shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our service. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.' },
            { title: '10. Contact', content: 'For any questions regarding these Terms of Service, please contact us at support@neuro-index.com.' },
          ].map(({ title, content }) => (
            <div key={title} className="rounded-2xl p-6" style={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h2 className="font-display font-bold text-white text-lg mb-3">{title}</h2>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
