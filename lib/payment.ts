export type PaymentStatus = "free" | "trial" | "paid"

const KEY = (sessionId: string) => `neuro_paid_${sessionId}`

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

export function hasAccess(sessionId: string): boolean {
  if (!sessionId || !isBrowser()) return false
  try {
    return localStorage.getItem(KEY(sessionId)) === 'true' ||
           localStorage.getItem('iq_unlocked') === 'true'
  } catch { return false }
}

export function grantAccess(sessionId: string): void {
  if (!sessionId || !isBrowser()) return
  try {
    localStorage.setItem(KEY(sessionId), 'true')
    localStorage.setItem('iq_unlocked', 'true')
    document.cookie = 'iq_unlocked=true; path=/; max-age=2592000'
  } catch {}
}

export function revokeAccess(sessionId: string): void {
  if (!sessionId || !isBrowser()) return
  try {
    localStorage.removeItem(KEY(sessionId))
    localStorage.removeItem('iq_unlocked')
    document.cookie = 'iq_unlocked=; path=/; max-age=0'
  } catch {}
}

export function getPaymentStatus(sessionId: string): PaymentStatus {
  if (!sessionId || !isBrowser()) return "free"
  try {
    return localStorage.getItem(KEY(sessionId)) === 'true' ? "paid" : "free"
  } catch { return "free" }
}
