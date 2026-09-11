import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI SEO Content Planner",
    short_name: "SEO Planner",
    description:
      "Generate comprehensive SEO content strategies powered by AI. Search intent, keyword clusters, content outlines, and meta data.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F7",
    theme_color: "#D97706",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
