'use client'

import { useTheme } from '@/components/ThemeProvider'
import { TerminalWindow } from '@/components/TerminalWindow'
import { InteractiveTerminal } from '@/components/InteractiveTerminal'
import { TerminalCheatsheet } from '@/components/TerminalCheatsheet'

const SKILLS = [
  { cat: 'Cloud', items: ['AWS', 'Azure' ,'Local Infrastucture (homelab)'] },
  { cat: 'IaC', items: ['Terraform','Ansible'] },
  { cat: 'Containers', items: ['Docker', 'Kubernetes', 'Helm'] },
  { cat: 'CI/CD', items: ['GitHub Actions', 'ArgoCD', 'Azure Devops'] },
  { cat: 'Monitoring', items: ['Grafana', 'Prometheus'] },
  { cat: 'Linux', items: ['Arch Linux', 'Proxmox'] },
  { cat: 'Scripting', items: ['Bash', 'Python', 'Go', 'Powershell'] },
  { cat: 'Homelab', items: ['Proxmox', 'TrueNAS', 'pfSense'] },
]

const SOCIAL_LINKS = [
  { label: 'github', handle: 'PrateekSavanur', url: process.env.NEXT_PUBLIC_GITHUB_URL || '#', icon: '[gh]' },
  { label: 'linkedin', handle: 'prateek-savanur', url: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#', icon: '[li]' },
  { label: 'youtube', handle: 'TheTerminalGuyX', url: process.env.NEXT_PUBLIC_YOUTUBE_URL || '#', icon: '[yt]' },
]

export default function HomePage() {
  const { theme } = useTheme()
  const isTerminal = theme === 'terminal'

  if (!isTerminal) return <ClassicHome />

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:py-20">
      <div className="flex items-start gap-4">
        {/* terminal — takes all remaining width */}
        <div className="flex-1 min-w-0">
          <TerminalWindow title="prateek@portfolio: ~">
            <InteractiveTerminal />
          </TerminalWindow>
        </div>
        {/* cheatsheet — desktop sticky sidebar, mobile floating */}
        <TerminalCheatsheet />
      </div>
    </div>
  )
}

function ClassicHome() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 sm:py-28">
      {/* Hero */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-16">
        <div
          className="w-28 h-28 rounded-full flex-shrink-0 flex items-center justify-center text-4xl"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff' }}
        >
          P
        </div>
        <div>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-2"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-secondary)' }}
          >
            Prateek Prasanna Savanur
          </h1>
          <p className="text-xl mb-3" style={{ color: 'var(--accent)', fontFamily: 'var(--font-primary)' }}>
            DevOps Engineer & Content Creator
          </p>
          <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-primary)' }}>
            I automate everything, self-host the rest, and document both on{' '}
            <a
              href={process.env.NEXT_PUBLIC_YOUTUBE_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)' }}
            >
              YouTube @TheTerminalGuyX
            </a>
            .
          </p>
          <div className="flex gap-3 mt-5 flex-wrap">
            <a
              href={process.env.NEXT_PUBLIC_GITHUB_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              GitHub
            </a>
            <a
              href={process.env.NEXT_PUBLIC_LINKEDIN_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-slate-50"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              LinkedIn
            </a>
            <a
              href={process.env.NEXT_PUBLIC_YOUTUBE_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-slate-50"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-secondary)' }}>
        Tech Stack
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        {SKILLS.map((s) => (
          <div
            key={s.cat}
            className="p-4 rounded-xl transition-shadow hover:shadow-md"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}
          >
            <div className="font-semibold mb-2" style={{ color: 'var(--accent)', fontFamily: 'var(--font-secondary)' }}>
              {s.cat}
            </div>
            {s.items.map((item) => (
              <div key={item} className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
