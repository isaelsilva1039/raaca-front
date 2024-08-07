/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'racca.store',
        pathname: '/api/racca/profissional/avatar/**',
      },
    ],
  },
}

module.exports = nextConfig;
