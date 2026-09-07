/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [],
  },
  // Disable the Next.js 15.5.x dev overlay (SegmentViewNode manifest bug)
  devIndicators: false,
};

export default nextConfig;
