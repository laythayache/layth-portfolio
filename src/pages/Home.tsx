import SEO from "@/components/SEO";
import Hero from "@/components/landing/Hero";
import Manifesto from "@/components/landing/Manifesto";
import Systems from "@/components/landing/Systems";
import Experiments from "@/components/landing/Experiments";
import PhilosophyFooter from "@/components/landing/PhilosophyFooter";
import { DEFAULT_KEYWORDS, homePageJsonLd } from "@/content/siteSeo";

export default function Home() {
  return (
    <>
      <SEO
        title="Layth Ayache | AI Infrastructure Engineer"
        description="AI infrastructure engineer in Lebanon building decision systems, multilingual AI, and production-grade data infrastructure."
        canonical="https://laythayache.com/"
        keywords={DEFAULT_KEYWORDS}
        modifiedTime="2026-02-16"
        jsonLd={homePageJsonLd()}
      />
      <div className="-mt-16">
        <Hero />
        <Manifesto />
        <Systems />
        <Experiments />
        <PhilosophyFooter />
      </div>
    </>
  );
}
