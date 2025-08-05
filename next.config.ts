const createNextIntPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntPlugin();

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   domains: ["localhost", "res.cloudinary.com"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // For all Cloudinary subdomains if needed:
        // hostname: '**.cloudinary.com',
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
