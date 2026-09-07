'use client'

import { useTheme } from '@/components/ThemeProvider'
import { TerminalWindow, TerminalDivider } from '@/components/TerminalWindow'
import Link from 'next/link'
import type { Post } from '@/lib/posts'

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function PostContent({ post, content }: { post: Post; content: React.ReactNode }) {
  const { theme } = useTheme()
  const isTerminal = theme === 'terminal'

  if (!isTerminal) return <ClassicPost post={post} content={content} />

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
      <TerminalWindow title={`prateek@portfolio: ~/blog/${post.slug}`}>
        {/* Header */}
        <div className="mb-2 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span>cat posts/{post.slug}.mdx</span>
        </div>
        <div className="mb-2 text-xs flex flex-wrap gap-3" style={{ color: 'var(--text-muted)' }}>
          <span>─ date: {formatDate(post.date)}</span>
          <span>─ {post.readingTime}</span>
          {post.tags.map((t) => (
            <span key={t} style={{ color: 'var(--accent)' }}>
              #{t}
            </span>
          ))}
        </div>
        <h1
          className="text-2xl font-bold mb-6 terminal-glow"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-primary)' }}
        >
          {post.title}
        </h1>

        <TerminalDivider />

        <article className="prose-terminal text-sm leading-7">
          {content}
        </article>

        <TerminalDivider />

        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
          <Link href="/blog" className="hover:underline" style={{ color: 'var(--accent)' }}>
            ← back to posts/
          </Link>
        </div>
      </TerminalWindow>
    </div>
  )
}

function ClassicPost({ post, content }: { post: Post; content: React.ReactNode }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
      <Link
        href="/blog"
        className="text-sm mb-8 inline-block hover:underline"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-primary)' }}
      >
        ← Back to Blog
      </Link>
      <h1
        className="text-4xl font-bold mb-4"
        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-secondary)' }}
      >
        {post.title}
      </h1>
      <div className="flex items-center gap-4 text-sm mb-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-primary)' }}>
        <span>{formatDate(post.date)}</span>
        <span>{post.readingTime}</span>
      </div>
      <div className="flex gap-2 mb-10">
        {post.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ color: 'var(--accent)', background: `var(--accent)15`, fontFamily: 'var(--font-primary)' }}
          >
            #{t}
          </span>
        ))}
      </div>
      <div className="h-px mb-10" style={{ background: 'var(--border)' }} />
      <article className="prose-terminal">{content}</article>
    </div>
  )
}
