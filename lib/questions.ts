export type QuestionType = 'matrix' | 'pattern' | 'sequence' | 'odd' | 'rotation' | 'logic' | 'text'

export interface QuestionOption {
  text?: string
  image?: string
}

export interface Question {
  id: string
  question: string
  type: QuestionType
  category: 'pattern' | 'logic' | 'numerical' | 'spatial'
  weight: 1 | 2 | 3
  image?: string
  options: QuestionOption[]
  correctAnswer: number
  // legacy compat
  correct: number
}

export interface UserAnswer {
  questionId: string
  selectedOption: number
  isCorrect: boolean
}

const ALL_QUESTIONS: Question[] = [
  // ── MATRIX (6) ──────────────────────────────────────────
  {
    id: 'm1', type: 'matrix', category: 'spatial', weight: 2,
    question: 'Which figure completes the pattern?',
    image: '/questions/matrix/m1.svg',
    options: [
      { image: '/questions/matrix/m1_a.svg' },
      { image: '/questions/matrix/m1_b.svg' },
      { image: '/questions/matrix/m1_c.svg' },
      { image: '/questions/matrix/m1_d.svg' },
    ],
    correctAnswer: 0, correct: 0,
  },
  {
    id: 'm2', type: 'matrix', category: 'spatial', weight: 2,
    question: 'Select the missing piece to complete the matrix.',
    image: '/questions/matrix/m2.svg',
    options: [
      { image: '/questions/matrix/m2_a.svg' },
      { image: '/questions/matrix/m2_b.svg' },
      { image: '/questions/matrix/m2_c.svg' },
      { image: '/questions/matrix/m2_d.svg' },
    ],
    correctAnswer: 0, correct: 0,
  },
  {
    id: 'm3', type: 'matrix', category: 'spatial', weight: 3,
    question: 'Which option correctly completes the 3×3 grid?',
    image: '/questions/matrix/m3.svg',
    options: [
      { image: '/questions/matrix/m3_a.svg' },
      { image: '/questions/matrix/m3_b.svg' },
      { image: '/questions/matrix/m3_c.svg' },
      { image: '/questions/matrix/m3_d.svg' },
    ],
    correctAnswer: 2, correct: 2,
  },
  {
    id: 'm4', type: 'matrix', category: 'pattern', weight: 2,
    question: 'What number belongs in place of the question mark?\n\n3  6  9\n4  8  12\n5  ?  15',
    options: [{ text: '9' }, { text: '10' }, { text: '11' }, { text: '12' }],
    correctAnswer: 1, correct: 1,
  },
  {
    id: 'm5', type: 'matrix', category: 'numerical', weight: 2,
    question: 'Complete the matrix:\n\n2   4   8\n3   9   27\n4   16  ?',
    options: [{ text: '32' }, { text: '48' }, { text: '64' }, { text: '56' }],
    correctAnswer: 2, correct: 2,
  },
  {
    id: 'm6', type: 'matrix', category: 'pattern', weight: 3,
    question: 'Fill in the missing value:\n\n1  3  6\n2  6  12\n3  9  ?',
    options: [{ text: '15' }, { text: '16' }, { text: '18' }, { text: '27' }],
    correctAnswer: 2, correct: 2,
  },

  // ── PATTERN (5) ──────────────────────────────────────────
  {
    id: 'p1', type: 'pattern', category: 'pattern', weight: 1,
    question: 'What comes next in the sequence?',
    image: '/questions/patterns/p1.svg',
    options: [
      { text: 'Circle with radius 36' },
      { text: 'Circle with radius 42' },
      { text: 'Circle with radius 30' },
      { text: 'Circle with radius 38' },
    ],
    correctAnswer: 0, correct: 0,
  },
  {
    id: 'p2', type: 'pattern', category: 'pattern', weight: 1,
    question: 'Which figure continues this pattern?',
    image: '/questions/patterns/p2.svg',
    options: [
      { text: 'Square 60×60' },
      { text: 'Square 55×55' },
      { text: 'Square 65×65' },
      { text: 'Square 50×50' },
    ],
    correctAnswer: 0, correct: 0,
  },
  {
    id: 'p3', type: 'pattern', category: 'pattern', weight: 1,
    question: 'What is the next shape in the alternating pattern?',
    image: '/questions/patterns/p3.svg',
    options: [
      { text: 'Filled circle' },
      { text: 'Empty circle' },
      { text: 'Filled square' },
      { text: 'Empty square' },
    ],
    correctAnswer: 1, correct: 1,
  },
  {
    id: 'p4', type: 'pattern', category: 'pattern', weight: 2,
    question: 'Which shape comes next in the repeating sequence?',
    image: '/questions/patterns/p4.svg',
    options: [
      { text: 'Circle' },
      { text: 'Triangle' },
      { text: 'Pentagon' },
      { text: 'Square' },
    ],
    correctAnswer: 0, correct: 0,
  },
  {
    id: 'p5', type: 'pattern', category: 'spatial', weight: 3,
    question: 'Each group has one more dot than the last. How many dots come next?',
    image: '/questions/patterns/p5.svg',
    options: [{ text: '4' }, { text: '5' }, { text: '6' }, { text: '7' }],
    correctAnswer: 1, correct: 1,
  },

  // ── SEQUENCE (5) ──────────────────────────────────────────
  {
    id: 's1', type: 'sequence', category: 'numerical', weight: 1,
    question: 'What number continues this sequence?\n\n2, 4, 8, 16, __',
    options: [{ text: '24' }, { text: '28' }, { text: '32' }, { text: '36' }],
    correctAnswer: 2, correct: 2,
  },
  {
    id: 's2', type: 'sequence', category: 'numerical', weight: 2,
    question: 'Find the next number:\n\n1, 4, 9, 16, 25, __',
    options: [{ text: '30' }, { text: '34' }, { text: '36' }, { text: '49' }],
    correctAnswer: 2, correct: 2,
  },
  {
    id: 's3', type: 'sequence', category: 'numerical', weight: 2,
    question: 'What comes next?\n\n3, 7, 13, 21, 31, __',
    options: [{ text: '41' }, { text: '43' }, { text: '45' }, { text: '47' }],
    correctAnswer: 1, correct: 1,
  },
  {
    id: 's4', type: 'sequence', category: 'pattern', weight: 2,
    question: 'Which figure logically follows?\n\nTriangle → Square → Pentagon → Hexagon → __',
    options: [{ text: 'Heptagon (7 sides)' }, { text: 'Octagon (8 sides)' }, { text: 'Circle' }, { text: 'Pentagon' }],
    correctAnswer: 0, correct: 0,
  },
  {
    id: 's5', type: 'sequence', category: 'numerical', weight: 3,
    question: 'Complete the Fibonacci-like sequence:\n\n1, 1, 2, 3, 5, 8, 13, __',
    options: [{ text: '18' }, { text: '19' }, { text: '20' }, { text: '21' }],
    correctAnswer: 3, correct: 3,
  },

  // ── ODD-ONE-OUT (4) ──────────────────────────────────────
  {
    id: 'o1', type: 'odd', category: 'spatial', weight: 2,
    question: 'Three figures share a common rule. Which one does NOT belong?',
    options: [
      { image: '/questions/odd/o1_a.svg' },
      { image: '/questions/odd/o1_b.svg' },
      { image: '/questions/odd/o1_c.svg' },
      { image: '/questions/odd/o1_d.svg' },
    ],
    correctAnswer: 1, correct: 1,
  },
  {
    id: 'o2', type: 'odd', category: 'pattern', weight: 1,
    question: 'Which shape does not follow the same rule as the others?',
    options: [
      { image: '/questions/odd/o2_a.svg' },
      { image: '/questions/odd/o2_b.svg' },
      { image: '/questions/odd/o2_c.svg' },
      { image: '/questions/odd/o2_d.svg' },
    ],
    correctAnswer: 3, correct: 3,
  },
  {
    id: 'o3', type: 'odd', category: 'logic', weight: 2,
    question: 'Which word does not belong with the others?\n\nSonata · Symphony · Concerto · Novel · Overture',
    options: [
      { text: 'Sonata' },
      { text: 'Concerto' },
      { text: 'Novel' },
      { text: 'Overture' },
    ],
    correctAnswer: 2, correct: 2,
  },
  {
    id: 'o4', type: 'odd', category: 'logic', weight: 2,
    question: 'Which number does not fit?\n\n2, 3, 5, 7, 9, 11',
    options: [{ text: '3' }, { text: '7' }, { text: '9' }, { text: '11' }],
    correctAnswer: 2, correct: 2,
  },

  // ── ROTATION (4) ──────────────────────────────────────────
  {
    id: 'r1', type: 'rotation', category: 'spatial', weight: 2,
    question: 'The shape on the left is rotated 90° clockwise. Which answer shows the correct result?',
    image: '/questions/rotation/r1_orig.svg',
    options: [
      { image: '/questions/rotation/r1_a.svg' },
      { image: '/questions/rotation/r1_b.svg' },
      { image: '/questions/rotation/r1_c.svg' },
      { image: '/questions/rotation/r1_d.svg' },
    ],
    correctAnswer: 0, correct: 0,
  },
  {
    id: 'r2', type: 'rotation', category: 'spatial', weight: 2,
    question: 'Which option shows the original figure rotated 180°?',
    image: '/questions/rotation/r2_orig.svg',
    options: [
      { image: '/questions/rotation/r2_a.svg' },
      { image: '/questions/rotation/r2_b.svg' },
      { image: '/questions/rotation/r2_c.svg' },
      { image: '/questions/rotation/r2_d.svg' },
    ],
    correctAnswer: 0, correct: 0,
  },
  {
    id: 'r3', type: 'rotation', category: 'spatial', weight: 3,
    question: 'If the letter "F" is rotated 90° counterclockwise, what does it look like?',
    options: [
      { text: 'F facing left, top bar points down' },
      { text: 'F facing right, top bar points up' },
      { text: 'F upside down' },
      { text: 'Mirror image of F' },
    ],
    correctAnswer: 0, correct: 0,
  },
  {
    id: 'r4', type: 'rotation', category: 'spatial', weight: 2,
    question: 'A clock shows 3:00. After rotating the clock face 90° clockwise, what time does it show?',
    options: [{ text: '6:00' }, { text: '12:00' }, { text: '9:00' }, { text: '3:00' }],
    correctAnswer: 0, correct: 0,
  },

  // ── LOGIC / TEXT (6) ──────────────────────────────────────
  {
    id: 'l1', type: 'logic', category: 'logic', weight: 2,
    question: 'All roses are flowers.\nSome flowers fade quickly.\n\nWhich conclusion is certain?',
    options: [
      { text: 'Some roses fade quickly' },
      { text: 'All flowers are roses' },
      { text: 'Some roses are flowers' },
      { text: 'No roses fade quickly' },
    ],
    correctAnswer: 2, correct: 2,
  },
  {
    id: 'l2', type: 'logic', category: 'logic', weight: 2,
    question: 'If COLD is coded as DPME, what is the code for WARM?',
    options: [{ text: 'XBSN' }, { text: 'VBQM' }, { text: 'WASM' }, { text: 'XCSN' }],
    correctAnswer: 0, correct: 0,
  },
  {
    id: 'l3', type: 'text', category: 'logic', weight: 1,
    question: 'Which word is the odd one out?\n\nRapid · Swift · Sluggish · Hasty · Brisk',
    options: [
      { text: 'Rapid' },
      { text: 'Swift' },
      { text: 'Sluggish' },
      { text: 'Brisk' },
    ],
    correctAnswer: 2, correct: 2,
  },
  {
    id: 'l4', type: 'text', category: 'numerical', weight: 1,
    question: 'A train travels at 60 mph. How long does it take to cover 90 miles?',
    options: [{ text: '1 hour' }, { text: '1.5 hours' }, { text: '2 hours' }, { text: '45 minutes' }],
    correctAnswer: 1, correct: 1,
  },
  {
    id: 'l5', type: 'logic', category: 'logic', weight: 3,
    question: 'In a group of 5 people, each person shakes hands with every other person exactly once. How many handshakes occur?',
    options: [{ text: '8' }, { text: '10' }, { text: '12' }, { text: '20' }],
    correctAnswer: 1, correct: 1,
  },
  {
    id: 'l6', type: 'text', category: 'logic', weight: 2,
    question: 'Analogy:\nBook is to Library as Painting is to __',
    options: [{ text: 'Canvas' }, { text: 'Museum' }, { text: 'Artist' }, { text: 'Color' }],
    correctAnswer: 1, correct: 1,
  },
]

// Shuffle array
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function getRandomQuestions(count: number = 30): Question[] {
  // Ensure type variety by interleaving
  const byType: Record<string, Question[]> = {}
  for (const q of ALL_QUESTIONS) {
    if (!byType[q.type]) byType[q.type] = []
    byType[q.type].push(q)
  }
  Object.keys(byType).forEach(k => { byType[k] = shuffle(byType[k]) })

  // Interleave: matrix, logic, pattern, sequence, rotation, odd, text, repeat
  const order = ['matrix', 'logic', 'pattern', 'sequence', 'rotation', 'odd', 'text', 'matrix', 'logic', 'pattern', 'sequence', 'rotation', 'matrix', 'logic', 'pattern', 'sequence', 'odd', 'logic', 'text', 'rotation', 'matrix', 'numerical', 'logic', 'pattern', 'sequence', 'odd', 'logic', 'text', 'matrix', 'rotation']
  const used = new Set<string>()
  const result: Question[] = []

  for (const type of order) {
    if (result.length >= count) break
    const pool = byType[type] || byType['logic'] || []
    const q = pool.find(q => !used.has(q.id))
    if (q) { used.add(q.id); result.push(q) }
  }

  // Fill remaining with shuffled unused
  const remaining = shuffle(ALL_QUESTIONS.filter(q => !used.has(q.id)))
  for (const q of remaining) {
    if (result.length >= count) break
    result.push(q)
  }

  return result.slice(0, count)
}
