import { Metadata } from 'next'
import { ProjectsClient } from './ProjectsClient'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open source and personal projects by Prateek Prasanna Savanur.',
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
