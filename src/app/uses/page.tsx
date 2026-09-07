import { Metadata } from 'next'
import { UsesClient } from './UsesClient'

export const metadata: Metadata = {
  title: 'Uses',
  description: 'My full setup: hardware, OS, tools, and workflow.',
}

export default function UsesPage() {
  return <UsesClient />
}
