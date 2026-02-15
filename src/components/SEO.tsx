import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string | string[];
  canonical: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  twitterCard?: "summary" | "summary_large_image";
  twitterSite?: string;
  twitterCreator?: string;
  siteName?: string;
  locale?: string;
  author?: string;
  robots?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  jsonLd?: object | object[];
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage = "https://laythayache.com/apple-touch-icon.png",
  ogImageAlt = "Layth Ayache",
  ogImageWidth = 1200,
  ogImageHeight = 630,
  twitterCard = "summary_large_image",
  twitterSite,
  twitterCreator,
  siteName = "Layth Ayache",
  locale = "en_US",
  author = "Layth Ayache",
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  publishedTime,
  modifiedTime,
  noIndex = false,
  jsonLd,
}: SEOProps) {
  const resolvedKeywords = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords;
  const robotsContent = noIndex ? "noindex, nofollow" : robots;
  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {resolvedKeywords && <meta name="keywords" content={resolvedKeywords} />}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="author" content={author} />
      <meta name="creator" content={author} />
      <meta name="publisher" content={siteName} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {modifiedTime && <meta property="og:updated_time" content={modifiedTime} />}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && (
        <meta name="twitter:creator" content={twitterCreator} />
      )}

      {jsonLdArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
}
