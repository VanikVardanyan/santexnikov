import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "valfex.ru",
        port: "",
        pathname: "/upload/**",
      },
      {
        protocol: "http",
        hostname: "valfex.ru",
        port: "",
        pathname: "/upload/**",
      },
    ],
  },
};

export default nextConfig;
