import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AI SEO Content Planner — Keyword Strategy Generator",
  description:
    "Generate comprehensive SEO content strategies powered by AI. Get search intent analysis, keyword clusters, content outlines, and meta data in seconds.",
  keywords: [
    "SEO content planner",
    "keyword strategy",
    "AI SEO",
    "content outline generator",
    "search intent analysis",
  ],
  openGraph: {
    title: "AI SEO Content Planner",
    description:
      "Generate comprehensive SEO content strategies powered by AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
