import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.r2.cloudflarestorage.com'
      }
    ]
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
