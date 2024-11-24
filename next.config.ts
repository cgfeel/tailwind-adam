import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gips3.baidu.com'
      },
      {
        protocol: "https",
        hostname: "groupchatavatar.s3.us-east-2.amazonaws.com"
      }
    ],
    // loader: 'custom',
    // loaderFile: './src/loader.js'
  },
};

export default nextConfig;
