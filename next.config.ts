import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      'efficient-broccoli-2b394a2b5e.strapiapp.com',
      'efficient-broccoli-2b394a2b5e.media.strapiapp.com',
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
