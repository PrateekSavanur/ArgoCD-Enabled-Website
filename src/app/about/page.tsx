import { Metadata } from 'next'
import { AboutClient } from './AboutClient'

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, current role, and what I\'m building.',
}

export default function AboutPage() {
  return <AboutClient />
}
