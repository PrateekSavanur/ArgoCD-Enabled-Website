import { useTheme } from './ThemeProvider'

interface TerminalWindowProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function TerminalWindow({ title, children, className = '' }: TerminalWindowProps) {
  return (
    <div
      className={`terminal-box overflow-hidden ${className}`}
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2 border-b text-xs"
        style={{
          borderColor: 'var(--border)',
          background: 'var(--bg-surface)',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-primary)',
        }}
      >
        <span style={{ color: '#ff5f56' }}>●</span>
        <span style={{ color: '#ffbd2e' }}>●</span>
        <span style={{ color: '#27c93f' }}>●</span>
        {title && (
          <span className="ml-2" style={{ color: 'var(--text-muted)' }}>
            {title}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-6" style={{ fontFamily: 'var(--font-primary)' }}>
        {children}
      </div>
    </div>
  )
}

interface PromptLineProps {
  command?: string
  children?: React.ReactNode
  showCursor?: boolean
}

export function PromptLine({ command, children, showCursor }: PromptLineProps) {
  return (
    <div className="mb-1" style={{ fontFamily: 'var(--font-primary)' }}>
      {command !== undefined && (
        <div className="flex items-center gap-1 text-sm">
          <span style={{ color: 'var(--accent)' }}>prateek@portfolio</span>
          <span style={{ color: 'var(--text-muted)' }}>:</span>
          <span style={{ color: '#00d4ff' }}>~</span>
          <span style={{ color: 'var(--text-muted)' }}>$</span>
          <span className="ml-1" style={{ color: 'var(--text-primary)' }}>
            {command}
          </span>
          {showCursor && (
            <span
              className="inline-block w-[0.55em] h-[1.1em] align-bottom animate-cursor-blink ml-1"
              style={{ background: 'var(--text-primary)' }}
            />
          )}
        </div>
      )}
      {children && (
        <div className="mt-1 text-sm" style={{ color: 'var(--text-body)' }}>
          {children}
        </div>
      )}
    </div>
  )
}

export function TerminalDivider({ label }: { label?: string }) {
  if (label) {
    return (
      <div
        className="flex items-center gap-2 my-6 text-xs"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-primary)' }}
      >
        <span>─────</span>
        <span>{label}</span>
        <span>─────</span>
      </div>
    )
  }
  return (
    <div
      className="my-6 border-t"
      style={{ borderColor: 'var(--border)' }}
    />
  )
}
