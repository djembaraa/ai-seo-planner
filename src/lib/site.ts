const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const vercelSiteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

export const SITE_URL = configuredSiteUrl || vercelSiteUrl || "http://localhost:3000";

export const SITE_NAME = "AI SEO Content Planner";