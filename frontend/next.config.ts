/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5001/api/:path*',
      },
    ];
  },
};

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true, 
  reloadOnOnline: true,
  swcMinify: true, 
  disable: false, 
  workboxOptions: {
    disableDevLogs: true,
  },
});


module.exports = withPWA(nextConfig);