import { useEffect } from "react";
import { getProjectBySlug } from "@/lib/projectConfig";
import OmnisignNavbar from "@/components/Omnisign/OmnisignNavbar";
import ContactPage from "@/components/Omnisign/ContactPage";
import Footer from "@/components/Omnisign/Footer";

const OmnisignContact = () => {
  const project = getProjectBySlug("omnisign");

  useEffect(() => {
    if (project) {
      document.title = `Contact — ${project.title} — Layth Ayache`;

      // Apply project-specific theming
      const root = document.documentElement;
      root.style.setProperty("--background", project.background);
      root.style.setProperty("--foreground", project.foreground);
      if (project.accent) {
        root.style.setProperty("--accent", project.accent);
      }

      return () => {
        // Reset to default theme on unmount
        root.style.removeProperty("--background");
        root.style.removeProperty("--foreground");
        root.style.removeProperty("--accent");
      };
    }
  }, [project]);

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: `hsl(${project.background})`, color: `hsl(${project.foreground})` }}>
      <OmnisignNavbar />
      <ContactPage />
      <Footer />
    </div>
  );
};

export default OmnisignContact;

