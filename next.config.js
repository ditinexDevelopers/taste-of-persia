/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'api.goodnesslandboise.com']
  },
  distDir: 'build'
};

module.exports = nextConfig;
