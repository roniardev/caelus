import './src/env.mjs';
import createMDX from '@next/mdx';
import { createSecureHeaders } from 'next-secure-headers';
import remarkGfm from 'remark-gfm';
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from 'next/constants.js';

const hostnames = ['localhost:5173', 'roniar.dev'];

/** @type {import('next').NextConfig} */
export default async (phase) => {
  /** @type {import("next").NextConfig} */
  const nextConfig = {
    reactStrictMode: false,
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
      serverActions: {
        allowedOrigins: ['m97pj3q0-3000.asse.devtunnels.ms', 'localhost:3000'],
      },
      missingSuspenseWithCSRBailout: false,
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import('@serwist/next')).default({
      // Note: This is only an example. If you use Pages Router,
      // use something else that works, such as "service-worker/index.ts".
      swSrc: 'src/app/sw.ts',
      swDest: 'public/sw.js',
      reloadOnOnline: true,
      cacheOnNavigation: true,
      additionalPrecacheEntries: [{ url: '/~offline' }],
    });
    return withSerwist(nextConfig);
  }

  return nextConfig;
};
