import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@i-career/ui", "@i-career/utils", "@i-career/types"],
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "3000" },
      { protocol: "http", hostname: "localhost", port: "4000" },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
