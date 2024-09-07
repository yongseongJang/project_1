/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['ko_KR', 'ja_JP', 'en_US'],
    defaultLocale: 'ko_KR',
    domains: [
      {
        domain: '*/en',
        defaultLocale: 'en_US',
      },
      {
        domain: '*/ja',
        defaultLocale: 'ja_JP',
      },
      {
        domain: '*/',
        defaultLocale: 'ko_KR',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
};

export default nextConfig;
