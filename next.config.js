/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')

const nextConfig = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching,
  },
  reactStrictMode: true,
  swcMinify: true,
})

module.exports = nextConfig
