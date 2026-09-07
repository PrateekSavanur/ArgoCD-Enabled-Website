'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'terminal' | 'classic'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'terminal',
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('terminal')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored === 'classic') {
      setTheme('classic')
      document.documentElement.classList.add('classic-mode')
    }
    setMounted(true)
  }, [])

  function toggleTheme() {
    setTheme((prev) => {
      const next: Theme = prev === 'terminal' ? 'classic' : 'terminal'
      localStorage.setItem('theme', next)
      if (next === 'classic') {
        document.documentElement.classList.add('classic-mode')
      } else {
        document.documentElement.classList.remove('classic-mode')
      }
      return next
    })
  }

  if (!mounted) return null

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
