import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  logging: {
    fetches: {
      fullUrl: true
    }
  },
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

export default nextConfig
