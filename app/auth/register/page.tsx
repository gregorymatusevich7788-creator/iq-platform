'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Brain, Lock, Mail, User, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (form.password.length < 6) { setError('Min. 6 characters'); return }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: { full_name: form.name } },
    })
    if (error) { setError(error.message); setLoading(false) }
    else setSuccess(true)
  }

  if (success) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card p-10 max-w-md w-full text-center">
        <div className="text-5xl mb-4">📧</div>
        <h2 className="font-display font-bold text-2xl text-white mb-3">Check your email!</h2>
        <p className="text-slate-400 text-sm mb-6">Confirmation link sent to <strong className="text-white">{form.email}</strong></p>
        <Link href="/auth/login" className="btn-primary w-full justify-center">Go to Login</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(37,99,235,0.12) 0%, transparent 65%)' }} />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', boxShadow: '0 0 20px rgba(37,99,235,0.4)' }}>
              <Brain size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">Cerebrum Index</span>
          </Link>
          <h1 className="font-display font-bold text-3xl text-white mb-2">Create account</h1>
          <p className="text-slate-400 text-sm">Free forever · No credit card required</p>
        </div>
        <div className="card p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-slate-500 text-xs uppercase tracking-widest mb-1.5 block">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="input pl-10" placeholder="John Smith" />
              </div>
            </div>
            <div>
              <label className="text-slate-500 text-xs uppercase tracking-widest mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="input pl-10" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="text-slate-500 text-xs uppercase tracking-widest mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                <input type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  className="input pl-10 pr-10" placeholder="Min. 6 characters" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-slate-500 text-xs uppercase tracking-widest mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                <input type={showPass ? 'text' : 'password'} required value={form.confirm}
                  onChange={e => setForm({...form, confirm: e.target.value})}
                  className="input pl-10" placeholder="Repeat password" />
              </div>
            </div>
            {error && (
              <div className="p-3 rounded-xl text-sm text-red-400"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</div>
            )}
            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl font-display font-bold text-sm uppercase tracking-widest text-white flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', boxShadow: '0 0 20px rgba(37,99,235,0.3)' }}>
              {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating...</> : 'Create Free Account'}
            </button>
          </form>
          <p className="text-center text-slate-500 text-sm mt-6">
            Already have account?{' '}
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
