import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  twitterCard?: "summary" | "summary_large_image";
  jsonLd?: object | object[];
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage = "https://laythayache.com/apple-touch-icon.png",
  ogImageWidth = 1200,
  ogImageHeight = 630,
  twitterCard = "summary_large_image",
  jsonLd,
}: SEOProps) {
  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:site_name" content="Layth Ayache" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLdArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
}
