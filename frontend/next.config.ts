import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
    allowedDevOrigins: [
    '192.168.1.19',
    '172.30.112.1',
  ],
};

export default nextConfig;
