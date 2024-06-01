// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Adicionado para permitir a exportação estática
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'racca.store',
        pathname: '/api/racca/profissional/avatar/**',
      },
    ],
  },
}

module.exports = nextConfig;
