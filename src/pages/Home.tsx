import SEO from "@/components/SEO";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SpeakingSection from "@/components/sections/SpeakingSection";
import BlogSection from "@/components/sections/BlogSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import FAQSection from "@/components/sections/FAQSection";
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
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SpeakingSection />
        <BlogSection />
        <CertificationsSection />
        <FAQSection />
        <ContactSection />
      </div>
    </>
  );
}
