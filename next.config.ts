import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: [
    '172.20.10.3'
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
      // Customer dashboard short URLs
      { source: '/dashboard/services/:path*', destination: '/dashboard/customer/services/:path*' },
      { source: '/dashboard/services',        destination: '/dashboard/customer/services' },
      { source: '/dashboard/bookings/:path*', destination: '/dashboard/customer/bookings/:path*' },
      { source: '/dashboard/bookings',        destination: '/dashboard/customer/bookings' },
      { source: '/dashboard/addresses/:path*',destination: '/dashboard/customer/addresses/:path*' },
      { source: '/dashboard/addresses',       destination: '/dashboard/customer/addresses' },
      { source: '/dashboard/profile/:path*',  destination: '/dashboard/customer/profile/:path*' },
      { source: '/dashboard/profile',         destination: '/dashboard/customer/profile' },
      { source: '/dashboard/invoices/:path*', destination: '/dashboard/customer/invoices/:path*' },
      { source: '/dashboard/invoices',        destination: '/dashboard/customer/invoices' },
      { source: '/dashboard/booking/:path*',  destination: '/dashboard/customer/booking/:path*' },
      { source: '/dashboard/booking',         destination: '/dashboard/customer/booking' },
    ];
  },
};

export default nextConfig;
