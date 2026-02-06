import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/simples-calc",
  assetPrefix: "/simples-calc",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
