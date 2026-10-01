// Absolute site URL for link previews, robots and sitemap.
// On Vercel this follows whichever project is deploying (production domain);
// set NEXT_PUBLIC_SITE_URL to override, e.g. for a custom domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://ardraweb.vercel.app");

export const SITE_TITLE = "Team Ardra · SEDS VIT Vellore";
export const SITE_DESCRIPTION =
  "Team Ardra — the UAV team of SEDS VIT Vellore. Designing, building and flying autonomous drones. Throttling towards excellence.";
