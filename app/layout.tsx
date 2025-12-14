import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://laythayache.com"),
  title: "Reality Resilience | System Operational",
  description: "A living systems diagram exposing its internals gradually.",
  keywords: ["AI Engineer", "Machine Learning", "Computer Vision", "NLP", "ML Engineer", "Data Analyst"],
  authors: [{ name: "Layth Ayache" }],
  openGraph: {
    title: "Layth Ayache | AI Engineer | Computer Vision & NLP",
    description: "AI Engineer specializing in Computer Vision, NLP, and end-to-end ML pipelines.",
    url: "https://laythayache.com",
    siteName: "Layth Ayache Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Layth Ayache Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layth Ayache | AI Engineer",
    description: "AI Engineer specializing in Computer Vision, NLP, and end-to-end ML pipelines.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Layth Ayache",
              jobTitle: "AI Engineer",
              description: "AI Engineer specializing in Computer Vision, NLP, and end-to-end ML pipelines",
              url: "https://laythayache.com",
              sameAs: [
                "https://github.com/laythayache",
                "https://linkedin.com/in/laythayache",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Layth Ayache Portfolio",
              url: "https://laythayache.com",
              author: {
                "@type": "Person",
                name: "Layth Ayache",
              },
            }),
          }}
        />
      </head>
      <body className="bg-black text-white font-mono">
        {children}
      </body>
    </html>
  );
}

