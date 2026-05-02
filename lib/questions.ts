export type QuestionCategory = 'pattern' | 'logic' | 'numerical' | 'spatial'

export interface Question {
  id: number
  category: QuestionCategory
  weight: number // 1=easy, 2=medium, 3=hard
  question: string
  options: string[]
  correct: number // index 0-3
  explanation: string
}

export const QUESTIONS: Question[] = [
  // ── PATTERN RECOGNITION ──────────────────────────────────────
  {
    id: 1, category: 'pattern', weight: 1,
    question: 'What number comes next in the sequence?\n2, 4, 8, 16, ___',
    options: ['24', '32', '28', '36'],
    correct: 1,
    explanation: 'Each number is doubled: 2×2=4, 4×2=8, 8×2=16, 16×2=32.',
  },
  {
    id: 2, category: 'pattern', weight: 1,
    question: 'What comes next?\n1, 4, 9, 16, 25, ___',
    options: ['30', '35', '36', '49'],
    correct: 2,
    explanation: 'These are perfect squares: 1², 2², 3², 4², 5², 6²=36.',
  },
  {
    id: 3, category: 'pattern', weight: 2,
    question: 'Complete the sequence:\n3, 7, 15, 31, 63, ___',
    options: ['125', '127', '131', '120'],
    correct: 1,
    explanation: 'Each term is doubled and 1 added: (3×2)+1=7, (7×2)+1=15... (63×2)+1=127.',
  },
  {
    id: 4, category: 'pattern', weight: 2,
    question: 'Find the missing number:\n5, 10, 20, 40, ___',
    options: ['60', '70', '80', '100'],
    correct: 2,
    explanation: 'Each number is multiplied by 2: 40×2=80.',
  },
  {
    id: 5, category: 'pattern', weight: 2,
    question: 'What is next in the series?\n1, 1, 2, 3, 5, 8, 13, ___',
    options: ['18', '20', '21', '24'],
    correct: 2,
    explanation: 'Fibonacci sequence: each number equals the sum of the two preceding ones. 8+13=21.',
  },
  {
    id: 6, category: 'pattern', weight: 2,
    question: 'Complete the pattern:\n144, 121, 100, 81, ___',
    options: ['72', '64', '60', '49'],
    correct: 1,
    explanation: 'Perfect squares in descending order: 12², 11², 10², 9², 8²=64.',
  },
  {
    id: 7, category: 'pattern', weight: 3,
    question: 'What comes next?\n2, 3, 5, 7, 11, 13, 17, ___',
    options: ['18', '19', '21', '23'],
    correct: 1,
    explanation: 'These are prime numbers. The next prime after 17 is 19.',
  },
  {
    id: 8, category: 'pattern', weight: 3,
    question: 'Find the missing value:\n6, 11, 21, 36, 56, ___',
    options: ['76', '81', '91', '101'],
    correct: 1,
    explanation: 'Differences are 5, 10, 15, 20, 25. So 56+25=81.',
  },
  {
    id: 9, category: 'pattern', weight: 3,
    question: 'Complete the series:\n1, 8, 27, 64, ___',
    options: ['100', '108', '125', '135'],
    correct: 2,
    explanation: 'Cubed numbers: 1³, 2³, 3³, 4³, 5³=125.',
  },
  {
    id: 10, category: 'pattern', weight: 3,
    question: 'What is next?\n2, 6, 12, 20, 30, 42, ___',
    options: ['52', '54', '56', '60'],
    correct: 2,
    explanation: 'Differences are 4, 6, 8, 10, 12, 14. So 42+14=56.',
  },

  // ── LOGICAL REASONING ─────────────────────────────────────────
  {
    id: 11, category: 'logic', weight: 1,
    question: 'All roses are flowers. Some flowers fade quickly. Therefore:',
    options: [
      'All roses fade quickly',
      'Some roses may fade quickly',
      'No roses fade quickly',
      'All flowers are roses',
    ],
    correct: 1,
    explanation: 'Since only "some" flowers fade, we can only conclude some roses might.',
  },
  {
    id: 12, category: 'logic', weight: 1,
    question: 'If all Bloops are Razzles and all Razzles are Lazzles, then:',
    options: [
      'All Razzles are Bloops',
      'All Lazzles are Bloops',
      'All Bloops are Lazzles',
      'Some Bloops are not Lazzles',
    ],
    correct: 2,
    explanation: 'Bloops→Razzles→Lazzles, so by transitivity, all Bloops are Lazzles.',
  },
  {
    id: 13, category: 'logic', weight: 2,
    question: 'Anna is taller than Beth. Carol is shorter than Anna. Beth is taller than Carol. Who is the tallest?',
    options: ['Beth', 'Carol', 'Anna', 'Cannot determine'],
    correct: 2,
    explanation: 'Anna > Beth > Carol, so Anna is tallest.',
  },
  {
    id: 14, category: 'logic', weight: 2,
    question: 'If it takes 5 machines 5 minutes to make 5 widgets, how long does it take 100 machines to make 100 widgets?',
    options: ['100 minutes', '50 minutes', '5 minutes', '10 minutes'],
    correct: 2,
    explanation: 'Each machine makes 1 widget in 5 minutes regardless of how many machines run simultaneously.',
  },
  {
    id: 15, category: 'logic', weight: 2,
    question: 'Some doctors are teachers. All teachers are honest. Therefore:',
    options: [
      'All doctors are honest',
      'Some doctors are honest',
      'No doctors are honest',
      'All honest people are doctors',
    ],
    correct: 1,
    explanation: 'Since some doctors are teachers, and all teachers are honest, those doctor-teachers are honest.',
  },
  {
    id: 16, category: 'logic', weight: 3,
    question: 'A man builds a house with all 4 sides facing south. A bear walks by. What color is the bear?',
    options: ['Brown', 'Black', 'White', 'Gray'],
    correct: 2,
    explanation: 'Only possible if the house is at the North Pole — where only polar (white) bears live.',
  },
  {
    id: 17, category: 'logic', weight: 3,
    question: 'If you rearrange the letters "CIFAIPC" you would have:',
    options: ['A city', 'An ocean', 'A country', 'A planet'],
    correct: 1,
    explanation: 'CIFAIPC rearranged = PACIFIC — an ocean.',
  },
  {
    id: 18, category: 'logic', weight: 3,
    question: 'There are 6 apples. You take away 4. How many apples do YOU have?',
    options: ['2', '6', '4', '0'],
    correct: 2,
    explanation: 'You took 4 apples, so you personally have 4.',
  },

  // ── NUMERICAL REASONING ───────────────────────────────────────
  {
    id: 19, category: 'numerical', weight: 1,
    question: 'What is 15% of 240?',
    options: ['36', '40', '38', '42'],
    correct: 0,
    explanation: '240 × 0.15 = 36.',
  },
  {
    id: 20, category: 'numerical', weight: 1,
    question: 'If a shirt costs $45 and is discounted 20%, what is the sale price?',
    options: ['$38', '$36', '$34', '$40'],
    correct: 1,
    explanation: '20% of $45 = $9. $45 − $9 = $36.',
  },
  {
    id: 21, category: 'numerical', weight: 2,
    question: 'A car travels 240 miles in 4 hours. How far will it travel in 6 hours at the same speed?',
    options: ['300 miles', '340 miles', '360 miles', '380 miles'],
    correct: 2,
    explanation: 'Speed = 240/4 = 60 mph. Distance = 60 × 6 = 360 miles.',
  },
  {
    id: 22, category: 'numerical', weight: 2,
    question: 'What is the average of 14, 18, 22, 26, 30?',
    options: ['20', '22', '24', '26'],
    correct: 1,
    explanation: '(14+18+22+26+30) = 110. 110 ÷ 5 = 22.',
  },
  {
    id: 23, category: 'numerical', weight: 2,
    question: 'If 3 workers can complete a job in 12 days, how long will 6 workers take?',
    options: ['4 days', '6 days', '8 days', '9 days'],
    correct: 1,
    explanation: 'Total work = 3×12=36 worker-days. 36 ÷ 6 = 6 days.',
  },
  {
    id: 24, category: 'numerical', weight: 3,
    question: 'What is the next number: 1, 2, 6, 24, 120, ___?',
    options: ['240', '600', '720', '360'],
    correct: 2,
    explanation: 'Factorials: 1!, 2!, 3!, 4!, 5!, 6!=720.',
  },

  // ── SPATIAL REASONING ─────────────────────────────────────────
  {
    id: 25, category: 'spatial', weight: 1,
    question: 'How many sides does a hexagon have?',
    options: ['5', '6', '7', '8'],
    correct: 1,
    explanation: 'A hexagon has 6 sides. "Hex" means six in Greek.',
  },
  {
    id: 26, category: 'spatial', weight: 1,
    question: 'If you fold a square piece of paper in half twice and cut a corner, how many holes appear when unfolded?',
    options: ['1', '2', '4', '3'],
    correct: 2,
    explanation: 'Each fold doubles the effect, so two folds create 4 holes from one cut.',
  },
  {
    id: 27, category: 'spatial', weight: 2,
    question: 'A cube has how many edges?',
    options: ['8', '10', '12', '16'],
    correct: 2,
    explanation: 'A cube has 12 edges: 4 on top, 4 on bottom, 4 connecting them.',
  },
  {
    id: 28, category: 'spatial', weight: 2,
    question: 'If you look at a clock at 3:15, what is the angle between the hour and minute hands?',
    options: ['0°', '7.5°', '15°', '22.5°'],
    correct: 1,
    explanation: 'At 3:00 angle=90°. At 3:15 minute hand=90°, hour hand=97.5°. Difference=7.5°.',
  },
  {
    id: 29, category: 'spatial', weight: 3,
    question: 'Which 3D shape has exactly 5 faces, 8 edges, and 5 vertices?',
    options: ['Cube', 'Triangular prism', 'Square pyramid', 'Tetrahedron'],
    correct: 2,
    explanation: 'A square pyramid has 1 square base + 4 triangular faces = 5 faces, 8 edges, 5 vertices.',
  },
  {
    id: 30, category: 'spatial', weight: 3,
    question: 'If a rectangle has a perimeter of 40cm and a width of 8cm, what is its area?',
    options: ['96 cm²', '104 cm²', '112 cm²', '120 cm²'],
    correct: 0,
    explanation: 'Perimeter=2(l+w). 40=2(l+8), l=12. Area=12×8=96 cm².',
  },
]

// ── SCORING ALGORITHM ─────────────────────────────────────────────────────────

export interface UserAnswer {
  questionId: number
  selectedOption: number
  isCorrect: boolean
  timeSpent?: number
}

export interface IQResult {
  iq: number
  percentile: number
  category: string
  patternScore: number
  logicScore: number
  numericalScore: number
  spatialScore: number
  correctCount: number
  totalQuestions: number
  timeTaken: number
}

export function calculateIQ(answers: UserAnswer[], timeTakenSeconds: number): IQResult {
  const byCategory = {
    pattern: { correct: 0, total: 0, weight: 0, totalWeight: 0 },
    logic: { correct: 0, total: 0, weight: 0, totalWeight: 0 },
    numerical: { correct: 0, total: 0, weight: 0, totalWeight: 0 },
    spatial: { correct: 0, total: 0, weight: 0, totalWeight: 0 },
  }

  let totalWeight = 0
  let earnedWeight = 0
  let correctCount = 0

  answers.forEach((answer) => {
    const q = QUESTIONS.find((q) => q.id === answer.questionId)
    if (!q) return
    const cat = byCategory[q.category]
    cat.total++
    cat.totalWeight += q.weight
    totalWeight += q.weight
    if (answer.isCorrect) {
      cat.correct++
      cat.weight += q.weight
      earnedWeight += q.weight
      correctCount++
    }
  })

  // Raw score 0-100
  const rawScore = totalWeight > 0 ? (earnedWeight / totalWeight) * 100 : 50

  // Time bonus (max 5 points if completed under 15 min)
  const timeBonus = timeTakenSeconds < 900 ? ((900 - timeTakenSeconds) / 900) * 5 : 0

  // Normalize to IQ scale (mean=100, SD=15)
  // rawScore of 50 → IQ 100
  const zScore = (rawScore - 50) / 18
  const rawIQ = Math.round(100 + zScore * 15 + timeBonus)
  const iq = Math.max(70, Math.min(145, rawIQ))

  // Category scores (0-100)
  const catScore = (c: typeof byCategory.pattern) =>
    c.totalWeight > 0 ? Math.round((c.weight / c.totalWeight) * 100) : 0

  return {
    iq,
    percentile: calculatePercentile(iq),
    category: getIQCategory(iq),
    patternScore: catScore(byCategory.pattern),
    logicScore: catScore(byCategory.logic),
    numericalScore: catScore(byCategory.numerical),
    spatialScore: catScore(byCategory.spatial),
    correctCount,
    totalQuestions: answers.length,
    timeTaken: timeTakenSeconds,
  }
}

export function calculatePercentile(iq: number): number {
  // Normal distribution approximation
  const mean = 100
  const sd = 15
  const z = (iq - mean) / sd
  const percentile = normalCDF(z) * 100
  return Math.round(Math.max(1, Math.min(99, percentile)))
}

function normalCDF(z: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
  const sign = z < 0 ? -1 : 1
  const x = Math.abs(z) / Math.sqrt(2)
  const t = 1 / (1 + p * x)
  const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x))
  return 0.5 * (1 + sign * y)
}

export function getIQCategory(iq: number): string {
  if (iq >= 145) return 'Genius'
  if (iq >= 130) return 'Gifted'
  if (iq >= 115) return 'Above Average'
  if (iq >= 85) return 'Average'
  if (iq >= 70) return 'Below Average'
  return 'Low'
}

export function getIQCategoryColor(iq: number): string {
  if (iq >= 130) return '#f59e0b'
  if (iq >= 115) return '#10b981'
  if (iq >= 85) return '#3b82f6'
  if (iq >= 70) return '#f97316'
  return '#ef4444'
}

export const EXTRA_QUESTIONS: Question[] = []
export const ALL_QUESTIONS = [...QUESTIONS, ...EXTRA_QUESTIONS]
export function getRandomQuestions(count: number = 30): Question[] {
  const byCategory: Record<string, Question[]> = {}
  for (const q of ALL_QUESTIONS) {
    if (!byCategory[q.category]) byCategory[q.category] = []
    byCategory[q.category].push(q)
  }
  const perCategory = Math.floor(count / 4)
  const selected: Question[] = []
  for (const cat of ['pattern', 'logic', 'numerical', 'spatial']) {
    const pool = [...(byCategory[cat] || [])]
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]]
    }
    selected.push(...pool.slice(0, perCategory))
  }
  const used = new Set(selected.map(q => q.id))
  const rest = ALL_QUESTIONS.filter(q => !used.has(q.id))
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]]
  }
  selected.push(...rest.slice(0, count - selected.length))
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]]
  }
  return selected
}