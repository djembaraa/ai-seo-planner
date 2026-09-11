import { ImageResponse } from "next/og";

export const alt = "AI SEO Content Planner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0F172A",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        width: "100%",
        height: "100%",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ color: "#D97706", fontSize: 28, fontWeight: 700 }}>
        AI-POWERED SEO STRATEGY
      </div>
      <div style={{ fontSize: 76, fontWeight: 800, marginTop: 24 }}>
        Content plans that rank.
      </div>
      <div style={{ color: "#94A3B8", fontSize: 30, marginTop: 32 }}>
        Search intent, keyword clusters, outlines, and metadata.
      </div>
    </div>,
    size
  );
}