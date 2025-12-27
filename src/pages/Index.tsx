import { useEffect } from "react";
import { Link } from "react-router-dom";
import WordLoader from "@/components/Home/WordLoader";
import ScrollIndicator from "@/components/Layout/Scrollindicator";
import Emblem from "@/components/UI/Emblem";
import { motion } from "framer-motion";
import { ArrowRight, Circle } from "lucide-react";
import { projects, getCompletedProjects, getOngoingProjects } from "@/lib/projectConfig";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "Layth Ayache — Public Learning";
  }, []);

  return (
    <>
      {/* Hero Section - Manifesto State */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Centered Emblem - Large */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-1 w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]"
        >
          <Emblem size="centered" className="w-full h-full" />
        </motion.div>

        {/* Word Loader */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full flex justify-center"
        >
          <WordLoader />
        </motion.div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Manifesto Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-center"
        >
          <h2 className="font-mono text-2xl md:text-3xl font-medium mb-8 text-foreground">
            Manifesto
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              This is not a portfolio. This is a timeline.
            </p>
            <p>
              Every project here exists in relation to time — when it was conceived, 
              how long it took to break, and what emerged from the fragments.
            </p>
            <p>
              Process is the product. Failure is data. 
              The only constant is forward motion.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="font-mono text-3xl md:text-4xl font-medium mb-4 text-foreground">
              Timeline
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A selection of work across time — completed, ongoing, and emerging.
            </p>
          </motion.div>

          {/* Featured Projects Grid */}
          <div className="grid gap-8 md:gap-12 mb-16">
            {projects.slice(0, 3).map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block p-8 border border-border rounded-lg hover:border-foreground/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {project.status === "ongoing" && (
                        <Circle size={8} className="text-accent fill-accent animate-pulse" />
                      )}
                      <span className="font-mono text-sm text-muted-foreground">
                        {project.year}
                      </span>
                      <span className="text-border">•</span>
                      <span className="font-mono text-sm capitalize text-muted-foreground">
                        {project.status}
                      </span>
                    </div>
                    <motion.div
                      className="text-muted-foreground group-hover:text-foreground transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </div>
                  <h3 className="font-mono text-2xl md:text-3xl font-medium mb-3 text-foreground group-hover:text-foreground transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/completed"
              className="group px-8 py-4 border border-border rounded-lg hover:border-foreground/30 transition-all duration-300 font-mono text-sm uppercase tracking-widest"
            >
              View Completed
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
            <Link
              to="/ongoing"
              className="group px-8 py-4 border border-border rounded-lg hover:border-foreground/30 transition-all duration-300 font-mono text-sm uppercase tracking-widest"
            >
              View Ongoing
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
            <Link
              to="/friends"
              className="group px-8 py-4 border border-border rounded-lg hover:border-foreground/30 transition-all duration-300 font-mono text-sm uppercase tracking-widest"
            >
              View Friends
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

    </>
  );
};

export default Index;
