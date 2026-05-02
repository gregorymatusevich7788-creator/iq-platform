import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, sessionId } = await req.json()
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) return NextResponse.json({ success: true })

    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'Neuro Index <noreply@neuro-index.com>',
      to: email,
      subject: 'Your IQ Results Are Ready 🧠',
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#060d1f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#060d1f;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#0a1628;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">
        
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);padding:24px 32px;text-align:center;">
          <div style="font-size:28px;margin-bottom:8px;">🧠</div>
          <div style="color:white;font-size:20px;font-weight:700;letter-spacing:0.5px;">Neuro Index</div>
        </td></tr>
        
        <!-- Body -->
        <tr><td style="padding:32px;">
          <h1 style="color:white;font-size:22px;font-weight:700;margin:0 0 16px;text-align:center;line-height:1.3;">
            Your cognitive analysis is complete
          </h1>
          <p style="color:#94a3b8;font-size:15px;line-height:1.6;text-align:center;margin:0 0 32px;">
            Congratulations! You've completed the Neuro Index IQ test.<br>
            Your personalized cognitive report is ready to view.
          </p>
          
          <!-- CTA Button -->
          <div style="text-align:center;margin-bottom:32px;">
            <a href="https://neuro-index.vercel.app/results/${sessionId}"
              style="display:inline-block;background:#3b82f6;color:white;text-decoration:none;font-size:16px;font-weight:700;padding:14px 32px;border-radius:12px;letter-spacing:0.3px;">
              View My Results →
            </a>
          </div>

          <!-- Features -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            ${['🎯 Your exact IQ score + percentile rank', '📊 Full cognitive breakdown across 4 domains', '🏆 Printable AI-verified certificate', '🎮 Access to all 6 brain training games'].map(f => `
            <tr><td style="padding:8px 0;color:#94a3b8;font-size:14px;">
              <span style="color:#10b981;margin-right:8px;">✓</span>${f}
            </td></tr>`).join('')}
          </table>

          <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;text-align:center;">
            <p style="color:#64748b;font-size:13px;margin:0 0 12px;">
              Questions? Contact us at <a href="mailto:support@neuro-index.com" style="color:#3b82f6;text-decoration:none;">support@neuro-index.com</a>
            </p>
            <p style="margin:0;">
              <a href="https://neuro-index.vercel.app/privacy" style="color:#64748b;font-size:12px;text-decoration:none;margin:0 8px;">Privacy Policy</a>
              <span style="color:#334155;">·</span>
              <a href="https://neuro-index.vercel.app/terms" style="color:#64748b;font-size:12px;text-decoration:none;margin:0 8px;">Terms of Service</a>
            </p>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:rgba(0,0,0,0.2);padding:16px 32px;text-align:center;">
          <p style="color:#334155;font-size:12px;margin:0;">© 2026 Neuro Index. All rights reserved.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: true })
  }
}
