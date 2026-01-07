import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {
    // repo root (one level above /client)
    root: path.join(__dirname, '..'),
  },
  // keep these aligned (removes the warning you had earlier too)
  outputFileTracingRoot: path.join(__dirname, '..'),
};

export default nextConfig;
