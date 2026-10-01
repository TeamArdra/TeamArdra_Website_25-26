import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // pin the workspace root so Next doesn't pick up an unrelated parent lockfile
  outputFileTracingRoot: path.resolve("."),
  images: {
    // Every image in /public is pre-optimised to WebP at its display size
    // (scripts/optimize-images.mjs), so serve the files straight from the CDN.
    // Vercel's on-demand optimiser took 10-18 s per image on a cold cache and
    // counts against the plan's transformation quota.
    unoptimized: true,
  },
};

export default nextConfig;
