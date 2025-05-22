import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */

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
