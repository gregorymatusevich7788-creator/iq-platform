import type { Metadata } from 'next'
import './globals.css'

const BASE_URL = 'https://neuro-index.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Free IQ Test Online — Accurate Results in 20 Minutes | Neuro Index',
    template: '%s | Neuro Index',
  },
  description: 'Take our free certified IQ test online. Get instant results, see your percentile, and compare your score to 2 million Americans. 30 questions, scientifically validated.',
  keywords: [
    'free IQ test', 'online IQ test', 'IQ score', 'intelligence test',
    'certified IQ test', 'IQ quiz', 'IQ test online free', 'real IQ test',
    'accurate IQ test', 'IQ score test', 'quick IQ test', 'what is my IQ',
    'IQ test for adults', 'free intelligence test', 'brain test online',
    'cognitive ability test', 'IQ percentile', 'genius IQ test',
  ],
  authors: [{ name: 'Neuro Index', url: BASE_URL }],
  creator: 'Neuro Index',
  publisher: 'Neuro Index',
  category: 'Education',
  classification: 'Educational Assessment',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'Free IQ Test Online — Neuro Index',
    description: 'Discover your true IQ score in 20 minutes. Scientifically validated, trusted by 2M+ Americans. Free, instant results.',
    type: 'website',
    url: BASE_URL,
    siteName: 'Neuro Index',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Neuro Index — Free IQ Test Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free IQ Test Online — Neuro Index',
    description: 'Discover your true IQ score in 20 minutes. Free, scientifically validated.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'sFapcmySD3vuBmhTKZ3Hu4WypfwF4tCH-P-C9cjwKmc',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Neuro Index',
    'mobile-web-app-capable': 'yes',
    'format-detection': 'telephone=no',
  },
}

const jsonLdWebApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Neuro Index IQ Test',
  url: BASE_URL,
  description: 'Free online IQ test with instant results. Scientifically validated, 30 questions across 4 cognitive domains.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '14293',
    bestRating: '5',
    worstRating: '1',
  },
  featureList: [
    '30 scientifically validated questions',
    'Results in under 20 minutes',
    'IQ score with percentile ranking',
    'Pattern recognition assessment',
    'Logical reasoning assessment',
    'Numerical ability assessment',
    'Spatial reasoning assessment',
  ],
}

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Neuro Index',
  url: BASE_URL,
  logo: `${BASE_URL}/icon.png`,
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: 'English',
  },
}

const jsonLdFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this IQ test free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, the full 30-question IQ test is completely free to take with instant results.' },
    },
    {
      '@type': 'Question',
      name: 'How accurate is this online IQ test?',
      acceptedAnswer: { '@type': 'Answer', text: 'Our test correlates strongly with professionally administered IQ tests and uses validated psychometric methods including item response theory.' },
    },
    {
      '@type': 'Question',
      name: 'How long does the IQ test take?',
      acceptedAnswer: { '@type': 'Answer', text: 'The test takes approximately 15-20 minutes to complete with 30 questions across 4 cognitive domains.' },
    },
    {
      '@type': 'Question',
      name: 'What is the average IQ score?',
      acceptedAnswer: { '@type': 'Answer', text: 'The average IQ score is 100. About 68% of people score between 85 and 115.' },
    },
    {
      '@type': 'Question',
      name: 'What does IQ measure?',
      acceptedAnswer: { '@type': 'Answer', text: 'IQ tests measure cognitive abilities including pattern recognition, logical reasoning, numerical ability, and spatial reasoning.' },
    },
    {
      '@type': 'Question',
      name: 'Can I take the IQ test on my phone?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, Neuro Index is fully optimized for mobile devices including iPhone, Android, and tablets.' },
    },
  ],
}

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'IQ Test', item: `${BASE_URL}/test` },
    { '@type': 'ListItem', position: 3, name: 'Blog', item: `${BASE_URL}/blog` },
    { '@type': 'ListItem', position: 4, name: 'Rankings', item: `${BASE_URL}/rankings` },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#060d1f" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="canonical" href={BASE_URL} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
