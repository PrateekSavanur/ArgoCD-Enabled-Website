'use client'

import { useState } from 'react'

const COMMANDS = [
  { cmd: 'whoami',               desc: 'print name & bio' },
  { cmd: 'ls skills/',           desc: 'list tech stack' },
  { cmd: 'cat social_links.txt', desc: 'show social links' },
  { cmd: 'cat about.txt',        desc: 'go to about page' },
  { cmd: 'ls projects/',         desc: 'go to projects' },
  { cmd: 'ls posts/',            desc: 'go to blog' },
  { cmd: 'cat uses.txt',         desc: 'go to uses page' },
  { cmd: 'echo <text>',          desc: 'print text' },
  { cmd: 'date',                 desc: 'current date/time' },
  { cmd: 'uname -a',             desc: 'system info' },
  { cmd: 'clear',                desc: 'clear screen' },
  { cmd: 'help',                 desc: 'list all commands' },
]

const SHORTCUTS = [
  { key: '↑ / ↓',   desc: 'browse history' },
  { key: 'Enter',    desc: 'run command' },
  { key: 'Ctrl+L',   desc: 'clear screen' },
  { key: 'Ctrl+C',   desc: 'cancel input' },
]

export function TerminalCheatsheet() {
  const [open, setOpen] = useState(true)

  return (
    <>
      {/* ── Desktop panel (shown right of terminal via parent grid) ── */}
      <div
        className="hidden lg:flex flex-col gap-0 text-xs"
        style={{
          fontFamily: 'var(--font-primary)',
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          width: '220px',
          flexShrink: 0,
          alignSelf: 'start',
          position: 'sticky',
          top: '84px',
        }}
      >
        {/* title bar */}
        <div
          className="px-3 py-2 border-b flex items-center gap-2"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)', color: 'var(--text-muted)' }}
        >
          <span style={{ color: '#ff5f56' }}>●</span>
          <span style={{ color: '#ffbd2e' }}>●</span>
          <span style={{ color: '#27c93f' }}>●</span>
          <span className="ml-1">man terminal</span>
        </div>

        <div className="p-3 space-y-4">
          {/* commands */}
          <div>
            <div className="mb-2 font-bold" style={{ color: 'var(--accent)' }}>
              COMMANDS
            </div>
            <div className="space-y-1.5">
              {COMMANDS.map(({ cmd, desc }) => (
                <div key={cmd}>
                  <div style={{ color: 'var(--text-primary)' }}>{cmd}</div>
                  <div className="pl-2" style={{ color: 'var(--text-muted)' }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* divider */}
          <div className="border-t" style={{ borderColor: 'var(--border)' }} />

          {/* shortcuts */}
          <div>
            <div className="mb-2 font-bold" style={{ color: 'var(--accent)' }}>
              SHORTCUTS
            </div>
            <div className="space-y-1.5">
              {SHORTCUTS.map(({ key, desc }) => (
                <div key={key} className="flex justify-between gap-2">
                  <span
                    className="px-1 border"
                    style={{ color: 'var(--text-primary)', borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
                  >
                    {key}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* tip */}
          <div className="border-t pt-3" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--accent)' }}>tip:</span> click anywhere<br />in the terminal to focus
          </div>
        </div>
      </div>

      {/* ── Mobile floating toggle ── */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="fixed bottom-5 right-4 z-50 px-3 py-1.5 text-xs border"
          style={{
            fontFamily: 'var(--font-primary)',
            background: 'var(--bg-card)',
            borderColor: 'var(--accent)',
            color: 'var(--accent)',
          }}
        >
          {open ? '[×] help' : '[?] help'}
        </button>

        {open && (
          <div
            className="fixed bottom-14 right-4 z-50 text-xs w-64 border"
            style={{
              fontFamily: 'var(--font-primary)',
              background: 'var(--bg-card)',
              borderColor: 'var(--border)',
            }}
          >
            {/* title bar */}
            <div
              className="px-3 py-2 border-b"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)', color: 'var(--text-muted)' }}
            >
              man terminal
            </div>
            <div className="p-3 space-y-3 max-h-72 overflow-y-auto">
              <div>
                <div className="mb-1.5 font-bold" style={{ color: 'var(--accent)' }}>COMMANDS</div>
                {COMMANDS.map(({ cmd, desc }) => (
                  <div key={cmd} className="flex justify-between gap-2 mb-1">
                    <span style={{ color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{cmd}</span>
                    <span style={{ color: 'var(--text-muted)', textAlign: 'right' }}>{desc}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2" style={{ borderColor: 'var(--border)' }}>
                <div className="mb-1.5 font-bold" style={{ color: 'var(--accent)' }}>SHORTCUTS</div>
                {SHORTCUTS.map(({ key, desc }) => (
                  <div key={key} className="flex justify-between gap-2 mb-1">
                    <span
                      className="px-1 border"
                      style={{ color: 'var(--text-primary)', borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
                    >
                      {key}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
