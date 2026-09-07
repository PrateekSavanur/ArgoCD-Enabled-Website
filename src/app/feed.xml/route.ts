import { getAllPosts } from '@/lib/posts'
import { Feed } from 'feed'

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://prateek.dev'
  const authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME || 'Prateek Prasanna Savanur'

  const feed = new Feed({
    title: `${authorName} — Blog`,
    description: 'Writing about DevOps, Linux, homelabs, and content creation.',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
    author: {
      name: authorName,
      link: siteUrl,
    },
    copyright: `© ${new Date().getFullYear()} ${authorName}`,
    updated: new Date(),
  })

  const posts = getAllPosts()

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      category: post.tags.map((tag) => ({ name: tag })),
    })
  })

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
