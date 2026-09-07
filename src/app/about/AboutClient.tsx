'use client'

import { useTheme } from '@/components/ThemeProvider'
import { TerminalWindow, PromptLine, TerminalDivider } from '@/components/TerminalWindow'

const GIT_LOG = [
  { hash: 'c1a8f67', msg: 'feat: built homelab on Proxmox', date: '2026' },
  { hash: 'b7c2e45', msg: 'feat: launched TheTerminalGuyX YouTube channel', date: '2026' },
  { hash: 'a3f9d12', msg: 'feat: joined Eurofins ITWW as Intern and then DevOps Engineer', date: '2025' },
  // { hash: 'a3fyd12', msg: 'feat: joined Eurofins ITWW as Intern', date: '2025' },
  { hash: 'd4b3c89', msg: 'feat: migrated to Arch Linux + Hyprland daily driver', date: '2024' },
  { hash: 'e9f0a12', msg: 'feat: Worked as Blockchain Developer in 2x Solutions and Knit finance', date: '2022' },
  { hash: 'f2d1e34', msg: 'feat: Started learning Blockchain from THE Patric collins', date: '2021' },
  { hash: '1a2b3c4', msg: 'init: computer science degree started', date: '2019' },
]

const NOW_BUILDING = [
  'Self-hosted Kubernetes homelab with GitOps (ArgoCD)',
  'Open-source Terraform modules for Proxmox provisioning',
  'Linux ricing as a hobby. Built my customized DE using hyprland after trying KDE plasma and GNOME',
  'Working on learning Kubernetes and helm charts, as I am all my services of homelab in a k3s cluster',
]

export function AboutClient() {
  const { theme } = useTheme()
  const isTerminal = theme === 'terminal'

  if (!isTerminal) return <ClassicAbout />

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
      <TerminalWindow title="prateek@portfolio: ~/about">
        <PromptLine command="cat about.txt" />
        <div className="mt-3 mb-6 text-sm space-y-3" style={{ color: 'var(--text-body)' }}>
          <p>
            Hey. I&apos;m Prateek — a DevOps engineer based in India working at{' '}
            <span style={{ color: '#00ff41' }}>Eurofins ITWW</span>. I design and maintain
            cloud-native infrastructure: Kubernetes clusters, CI/CD pipelines, IaC with Terraform,
            and everything in between.
          </p>
          <p>
            Outside of work I run a <span style={{ color: 'var(--accent)' }}>homelab</span> on Proxmox,
            contribute to open source, and document it all on{' '}
            <span style={{ color: 'var(--accent)' }}>YouTube (@TheTerminalGuyX)</span>.
          </p>
          <p>
            I use <span style={{ color: '#00ff41' }}>Arch Linux</span> with Hyprland as my daily
            driver. I believe your tools should be as fast as your thoughts.
          </p>
        </div>

        <TerminalDivider />

        <PromptLine command="git log --oneline --graph" />
        <div className="mt-3 mb-6 font-mono text-xs space-y-1">
          {GIT_LOG.map((entry, i) => (
            <div key={entry.hash} className="flex items-baseline gap-2">
              <span style={{ color: 'var(--text-muted)' }}>
                {i === 0 ? '* ' : '* '}
              </span>
              <span style={{ color: 'var(--accent)' }}>{entry.hash}</span>
              <span style={{ color: 'var(--text-body)' }}>{entry.msg}</span>
              <span style={{ color: 'var(--text-muted)' }} className="ml-auto hidden sm:inline">
                ({entry.date})
              </span>
            </div>
          ))}
        </div>

        <TerminalDivider />

        <PromptLine command="cat now_building.txt" />
        <div className="mt-3 mb-2 text-sm space-y-1">
          {NOW_BUILDING.map((item) => (
            <div key={item} className="flex gap-2">
              <span style={{ color: 'var(--accent)' }}>▸</span>
              <span style={{ color: 'var(--text-body)' }}>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <PromptLine command="" showCursor />
        </div>
      </TerminalWindow>
    </div>
  )
}

function ClassicAbout() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
      <h1
        className="text-4xl font-bold mb-4"
        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-secondary)' }}
      >
        About Me
      </h1>
      <div
        className="h-1 w-20 rounded mb-10"
        style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
      />
      <div className="grid sm:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4" style={{ color: 'var(--text-body)', fontFamily: 'var(--font-primary)' }}>
          <p>
            Hey. I&apos;m Prateek — a DevOps engineer based in India working at{' '}
            <strong style={{ color: 'var(--accent)' }}>Eurofins ITWW</strong>. I design and maintain
            cloud-native infrastructure: Kubernetes clusters, CI/CD pipelines, and IaC with Terraform.
          </p>
          <p>
            Outside of work I run a homelab on Proxmox, contribute to open source, and document it
            all on <strong style={{ color: 'var(--accent)' }}>YouTube (@TheTerminalGuyX)</strong>.
          </p>
          <p>
            I use Arch Linux with Hyprland as my daily driver. Fast tools, minimal noise.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-secondary)' }}>
            Currently Building
          </h3>
          {NOW_BUILDING.map((item) => (
            <div
              key={item}
              className="flex gap-3 p-3 rounded-lg border"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
            >
              <span style={{ color: 'var(--accent)' }}>→</span>
              <span className="text-sm" style={{ color: 'var(--text-body)', fontFamily: 'var(--font-primary)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <h2
        className="text-2xl font-bold mb-6"
        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-secondary)' }}
      >
        Career Timeline
      </h2>
      <div className="relative pl-6 border-l-2" style={{ borderColor: 'var(--border)' }}>
        {GIT_LOG.map((entry) => (
          <div key={entry.hash} className="mb-8 relative">
            <div
              className="absolute -left-[1.45rem] top-1 w-3 h-3 rounded-full border-2"
              style={{ borderColor: 'var(--accent)', background: 'var(--bg)' }}
            />
            <div className="text-xs mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-primary)' }}>
              {entry.date} · {entry.hash}
            </div>
            <p className="text-sm" style={{ color: 'var(--text-body)', fontFamily: 'var(--font-primary)' }}>
              {entry.msg.replace(/^feat: |^init: /, '')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
