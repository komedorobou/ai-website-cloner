import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ai-website-cloner",
  images: { unoptimized: true },
};

export default nextConfig;
