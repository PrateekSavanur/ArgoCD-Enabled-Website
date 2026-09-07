'use client'

import { useTheme } from '@/components/ThemeProvider'
import { TerminalWindow, PromptLine, TerminalDivider } from '@/components/TerminalWindow'

const USES_SECTIONS = [
  {
    title: 'OS & Desktop',
    items: [
      { key: 'OS', value: 'Arch Linux (btw)' },
      { key: 'WM', value: 'Hyprland (Wayland)' },
      { key: 'Bar', value: 'Waybar' },
      { key: 'Launcher', value: 'Rofi (wayland fork)' },
      { key: 'File Manager', value: 'Thunar (GUI)' },
      { key: 'Compositor', value: 'Hyprland (built-in)' },
    ],
  },
  {
    title: 'Terminal & Shell',
    items: [
      { key: 'Terminal', value: 'Kitty' },
      { key: 'Shell', value: 'Zsh + Oh My Zsh ' },
      { key: 'Multiplexer', value: 'Tmux' },
      { key: 'Editor', value: 'VS Codium ' },
    ],
  },
  {
    title: 'DevOps Tools',
    items: [
      { key: 'IaC', value: 'Terraform' },
      { key: 'Config Mgmt', value: 'Ansible' },
      { key: 'Containers', value: 'Docker + Podman' },
      { key: 'Kubernetes', value: 'k3s (homelab)' },
      { key: 'GitOps', value: 'ArgoCD' },
      { key: 'CI/CD', value: 'GitHub Actions' },
    ],
  },
  {
    title: 'Homelab',
    items: [
      { key: 'Hypervisor', value: 'Proxmox VE 8.x (3 nodes)' },
      { key: 'NAS', value: 'TrueNAS Scale' },
      { key: 'Reverse Proxy', value: 'Cloudflare Tunnels' },
    ],
  },

]

export function UsesClient() {
  const { theme } = useTheme()
  const isTerminal = theme === 'terminal'

  if (!isTerminal) return <ClassicUses />

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
      <TerminalWindow title="prateek@portfolio: ~/uses">
        <PromptLine command="cat uses.txt" />
        <div
          className="mt-2 mb-4 text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          # My full setup. Last updated: May 2025.
        </div>

        {USES_SECTIONS.map((section, i) => (
          <div key={section.title}>
            {i > 0 && <TerminalDivider />}
            <div
              className="text-sm font-bold mb-3"
              style={{ color: 'var(--accent)' }}
            >
              ## {section.title}
            </div>
            <div className="space-y-1.5 text-xs">
              {section.items.map((item) => (
                <div key={item.key} className="flex gap-2 flex-wrap">
                  <span style={{ color: 'var(--text-muted)', minWidth: '8rem' }}>
                    {item.key}:
                  </span>
                  <span style={{ color: 'var(--text-body)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-6">
          <PromptLine command="" showCursor />
        </div>
      </TerminalWindow>
    </div>
  )
}

function ClassicUses() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
      <h1
        className="text-4xl font-bold mb-4"
        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-secondary)' }}
      >
        Uses
      </h1>
      <p className="mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-primary)' }}>
        My full setup — hardware, software, and workflow tools.
      </p>
      <div className="h-1 w-20 rounded mb-12" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />

      <div className="grid sm:grid-cols-2 gap-8">
        {USES_SECTIONS.map((section) => (
          <div key={section.title}>
            <h2
              className="font-semibold text-lg mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-secondary)' }}
            >
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-3 text-sm"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  <span className="shrink-0 w-36 text-right" style={{ color: 'var(--text-muted)' }}>
                    {item.key}
                  </span>
                  <span style={{ color: 'var(--text-body)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
