const { createCanvas } = require('canvas')
const fs = require('fs')
const path = require('path')

const width = 1200
const height = 630
const canvas = createCanvas(width, height)
const ctx = canvas.getContext('2d')

// Background
ctx.fillStyle = '#060d1f'
ctx.fillRect(0, 0, width, height)

// Accent gradient
const gradient = ctx.createLinearGradient(0, 0, width, height)
gradient.addColorStop(0, 'rgba(59,130,246,0.25)')
gradient.addColorStop(1, 'rgba(99,102,241,0.08)')
ctx.fillStyle = gradient
ctx.fillRect(0, 0, width, height)

// Subtle grid lines
ctx.strokeStyle = 'rgba(59,130,246,0.06)'
ctx.lineWidth = 1
for (let x = 0; x < width; x += 80) {
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke()
}
for (let y = 0; y < height; y += 80) {
  ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
}

// Glow circle
const glow = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, 300)
glow.addColorStop(0, 'rgba(59,130,246,0.15)')
glow.addColorStop(1, 'rgba(59,130,246,0)')
ctx.fillStyle = glow
ctx.fillRect(0, 0, width, height)

// Brain emoji
ctx.font = '96px Sans'
ctx.textAlign = 'center'
ctx.fillText('🧠', width/2, height/2 - 100)

// Blue accent line above title
ctx.strokeStyle = '#3b82f6'
ctx.lineWidth = 3
ctx.beginPath()
ctx.moveTo(width/2 - 60, height/2 - 30)
ctx.lineTo(width/2 + 60, height/2 - 30)
ctx.stroke()

// Title
ctx.fillStyle = '#ffffff'
ctx.font = 'bold 80px Sans'
ctx.textAlign = 'center'
ctx.fillText('Neuro Index', width/2, height/2 + 50)

// Subtitle
ctx.fillStyle = '#94a3b8'
ctx.font = '34px Sans'
ctx.fillText('Test Your IQ in 20 Minutes — Free', width/2, height/2 + 110)

// Trust badge
ctx.fillStyle = 'rgba(59,130,246,0.15)'
const badgeW = 420, badgeH = 44, badgeX = width/2 - badgeW/2, badgeY = height/2 + 150
ctx.beginPath()
ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 22)
ctx.fill()
ctx.strokeStyle = 'rgba(59,130,246,0.4)'
ctx.lineWidth = 1.5
ctx.stroke()
ctx.fillStyle = '#93bbff'
ctx.font = '18px Sans'
ctx.fillText('Trusted by 2,847,293 Americans', width/2, badgeY + 29)

// Save
const outputPath = path.join(process.env.HOME, 'iq-platform/public/og-image.png')
const buffer = canvas.toBuffer('image/png')
fs.writeFileSync(outputPath, buffer)
console.log('✅ OG image saved:', outputPath)
