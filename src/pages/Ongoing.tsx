import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getOngoingProjects } from "@/lib/projectConfig";
import { ArrowRight, Circle } from "lucide-react";

const Ongoing = () => {
  const projects = getOngoingProjects();

  useEffect(() => {
    document.title = "Ongoing — Layth Ayache";
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="font-mono text-4xl md:text-5xl font-medium mb-4 text-foreground">
            Ongoing
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Works in progress. Ideas taking shape. The future being written.
          </p>
        </motion.header>

        {/* Project Grid */}
        <div className="grid gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group block p-8 border border-border rounded-lg hover:border-foreground/30 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Circle size={8} className="text-accent fill-accent animate-pulse" />
                    <span className="font-mono text-sm text-muted-foreground">
                      Active
                    </span>
                  </div>
                  <motion.div
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </div>
                <h2 className="font-mono text-2xl md:text-3xl font-medium mb-3 text-foreground group-hover:text-foreground transition-colors">
                  {project.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Ideas Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-24 pt-16 border-t border-border"
        >
          <h2 className="font-mono text-2xl font-medium mb-8 text-foreground">
            Ideas
          </h2>
          <div className="grid gap-4">
            {["Temporal interfaces", "Memory architecture", "Distributed cognition"].map(
              (idea, index) => (
                <motion.div
                  key={idea}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="py-4 border-b border-border/50 last:border-0"
                >
                  <p className="font-mono text-muted-foreground">
                    <span className="text-accent mr-4">→</span>
                    {idea}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Ongoing;
