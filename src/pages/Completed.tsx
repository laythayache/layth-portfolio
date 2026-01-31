import { motion } from "framer-motion";
import { getCompletedProjects } from "@/lib/projectConfig";
import ProjectCard from "@/components/ProjectCard";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const Completed = () => {
  const projects = getCompletedProjects();

  useDocumentTitle("Completed — Layth Ayache");

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
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

        <div className="grid gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              animate="onMount"
            />
          ))}
        </div>

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
