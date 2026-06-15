import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.178.68', 'localhost'],
  output: 'standalone',
};

export default nextConfig;