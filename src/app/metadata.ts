import type { Metadata } from "next";

const siteUrl = "https://laythayache.com";
const siteName = "Layth Ayache";
const siteDescription = "AI, ML, Computer Vision, and NLP engineer specializing in security and digital infrastructure. Building systems that fail gracefully under pressure for government, healthcare, and public services.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Layth Ayache | AI, ML, Computer Vision & NLP Engineer",
    template: "%s | Layth Ayache",
  },
  description: siteDescription,
  keywords: [
    "Layth Ayache",
    "Layth",
    "Ayache",
    "AI engineer",
    "machine learning",
    "ML engineer",
    "computer vision",
    "CV engineer",
    "NLP engineer",
    "natural language processing",
    "artificial intelligence",
    "deep learning",
    "neural networks",
    "security engineer",
    "digital infrastructure",
    "government technology",
    "healthcare technology",
    "system architecture",
    "embedded systems",
    "networking",
    "deployment",
    "HIPAA compliance",
    "threat modeling",
    "resilient systems",
  ],
  authors: [{ name: "Layth Ayache" }],
  creator: "Layth Ayache",
  publisher: "Layth Ayache",
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
    url: siteUrl,
    siteName: siteName,
    title: "Layth Ayache | AI, ML, Computer Vision & NLP Engineer",
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/logo/emblem.png`,
        width: 1200,
        height: 630,
        alt: "Layth Ayache - AI, ML, CV & NLP Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Layth Ayache | AI, ML, Computer Vision & NLP Engineer",
    description: siteDescription,
    creator: "@laythayache",
    images: [`${siteUrl}/logo/emblem.png`],
  },
  icons: {
    icon: [
      { url: "/logo/emblem.svg", type: "image/svg+xml" },
      { url: "/logo/emblem.png", type: "image/png", sizes: "32x32" },
      { url: "/logo/emblem.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/logo/emblem.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logo/emblem.svg",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  verification: {
    google: "", // Add your Google Search Console verification code
  },
  other: {
    "google-site-verification": "", // Alternative Google verification method
  },
};

