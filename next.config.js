const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  //   typescript: {
  //     // !! WARN !!
  //     // Dangerously allow production builds to successfully complete even if
  //     // your project has type errors.
  //     // !! WARN !!
  //     ignoreBuildErrors: true,
  //   },
  // eslint:{
  //     ignoreDuringBuilds: true,
  //   },
  // output: 'export',
  // images: {
  //   unoptimized: true,
  // },
  images: {
    domains: ['i.ibb.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },
};

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
