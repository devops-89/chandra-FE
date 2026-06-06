import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
    allowedDevOrigins: [
    '192.168.1.16'
  ],
};

export default nextConfig;
