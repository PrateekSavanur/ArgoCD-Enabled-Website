'use client'

import { useTheme } from '@/components/ThemeProvider'
import { TerminalWindow, PromptLine } from '@/components/TerminalWindow'

interface Project {
  name: string
  description: string
  stack: string[]
  github?: string
  live?: string
  status: 'active' | 'archived' | 'wip'
}

const PROJECTS: Project[] = [
  {
    name: 'proxmox-terraform-modules',
    description: 'Reusable Terraform modules for provisioning VMs and LXC containers on Proxmox VE. Includes cloud-init templates, networking, and storage configuration.',
    stack: ['Terraform', 'Proxmox', 'HCL', 'cloud-init'],
    github: 'https://github.com/prateek/proxmox-terraform-modules',
    status: 'active',
  },
  {
    name: 'homelab-gitops',
    description: 'GitOps-driven homelab on Kubernetes. ArgoCD manages all app deployments. Includes Grafana dashboards, Prometheus alerts, and automated backups.',
    stack: ['Kubernetes', 'ArgoCD', 'Helm', 'Prometheus', 'Grafana'],
    github: 'https://github.com/prateek/homelab-gitops',
    live: 'https://status.prateek.dev',
    status: 'active',
  },
  {
    name: 'hyprland-dotfiles',
    description: 'My Arch Linux + Hyprland configuration files. Waybar, Rofi, Kitty, Neovim, and more. Clean, fast, and fully documented.',
    stack: ['Arch Linux', 'Hyprland', 'Waybar', 'Rofi', 'Neovim'],
    github: 'https://github.com/prateek/dotfiles',
    status: 'active',
  },
]

const STATUS_COLORS: Record<string, string> = {
  active: '#00ff41',
  wip: '#ffb000',
  archived: '#4a7a4a',
}

export function ProjectsClient() {
  const { theme } = useTheme()
  const isTerminal = theme === 'terminal'

  if (!isTerminal) return <ClassicProjects />

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
      <TerminalWindow title="prateek@portfolio: ~/projects">
        <PromptLine command="ls -la projects/" />
        <div
          className="mt-2 mb-4 text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          total {PROJECTS.length} directories
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCardTerminal key={p.name} project={p} />
          ))}
        </div>
        <div className="mt-6">
          <PromptLine command="" showCursor />
        </div>
      </TerminalWindow>
    </div>
  )
}

function ProjectCardTerminal({ project: p }: { project: Project }) {
  return (
    <div
      className="p-4 border text-xs space-y-2 hover:border-opacity-80 transition-all"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span style={{ color: 'var(--text-primary)' }} className="font-bold">
            ┌─ {p.name}
          </span>
        </div>
        <span
          className="text-xs px-1.5 py-0.5 border"
          style={{ color: STATUS_COLORS[p.status], borderColor: STATUS_COLORS[p.status] }}
        >
          {p.status}
        </span>
      </div>
      {/* Description */}
      <p style={{ color: 'var(--text-body)' }}>{p.description}</p>
      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {p.stack.map((s) => (
          <span
            key={s}
            className="px-1.5 py-0.5 border"
            style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}
          >
            {s}
          </span>
        ))}
      </div>
      {/* Links */}
      <div className="flex gap-3 pt-1">
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: 'var(--text-muted)', textUnderlineOffset: '3px' }}
          >
            [github] ↗
          </a>
        )}
        {p.live && (
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: '#00ff41', textUnderlineOffset: '3px' }}
          >
            [live] ↗
          </a>
        )}
      </div>
    </div>
  )
}

function ClassicProjects() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
      <h1
        className="text-4xl font-bold mb-4"
        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-secondary)' }}
      >
        Projects
      </h1>
      <div
        className="h-1 w-20 rounded mb-10"
        style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p) => (
          <div
            key={p.name}
            className="p-6 rounded-xl border transition-all hover:-translate-y-1 hover:shadow-lg duration-200 flex flex-col"
            style={{
              borderColor: 'var(--border)',
              background: 'var(--bg-card)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3
                className="font-semibold text-base"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-secondary)' }}
              >
                {p.name}
              </h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  color: STATUS_COLORS[p.status],
                  background: `${STATUS_COLORS[p.status]}20`,
                }}
              >
                {p.status}
              </span>
            </div>
            <p
              className="text-sm mb-4 flex-1"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-primary)' }}
            >
              {p.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    color: 'var(--accent)',
                    background: `${p.status === 'active' ? '#6366f120' : '#6366f110'}`,
                    fontFamily: 'var(--font-primary)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                  style={{ color: 'var(--accent)', textUnderlineOffset: '3px' }}
                >
                  GitHub ↗
                </a>
              )}
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                  style={{ color: 'var(--text-muted)', textUnderlineOffset: '3px' }}
                >
                  Live ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
