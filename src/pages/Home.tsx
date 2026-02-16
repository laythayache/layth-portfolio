import SEO from "@/components/SEO";
import Hero from "@/components/landing/Hero";
import LabPreview from "@/components/landing/LabPreview";
import ExperimentsPreview from "@/components/landing/ExperimentsPreview";
import ThinkingPreview from "@/components/landing/ThinkingPreview";
import SiteFooter from "@/components/landing/SiteFooter";
import { DEFAULT_KEYWORDS, homePageJsonLd } from "@/content/siteSeo";

export default function Home() {
  return (
    <>
      <SEO
        title="Layth Ayache | AI Infrastructure Engineer"
        description="AI infrastructure engineer documenting the process of building serious systems from unstable ground. Projects, failures, iterations, thinking."
        canonical="https://laythayache.com/"
        keywords={DEFAULT_KEYWORDS}
        modifiedTime="2026-02-16"
        jsonLd={homePageJsonLd()}
      />
      <div className="-mt-16">
        <Hero />
        <LabPreview />
        <ExperimentsPreview />
        <ThinkingPreview />
        <SiteFooter />
      </div>
    </>
  );
}
