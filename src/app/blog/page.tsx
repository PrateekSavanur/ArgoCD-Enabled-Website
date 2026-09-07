import { getAllPosts } from '@/lib/posts'
import { Metadata } from 'next'
import { BlogListClient } from './BlogListClient'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing about DevOps, Linux, homelabs, and content creation.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  return <BlogListClient posts={posts} />
}
