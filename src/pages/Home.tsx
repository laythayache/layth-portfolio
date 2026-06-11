import { useEffect } from "react";
import SEO from "@/components/SEO";
import { useLenis } from "@/motion/LenisProvider";
import HeroSection from "@/components/sections/HeroSection";
import TrustedBySection from "@/components/sections/TrustedBySection";
import ServicesSection from "@/components/sections/ServicesSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SpeakingSection from "@/components/sections/SpeakingSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
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

  // Scroll to hash target after lazy-load mount (e.g. /#trusted, /#contact)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const timer = setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(`#${hash}`, { offset: -84 });
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [lenis]);

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
      <div className="relative z-10">
        <HeroSection />
        <div className="section-divider" aria-hidden="true" />
        <TrustedBySection />
        <div className="section-divider" aria-hidden="true" />
        <ExperienceSection />
        <div className="section-divider" aria-hidden="true" />
        <ProjectsSection />
        <div className="section-divider" aria-hidden="true" />
        <ServicesSection />
        <div className="section-divider" aria-hidden="true" />
        <CertificationsSection />
        <div className="section-divider" aria-hidden="true" />
        <SpeakingSection />
        <div className="section-divider" aria-hidden="true" />
        <ContactSection />
      </div>
    </>
  );
}
