import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Free AI-Powered SEO Strategy Generator`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Generate comprehensive SEO content strategies in seconds. Get search intent analysis, keyword clusters, content outlines, meta data, and article titles powered by AI.",
  authors: [{ name: "AI SEO Content Planner" }],
  creator: "AI SEO Content Planner",
  publisher: "AI SEO Content Planner",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Free AI-Powered SEO Strategy Generator`,
    description:
      "Generate comprehensive SEO content strategies in seconds. Search intent, keyword clusters, content outlines, and meta data — all powered by AI.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI SEO Content Planner — Generate SEO strategies with AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Free AI-Powered SEO Strategy Generator`,
    description:
      "Generate comprehensive SEO content strategies in seconds. Search intent, keyword clusters, content outlines, and meta data — all powered by AI.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  description:
    "Free AI-powered tool to generate comprehensive SEO content strategies including search intent, keyword clusters, content outlines, and meta data.",
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Search intent analysis",
    "Related and long-tail keyword generation",
    "SEO-friendly content ideas and titles",
    "Content outline generation",
    "Meta title and description optimization",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
