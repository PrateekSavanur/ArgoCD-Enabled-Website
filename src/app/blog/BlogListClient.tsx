'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'
import { TerminalWindow, PromptLine } from '@/components/TerminalWindow'
import type { PostMeta } from '@/lib/posts'

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function BlogListClient({ posts }: { posts: PostMeta[] }) {
  const { theme } = useTheme()
  const isTerminal = theme === 'terminal'

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort()
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts

  if (!isTerminal) return <ClassicBlog posts={filtered} allTags={allTags} activeTag={activeTag} setActiveTag={setActiveTag} />

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
      <TerminalWindow title="prateek@portfolio: ~/blog">
        <PromptLine command="ls posts/ --sort=date" />

        {/* Tag filter */}
        {allTags.length > 0 && (
          <div className="my-3 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setActiveTag(null)}
              className="px-2 py-0.5 border transition-colors"
              style={{
                borderColor: activeTag === null ? 'var(--text-primary)' : 'var(--border)',
                color: activeTag === null ? 'var(--text-primary)' : 'var(--text-muted)',
              }}
            >
              all
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className="px-2 py-0.5 border transition-colors"
                style={{
                  borderColor: activeTag === tag ? 'var(--accent)' : 'var(--border)',
                  color: activeTag === tag ? 'var(--accent)' : 'var(--text-muted)',
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Post list */}
        {filtered.length === 0 ? (
          <div className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            No posts found.
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block hover:opacity-80 transition-opacity"
              >
                <div
                  className="p-3 border text-xs"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
                >
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                      {post.title}
                    </span>
                    <div className="flex gap-3 text-xs shrink-0" style={{ color: 'var(--text-muted)' }}>
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                  <p className="mt-1" style={{ color: 'var(--text-body)' }}>
                    {post.description}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {post.tags.map((t) => (
                        <span key={t} style={{ color: 'var(--accent)' }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6">
          <PromptLine command="" showCursor />
        </div>
      </TerminalWindow>
    </div>
  )
}

function ClassicBlog({
  posts,
  allTags,
  activeTag,
  setActiveTag,
}: {
  posts: PostMeta[]
  allTags: string[]
  activeTag: string | null
  setActiveTag: (t: string | null) => void
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
      <h1
        className="text-4xl font-bold mb-4"
        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-secondary)' }}
      >
        Blog
      </h1>
      <div className="h-1 w-20 rounded mb-8" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className="px-3 py-1 text-sm rounded-full border transition-colors"
            style={{
              borderColor: activeTag === null ? 'var(--accent)' : 'var(--border)',
              color: activeTag === null ? 'var(--accent)' : 'var(--text-muted)',
              background: activeTag === null ? `var(--accent)20` : 'transparent',
            }}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className="px-3 py-1 text-sm rounded-full border transition-colors"
              style={{
                borderColor: activeTag === tag ? 'var(--accent)' : 'var(--border)',
                color: activeTag === tag ? 'var(--accent)' : 'var(--text-muted)',
                background: activeTag === tag ? `var(--accent)20` : 'transparent',
                fontFamily: 'var(--font-primary)',
              }}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <div
              className="p-6 rounded-xl border transition-all hover:shadow-md"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2
                  className="text-xl font-semibold group-hover:text-indigo-500 transition-colors"
                  style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-secondary)' }}
                >
                  {post.title}
                </h2>
              </div>
              <p className="text-sm mb-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-primary)' }}>
                {post.description}
              </p>
              <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-primary)' }}>
                <span>{formatDate(post.date)}</span>
                <span>{post.readingTime}</span>
                {post.tags.map((t) => (
                  <span key={t} style={{ color: 'var(--accent)' }}>#{t}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
