import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: [
    '192.168.1.6'
  ],
  images: {
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.s3.eu-north-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.eu-north-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://13.53.114.78/api/:path*',
      },
    ];
  },
};

export default nextConfig;
