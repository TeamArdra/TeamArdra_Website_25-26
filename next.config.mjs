import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // pin the workspace root so Next doesn't pick up an unrelated parent lockfile
  outputFileTracingRoot: path.resolve("."),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
