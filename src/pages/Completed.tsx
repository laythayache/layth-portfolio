import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getCompletedProjects } from "@/lib/projectConfig";
import { ArrowRight } from "lucide-react";

const Completed = () => {
  const projects = getCompletedProjects();

  useEffect(() => {
    document.title = "Completed — Layth Ayache";
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
            Completed
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Projects that have reached resolution. Each one a lesson encoded in time.
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
                  <span className="font-mono text-sm text-muted-foreground">
                    {project.year}
                  </span>
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

        {/* Empty state */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="font-mono text-muted-foreground">
              No completed projects yet.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Completed;
