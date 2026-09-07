'use client'

import { useTheme } from './ThemeProvider'

export function ScanlineOverlay() {
  const { theme } = useTheme()
  if (theme === 'classic') return null
  return <div className="terminal-scanlines" aria-hidden="true" />
}
