'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

/* ── types ──────────────────────────────────────────────── */
interface HistoryEntry {
  type: 'cmd' | 'output' | 'error' | 'blank'
  text?: string
  node?: React.ReactNode
}

/* ── command registry ───────────────────────────────────── */
const SKILLS = [
  { cat: 'Cloud',      items: ['AWS', 'Azure', 'Local Infra management'] },
  { cat: 'IaC',        items: ['Terraform', 'Ansible'] },
  { cat: 'Containers', items: ['Docker', 'Kubernetes', 'Helm'] },
  { cat: 'CI/CD',      items: ['GitHub Actions', 'ArgoCD', 'Azure Devops'] },
  { cat: 'Monitoring', items: ['Grafana', 'Prometheus'] },
  { cat: 'Linux',      items: ['Arch Linux', 'Proxmox'] },
  { cat: 'Scripting',  items: ['Bash', 'Python', 'Go', 'Powershell'] },
  { cat: 'Homelab',    items: ['Proxmox', 'TrueNAS', 'cloudflare'] },
]

const SOCIAL_LINKS = [
  { label: 'github',   handle: 'PrateekSavanur',               url: process.env.NEXT_PUBLIC_GITHUB_URL   || '#' },
  { label: 'linkedin', handle: 'prateek-savanur', url: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#' },
  { label: 'youtube',  handle: 'TheTerminalGuyX',        url: process.env.NEXT_PUBLIC_YOUTUBE_URL  || '#' },
]

const HELP_TEXT = `
Available commands:

  whoami              print user info
  ls skills/          list tech stack
  cat social_links.txt  show social profiles
  cat about.txt       background & current role
  ls projects/        open projects page
  ls posts/           open blog page
  cat uses.txt        open uses page
  help                show this help
  clear               clear terminal
  echo <text>         print text
  date                print current date/time
  uname -a            print system info
`.trim()

type CommandResult = HistoryEntry | HistoryEntry[] | 'clear' | 'navigate'

function runCommand(
  raw: string,
): { entries: HistoryEntry[]; action?: { type: 'navigate'; href: string } } {
  const trimmed = raw.trim()
  if (!trimmed) return { entries: [] }

  const [cmd, ...args] = trimmed.split(/\s+/)
  const rest = args.join(' ')

  switch (cmd.toLowerCase()) {
    case 'whoami':
      return {
        entries: [
          { type: 'output', text: 'Prateek Prasanna Savanur' },
          { type: 'output', text: 'DevOps engineer. Content creator @TheTerminalGuyX.' },
          { type: 'output', text: 'I automate everything, self-host the rest, and document both on YouTube.' },
        ],
      }

    case 'ls': {
      const target = args[0] || ''
      if (target === 'skills/' || target === 'skills') {
        const lines: HistoryEntry[] = SKILLS.map((s) => ({
          type: 'output',
          text: `  ${s.cat.padEnd(14)} ${s.items.join('  ')}`,
        }))
        return { entries: lines }
      }
      if (target === 'projects/' || target === 'projects') {
        return {
          entries: [{ type: 'output', text: 'Navigating to /projects...' }],
          action: { type: 'navigate', href: '/projects' },
        }
      }
      if (target === 'posts/' || target === 'posts') {
        return {
          entries: [{ type: 'output', text: 'Navigating to /blog...' }],
          action: { type: 'navigate', href: '/blog' },
        }
      }
      // default ls
      return {
        entries: [
          { type: 'output', text: 'about/   projects/   blog/   uses/   skills/   posts/' },
        ],
      }
    }

    case 'cat': {
      const file = args[0] || ''
      if (file === 'social_links.txt') {
        return {
          entries: SOCIAL_LINKS.map((s) => ({
            type: 'output' as const,
            node: (
              <span>
                <span style={{ color: 'var(--text-muted)' }}>{s.label.padEnd(10)}</span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent)' }}
                  className="hover:underline"
                >
                  {s.handle}
                </a>
              </span>
            ),
          })),
        }
      }
      if (file === 'about.txt') {
        return {
          entries: [{ type: 'output', text: 'Navigating to /about...' }],
          action: { type: 'navigate', href: '/about' },
        }
      }
      if (file === 'uses.txt') {
        return {
          entries: [{ type: 'output', text: 'Navigating to /uses...' }],
          action: { type: 'navigate', href: '/uses' },
        }
      }
      return { entries: [{ type: 'error', text: `cat: ${file}: No such file or directory` }] }
    }

    case 'cd': {
      const dest = args[0] || '~'
      const map: Record<string, string> = {
        'about': '/about', 'about/': '/about',
        'projects': '/projects', 'projects/': '/projects',
        'blog': '/blog', 'blog/': '/blog',
        'uses': '/uses', 'uses/': '/uses',
        '~': '/', '/': '/',
      }
      const href = map[dest]
      if (href) {
        return {
          entries: [{ type: 'output', text: `cd: changing directory to ${href}` }],
          action: { type: 'navigate', href },
        }
      }
      return { entries: [{ type: 'error', text: `cd: ${dest}: No such directory` }] }
    }

    case 'help':
      return {
        entries: HELP_TEXT.split('\n').map((line) => ({
          type: 'output' as const,
          text: line,
        })),
      }

    case 'clear':
      return { entries: [{ type: 'blank' }] } // handled specially below — marker

    case 'echo':
      return { entries: [{ type: 'output', text: rest || '' }] }

    case 'date':
      return {
        entries: [{ type: 'output', text: new Date().toString() }],
      }

    case 'uname':
      return {
        entries: [
          { type: 'output', text: 'Linux portfolio 6.7.0-arch1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux' },
        ],
      }

    case 'sudo':
      return { entries: [{ type: 'error', text: 'Nice try. You are not in the sudoers file. This incident will be reported.' }] }

    case 'exit':
    case 'logout':
      return { entries: [{ type: 'output', text: 'logout: session ended. Goodbye.' }] }

    case 'pwd':
      return { entries: [{ type: 'output', text: '/home/prateek/portfolio' }] }

    default:
      return {
        entries: [{ type: 'error', text: `${cmd}: command not found. Type 'help' for available commands.` }],
      }
  }
}

/* ── component ──────────────────────────────────────────── */
const INTRO_ENTRIES: HistoryEntry[] = [
  { type: 'cmd',    text: 'whoami' },
  { type: 'output', text: 'Prateek Prasanna Savanur' },
  { type: 'output', text: 'DevOps engineer. Content creator @TheTerminalGuyX.' },
  { type: 'blank' },
  { type: 'cmd',    text: 'ls skills/' },
  ...SKILLS.map((s): HistoryEntry => ({
    type: 'output',
    text: `  ${s.cat.padEnd(14)} ${s.items.join('  ')}`,
  })),
  { type: 'blank' },
  { type: 'cmd',    text: 'cat social_links.txt' },
  ...SOCIAL_LINKS.map((s): HistoryEntry => ({
    type: 'output',
    node: (
      <span>
        <span style={{ color: 'var(--text-muted)' }}>{s.label.padEnd(10)}</span>
        <a href={s.url} target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--accent)' }} className="hover:underline">
          {s.handle}
        </a>
      </span>
    ),
  })),
  { type: 'blank' },
  { type: 'output', text: "Type 'help' to see all commands." },
]

export function InteractiveTerminal() {
  const router = useRouter()
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [introReady, setIntroReady] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // play intro line-by-line
  useEffect(() => {
    let i = 0
    let active = true
    const tick = () => {
      if (!active) return
      if (i < INTRO_ENTRIES.length) {
        const entry = INTRO_ENTRIES[i]
        i++
        setHistory((h) => [...h, entry])
        setTimeout(tick, entry.type === 'cmd' ? 120 : entry.type === 'blank' ? 80 : 40)
      } else {
        setIntroReady(true)
      }
    }
    const t = setTimeout(tick, 300)
    return () => { active = false; clearTimeout(t) }
  }, [])

  // focus input on click anywhere in terminal
  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const submit = useCallback(() => {
    const raw = input.trim()
    setInput('')
    setHistoryIdx(-1)

    const cmdEntry: HistoryEntry = { type: 'cmd', text: raw }

    if (!raw) {
      setHistory((h) => [...h, cmdEntry])
      return
    }

    setCmdHistory((prev) => [raw, ...prev])

    if (raw === 'clear') {
      setHistory([])
      return
    }

    const { entries, action } = runCommand(raw)
    setHistory((h) => [...h, cmdEntry, ...entries])

    if (action?.type === 'navigate') {
      setTimeout(() => router.push(action.href), 400)
    }
  }, [input, router])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        submit()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHistoryIdx((idx) => {
          const next = Math.min(idx + 1, cmdHistory.length - 1)
          setInput(cmdHistory[next] ?? '')
          return next
        })
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHistoryIdx((idx) => {
          const next = idx - 1
          if (next < 0) { setInput(''); return -1 }
          setInput(cmdHistory[next] ?? '')
          return next
        })
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault()
        setHistory([])
      } else if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault()
        setHistory((h) => [...h, { type: 'cmd', text: input + '^C' }])
        setInput('')
        setHistoryIdx(-1)
      }
    },
    [submit, cmdHistory, input],
  )

  return (
    <div
      ref={containerRef}
      onClick={focusInput}
      className="font-mono text-xs sm:text-sm leading-6 min-h-[24rem] max-h-[70vh] overflow-y-auto cursor-text outline-none"
      style={{ fontFamily: 'var(--font-primary)' }}
      tabIndex={-1}
    >
      
      {/* history */}
      {history.map((entry, i) => {
        if (entry.type === 'blank') return <div key={i} className="h-2" />
        if (entry.type === 'cmd') {
          return (
            <div key={i} className="flex items-baseline gap-1 flex-wrap">
              <span style={{ color: 'var(--accent)' }}>prateek@portfolio</span>
              <span style={{ color: 'var(--text-muted)' }}>:~$</span>
              <span style={{ color: 'var(--text-primary)' }}>{entry.text}</span>
            </div>
          )
        }
        if (entry.type === 'error') {
          return (
            <div key={i} style={{ color: '#ff4136' }}>{entry.text}</div>
          )
        }
        return (
          <div key={i} style={{ color: 'var(--text-body)' }}>
            {entry.node ?? entry.text}
          </div>
        )
      })}

      {/* live input row */}
      {introReady && (
        <div className="flex items-center gap-1 mt-1">
          <span style={{ color: 'var(--accent)' }}>prateek@portfolio</span>
          <span style={{ color: 'var(--text-muted)' }}>:~$</span>
          <span className="relative flex-1 min-w-0">
            {/* invisible mirror for cursor positioning */}
            <span
              aria-hidden
              className="invisible whitespace-pre text-xs sm:text-sm"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              {input || ' '}
            </span>
            <input
              ref={inputRef}
              autoFocus
              value={input}
              onChange={(e) => { setInput(e.target.value); setHistoryIdx(-1) }}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              className="absolute inset-0 w-full bg-transparent border-none outline-none caret-transparent"
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-primary)',
                fontSize: 'inherit',
                lineHeight: 'inherit',
              }}
            />
            {/* blinking block cursor overlay */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 flex"
              style={{ fontFamily: 'var(--font-primary)', fontSize: 'inherit' }}
            >
              <span className="invisible whitespace-pre">{input}</span>
              <span
                className="inline-block w-[0.55em] animate-cursor-blink"
                style={{ background: 'var(--text-primary)', height: '1.1em', marginTop: '0.05em' }}
              />
            </span>
          </span>
        </div>
      )}

      
    </div>
  )
}
