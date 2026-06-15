import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.178.68', 'localhost'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;