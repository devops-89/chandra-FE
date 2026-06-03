import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
    allowedDevOrigins: [
    '172.30.112.1',
    '172.30.112.1',
    '192.168.1.21'
  ],
};

export default nextConfig;
