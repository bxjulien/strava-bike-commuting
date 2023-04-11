/** @type {import('next').NextConfig} */
const { env } = require('./config');

const nextConfig = {
  experimental: {
    appDir: true,
  },
  env,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

module.exports = nextConfig
