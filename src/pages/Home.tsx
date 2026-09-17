import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEO from "@/components/SEO";
import { useLenis } from "@/motion/LenisProvider";
import CreativePortfolio from "@/components/portfolio/CreativePortfolio";
import { DEFAULT_KEYWORDS, homePageJsonLd } from "@/content/siteSeo";
import { projects } from "@/content/projects";
import { getAllPosts } from "@/content/posts";
import { BRAND } from "@/content/brand";

const latestModified = [
  ...projects.map((p) => p.updated_at),
  ...getAllPosts().map((p) => p.date),
]
  .sort()
  .pop();

export default function Home() {
  const lenis = useLenis();
  const location = useLocation();

  // Scroll to hash target after lazy-load mount (e.g. /#trusted, /#contact)
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (!hash) return;
    const timer = setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(`#${hash}`, { offset: -84 });
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [lenis, location.hash]);

  return (
    <>
      <SEO
        title={`${BRAND.name} | ${BRAND.title}`}
        description={BRAND.description}
        canonical="https://laythayache.com/"
        keywords={DEFAULT_KEYWORDS}
        modifiedTime={latestModified}
        jsonLd={homePageJsonLd()}
      />
      <CreativePortfolio />
    </>
  );
}
