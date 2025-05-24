import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
