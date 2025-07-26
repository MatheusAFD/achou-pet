import type { NextConfig } from 'next'

import createWithBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = createWithBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    devtoolSegmentExplorer: true
  },
  output: 'standalone',
  images: {
    remotePatterns: [new URL('https://static.achou.pet/achou-pet/**')]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/sign-in',
        permanent: true
      }
    ]
  }
}

module.exports = withBundleAnalyzer(nextConfig)
