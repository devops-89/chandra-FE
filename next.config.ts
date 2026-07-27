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
      // Customer dashboard URLs: /customer/dashboard/* → /dashboard/customer/*
      { source: '/customer/dashboard',                    destination: '/dashboard/customer' },
      { source: '/customer/dashboard/services/:path*',    destination: '/dashboard/customer/services/:path*' },
      { source: '/customer/dashboard/services',           destination: '/dashboard/customer/services' },
      { source: '/customer/dashboard/bookings/:path*',    destination: '/dashboard/customer/bookings/:path*' },
      { source: '/customer/dashboard/bookings',           destination: '/dashboard/customer/bookings' },
      { source: '/customer/dashboard/addresses/:path*',   destination: '/dashboard/customer/addresses/:path*' },
      { source: '/customer/dashboard/addresses',          destination: '/dashboard/customer/addresses' },
      { source: '/customer/dashboard/profile/:path*',     destination: '/dashboard/customer/profile/:path*' },
      { source: '/customer/dashboard/profile',            destination: '/dashboard/customer/profile' },
      { source: '/customer/dashboard/invoices/:path*',    destination: '/dashboard/customer/invoices/:path*' },
      { source: '/customer/dashboard/invoices',           destination: '/dashboard/customer/invoices' },
      { source: '/customer/dashboard/booking/:path*',     destination: '/dashboard/customer/booking/:path*' },
      { source: '/customer/dashboard/booking',            destination: '/dashboard/customer/booking' },
    ];
  },
};

export default nextConfig;
