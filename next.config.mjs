import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // pin the workspace root so Next doesn't pick up an unrelated parent lockfile
  outputFileTracingRoot: path.resolve("."),
  images: {
    // Next 15.5+ rejects quality values not listed here (400 in production);
    // the drone cards request quality 100, so it must be allowed explicitly.
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
