import { MetadataRoute } from 'next'

const BASE = 'https://neuro-index.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const mainPages = [
    { url: BASE, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${BASE}/test`, priority: 0.95, changeFrequency: 'weekly' as const },
    { url: `${BASE}/blog`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${BASE}/rankings`, priority: 0.8, changeFrequency: 'hourly' as const },
    { url: `${BASE}/games`, priority: 0.8, changeFrequency: 'weekly' as const },
  ]

  const blogPosts = [
    'what-is-a-good-iq-score', 'can-you-raise-your-iq', 'iq-vs-eq',
    'brain-training-benefits', 'how-iq-is-measured', 'iq-and-success',
    'foods-that-boost-iq', 'sleep-and-iq', 'famous-high-iq',
    'average-iq-by-state', 'what-is-iq', 'iq-distribution',
    'genius-iq', 'iq-and-genetics', 'fluid-vs-crystallized',
    'exercise-and-iq', 'music-and-iq', 'bilingual-iq',
    'iq-by-country', 'meditation-and-iq', 'iq-test-accuracy',
    'iq-in-children', 'iq-and-creativity',
  ].map(slug => ({
    url: `${BASE}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  const seoPages = [
    'iq-test-by-age', 'iq-test-by-state', 'iq-score-chart',
    'free-iq-test', 'iq-test-for-adults', 'what-is-my-iq',
    'accurate-iq-test',
  ].map(slug => ({
    url: `${BASE}/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  return [...mainPages, ...blogPosts, ...seoPages].map(page => ({
    ...page,
    lastModified: now,
  }))
}
