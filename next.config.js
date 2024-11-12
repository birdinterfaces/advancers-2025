/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html',
      },
      {
        source: '/:path*',
        destination: '/:path*.html',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig 