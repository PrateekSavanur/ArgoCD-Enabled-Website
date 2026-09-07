import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Navbar } from '@/components/Navbar'
import { BootScreen } from '@/components/BootScreen'
import { ScanlineOverlay } from '@/components/ScanlineOverlay'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://prateek.dev'
const authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME || 'Prateek Prasanna Savan'
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'DevOps engineer and content creator.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${authorName} — DevOps Engineer`,
    template: `%s | ${authorName}`,
  },
  description: siteDescription,
  authors: [{ name: authorName }],
  creator: authorName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: authorName,
    title: `${authorName} — DevOps Engineer`,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${authorName} — DevOps Engineer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${authorName} — DevOps Engineer`,
    description: siteDescription,
    creator: '@TheTerminalGuyX',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" title="RSS Feed" />
      </head>
      <body>
        <ThemeProvider>
          <BootScreen />
          <ScanlineOverlay />
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
