import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjectBySlug } from "@/lib/projectConfig";
import { ArrowLeft } from "lucide-react";
import OmnisignNavbar from "@/components/Omnisign/OmnisignNavbar";
import HeroSection from "@/components/Omnisign/HeroSection";
import FeaturesSection from "@/components/Omnisign/FeaturesSection";
import DemoSection from "@/components/Omnisign/DemoSection";
import HowItWorksSection from "@/components/Omnisign/HowItWorksSection";
import AudienceSection from "@/components/Omnisign/AudienceSection";
import TestimonialsSection from "@/components/Omnisign/TestimonialsSection";
import CTASection from "@/components/Omnisign/CTASection";
import Footer from "@/components/Omnisign/Footer";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Layth Ayache`;

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-mono text-2xl mb-4">Project not found</h1>
          <Link to="/" className="nav-link">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  // Render full Omnisign microsite
  if (project.slug === "omnisign") {
    return (
      <div className="min-h-screen" style={{ backgroundColor: `hsl(${project.background})`, color: `hsl(${project.foreground})` }}>
        <OmnisignNavbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <DemoSection />
          <HowItWorksSection />
          <AudienceSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    );
  }

  // Default project detail page for other projects
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 bg-background"
    >
      <div className="container mx-auto px-6">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Link
            to={project.status === "completed" ? "/completed" : "/ongoing"}
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to {project.status}
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-sm text-muted-foreground">
              {project.year}
            </span>
            <span className="text-border">•</span>
            <span className="font-mono text-sm capitalize text-muted-foreground">
              {project.status}
            </span>
          </div>
          <h1 className="font-mono text-5xl md:text-6xl lg:text-7xl font-medium mb-8 text-foreground">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {project.description}
          </p>
        </motion.header>

        {/* Project Content */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl"
        >
          <div className="space-y-8 text-muted-foreground">
            <p>
              This is a microsite for {project.title}. The content here represents
              the journey, process, and outcomes of this project.
            </p>
            <p>
              Each project carries its own visual identity — a unique atmosphere
              that reflects the nature of the work and the problems it sought to solve.
            </p>
            <div className="py-8 border-y border-border/30">
              <p className="font-mono text-sm uppercase tracking-widest text-accent mb-4">
                Key Insight
              </p>
              <p className="text-foreground text-2xl font-medium leading-relaxed">
                "The most interesting problems are the ones that reveal themselves
                only through the process of building."
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
