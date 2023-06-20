/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.myanimelist.net"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
