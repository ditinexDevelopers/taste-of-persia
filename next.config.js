/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'api.thetasteofpersia.com']
  }
};

module.exports = nextConfig;
