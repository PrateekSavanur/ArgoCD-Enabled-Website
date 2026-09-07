'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import clsx from 'clsx'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: '~/' },
  { href: '/about', label: 'about/' },
  { href: '/projects', label: 'projects/' },
  { href: '/blog', label: 'blog/' },
  { href: '/uses', label: 'uses/' },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const isTerminal = theme === 'terminal'

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
      style={{
        background: 'var(--nav-bg)',
        borderBottom: '1px solid var(--nav-border)',
      }}
    >
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-sm hover:opacity-80 transition-opacity"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-primary)' }}
        >
          {isTerminal ? (
            <span>
              <span style={{ color: 'var(--accent)' }}>prateek</span>
              <span style={{ color: 'var(--text-muted)' }}>@</span>
              <span style={{ color: 'var(--text-secondary)' }}>portfolio</span>
              <span style={{ color: 'var(--text-muted)' }}>:~$</span>
            </span>
          ) : (
            <span style={{ fontFamily: 'var(--font-primary)' }}>Prateek Prasanna Savanur</span>
          )}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-all duration-150 hover:opacity-100"
                style={{
                  color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-primary)',
                  opacity: active ? 1 : 0.7,
                  textDecoration: active && isTerminal ? 'underline' : 'none',
                  textUnderlineOffset: '3px',
                }}
              >
                {isTerminal ? link.label : link.label.replace('/', '')}
              </Link>
            )
          })}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-xs px-3 py-1.5 border transition-all duration-200 hover:opacity-90"
            style={{
              borderColor: 'var(--border)',
              color: isTerminal ? 'var(--accent)' : 'var(--accent)',
              background: 'transparent',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-primary)',
            }}
          >
            {isTerminal ? 'switch --mode=classic' : '> terminal_mode.sh'}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="text-xs px-2 py-1 border"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--accent)',
              background: 'transparent',
              fontFamily: 'var(--font-primary)',
            }}
          >
            {isTerminal ? '⇄' : '⌨'}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-primary)' }}
            className="text-sm"
          >
            {menuOpen ? '[×]' : '[≡]'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-3"
          style={{ background: 'var(--nav-bg)', borderBottom: '1px solid var(--nav-border)' }}
        >
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm"
                style={{
                  color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                {isTerminal ? `$ cd ${link.label}` : link.label.replace('/', '')}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
