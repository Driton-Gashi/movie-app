import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Tell Turbopack that the app root is the `client` folder,
  // so module resolution (like `tailwindcss`) uses `client/node_modules`
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
