/** @type {import('next').NextConfig} */
const nextConfig = {
  env : {
    REGION: process.env.REGION
  },
  reactStrictMode: true,
  output: 'standalone',
}

module.exports = nextConfig
