import "./src/env.mjs";
module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});
