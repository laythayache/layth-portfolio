import { motion } from "framer-motion";
import { getOngoingProjects } from "@/lib/projectConfig";
import ProjectCard from "@/components/ProjectCard";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const Ongoing = () => {
  const projects = getOngoingProjects();

  useDocumentTitle("Ongoing — Layth Ayache");

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
            Ongoing
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Works in progress. Ideas taking shape. The future being written.
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

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-24 pt-16 border-t border-border"
          aria-label="Ideas"
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
                    <span className="text-accent mr-4" aria-hidden="true">&rarr;</span>
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
