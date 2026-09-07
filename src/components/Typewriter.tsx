'use client'

import { useEffect, useRef, useState } from 'react'

interface TypewriterProps {
  lines: string[]
  /** ms delay between lines */
  lineDelay?: number
  /** ms per character */
  charDelay?: number
  onComplete?: () => void
  className?: string
  promptColor?: string
}

export function Typewriter({
  lines,
  lineDelay = 400,
  charDelay = 28,
  onComplete,
  className,
  promptColor,
}: TypewriterProps) {
  const [rendered, setRendered] = useState<{ text: string; done: boolean }[]>([])
  const completedRef = useRef(false)

  useEffect(() => {
    let cancelled = false

    async function run() {
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return
        const line = lines[i]
        setRendered((prev) => [...prev, { text: '', done: false }])

        await delay(lineDelay)

        for (let j = 0; j <= line.length; j++) {
          if (cancelled) return
          setRendered((prev) => {
            const next = [...prev]
            next[i] = { text: line.slice(0, j), done: j === line.length }
            return next
          })
          if (j < line.length) await delay(charDelay)
        }
      }

      if (!completedRef.current) {
        completedRef.current = true
        onComplete?.()
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={className}>
      {rendered.map((r, i) => (
        <div key={i} style={{ fontFamily: 'var(--font-primary)' }}>
          {r.text}
          {!r.done && (
            <span
              className="inline-block w-[0.55em] h-[1.1em] align-bottom animate-cursor-blink"
              style={{ background: promptColor || 'var(--text-primary)' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}
