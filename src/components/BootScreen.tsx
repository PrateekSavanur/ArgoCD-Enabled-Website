'use client'

import { useEffect, useState } from 'react'

const BOOT_LINES = [
  '[    0.000000] Linux version 6.7.0-arch1 (prateek@portfolio)',
  '[    0.001234] Command line: BOOT_IMAGE=/vmlinuz-linux root=/dev/sda1',
  '[    0.012345] BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable',
  '[    0.234567] Initializing cgroup subsys cpuset',
  '[    0.345678] NET: Registered PF_INET6 protocol family',
  '[    0.456789] Loading portfolio.config...',
  '[    0.567890] Mounting /home/prateek/portfolio...',
  '[    0.678901] Starting nginx: [ OK ]',
  '[    0.789012] Starting next.js server on :3000...',
  '[    0.890123] All services started. Welcome, prateek.',
  '',
  'prateek@portfolio:~$ ./init_portfolio.sh',
  '> Loading components...',
  '> Hydrating state...',
  '> Portfolio ready.',
]

export function BootScreen() {
  const [lines, setLines] = useState<string[]>([])
  const [visible, setVisible] = useState(true)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const key = 'boot-shown'
    if (sessionStorage.getItem(key)) {
      setVisible(false)
      return
    }

    let i = 0
    let active = true
    const interval = setInterval(() => {
      if (!active) return
      if (i < BOOT_LINES.length) {
        const line = BOOT_LINES[i] // capture before increment
        i++
        setLines((prev) => [...prev, line])
      } else {
        clearInterval(interval)
        setDone(true)
        setTimeout(() => {
          if (!active) return
          setVisible(false)
          sessionStorage.setItem(key, '1')
        }, 600)
      }
    }, 80)

    return () => {
      active = false
      clearInterval(interval)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="boot-screen"
      style={{
        opacity: done ? 0 : 1,
        transition: done ? 'opacity 0.5s ease' : 'none',
      }}
    >
      <div className="w-full max-w-2xl px-4 sm:px-8 py-8 font-mono text-xs sm:text-sm leading-6 overflow-hidden">
        {lines.map((line, idx) => {
          const text = line ?? ''
          const color = text.startsWith('prateek') ? '#ffb000' : text.startsWith('>') ? '#00ff41' : '#00b32d'
          return (
            <div key={idx} className="animate-boot-line" style={{ color }}>
              {text || '\u00A0'}
            </div>
          )
        })}
        {!done && <span className="inline-block w-2 h-4 bg-green-400 animate-cursor-blink ml-1" />}
      </div>
    </div>
  )
}
