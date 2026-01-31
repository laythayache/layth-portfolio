import { getProjectBySlug } from "@/lib/projectConfig";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useProjectTheme from "@/hooks/useProjectTheme";
import OmnisignNavbar from "@/components/Omnisign/OmnisignNavbar";
import ContactPage from "@/components/Omnisign/ContactPage";
import Footer from "@/components/Omnisign/Footer";

const OmnisignContact = () => {
  const project = getProjectBySlug("omnisign");

  useDocumentTitle(project ? `Contact — ${project.title} — Layth Ayache` : "Contact — Layth Ayache");
  useProjectTheme(project);

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
