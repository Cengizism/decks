const hostnames = [
  'images.unsplash.com',
  'fabricweb.azureedge.net',
  'res-1.cdn.office.net',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: 'https',
      hostname,
    })),
  },
  experimental: {
    swcPlugins: [
      ['fluentui-next-appdir-directive', { paths: ['@griffel', '@fluentui'] }],
    ],
  },
};

export default nextConfig;
