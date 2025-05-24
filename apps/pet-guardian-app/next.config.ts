import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
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
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/auth-sign-in'
      }
    ]
  }
}

export default nextConfig
