/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'ui-avatars.com', 'www.gravatar.com'],
    unoptimized: true,
  },
  output: 'standalone',
}

module.exports = nextConfig 