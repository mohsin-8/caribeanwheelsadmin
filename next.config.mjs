/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // optional, only if you need Turbopack or other features
    serverActions: true,
  },
};

export default nextConfig;