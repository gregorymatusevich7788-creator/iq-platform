# Neuro Index — Project Context

## What is this
IQ test SaaS targeting US market (18-45). Funnel: Homepage → Test → Analyzing → Unlock (payment) → Results → Certificate → Games.

## Stack
Next.js 14 App Router, TypeScript strict, Tailwind CSS, Supabase, Vercel

## Deploy
cd ~/iq-platform && npm run build && vercel --prod

## Design System
- Background: #060d1f (dark premium — NEVER change to light)
- Card background: #0a1628
- Primary blue: #3b82f6, #1d4ed8
- Fonts: Syne (headings, bold), DM Sans (body)
- Border radius: rounded-xl, rounded-2xl
- All animations: fadeUp, shimmer, pulse — CSS only, no libraries

## Business Rules — NEVER VIOLATE
- NO prices anywhere in UI (not $0.70, not $49.90, nothing)
- IQ score NEVER shown before payment
- Payment mocked via localStorage (Stripe not yet integrated)
- Use hasAccess(sessionId) from @/lib/payment for all access checks
- Use grantAccess(sessionId) from @/lib/payment on successful payment
- TypeScript strict — zero errors, zero 'any'

## Key Files
- app/page.tsx — Homepage
- app/test/page.tsx — IQ Test (30 questions)
- app/test/analyzing/page.tsx — Analyzing screen (10 seconds)
- app/unlock/page.tsx — Payment page (MOST IMPORTANT)
- app/results/[sessionId]/page.tsx — Results (Testora mechanics)
- app/certificate/[sessionId]/page.tsx — AI Certificate
- app/games/page.tsx — 6 Brain games (locked)
- lib/payment.ts — hasAccess, grantAccess, revokeAccess
- lib/questions.ts — getIQCategory, getIQCategoryColor
- components/Navbar.tsx — Navigation
- components/Footer.tsx — Footer

## Conversion Psychology (Testora model)
- IQ score hidden behind paywall — creates maximum FOMO
- Countdown timer on unlock page
- "Your results expire" loss aversion
- Monroe/Einstein comparison visual on results page
- No prices shown until checkout form
