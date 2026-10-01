import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // pin the workspace root so Next doesn't pick up an unrelated parent lockfile
  outputFileTracingRoot: path.resolve("."),
  poweredByHeader: false,
  images: {
    // Every image in /public is pre-optimised to WebP at its display size
    // (scripts/optimize-images.mjs), so serve the files straight from the CDN.
    // Vercel's on-demand optimiser took 10-18 s per image on a cold cache and
    // counts against the plan's transformation quota.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
      {
        // images in /public: let repeat visitors reuse them for a day without
        // re-checking, then refresh quietly in the background
        source: "/:path*.:ext(webp|png|jpg|jpeg|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
