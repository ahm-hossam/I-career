import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@i-career/ui", "@i-career/utils", "@i-career/types"],
  images: {
    remotePatterns: [{ protocol: "http", hostname: "localhost" }],
  },
};

export default nextConfig;
