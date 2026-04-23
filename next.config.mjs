import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.gloatlaundry.com' }],
      destination: 'https://gloatlaundry.com/:path*',
      permanent: true,
    },
  ],
};

export default withNextIntl(nextConfig);
