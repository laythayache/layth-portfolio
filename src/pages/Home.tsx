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

export default function Home() {
  return (
    <>
      <SEO
        title="Layth Ayache | AI Systems Engineer & Technical Consultant"
        description="AI systems engineer and technical consultant building AI infrastructure, automating workflows, and consulting for companies across telecom, finance, and healthcare. Based in Beirut."
        canonical="https://laythayache.com/"
        keywords={DEFAULT_KEYWORDS}
        modifiedTime="2026-02-16"
        jsonLd={homePageJsonLd()}
      />
      <div className="-mt-16">
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
