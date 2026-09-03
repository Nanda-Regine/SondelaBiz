import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow WhatsApp/external images if you add real business photos later
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
    ],
  },
}

export default nextConfig
