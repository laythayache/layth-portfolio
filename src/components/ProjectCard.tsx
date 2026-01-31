import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Circle } from "lucide-react";
import type { ProjectConfig } from "@/lib/projectConfig";

interface ProjectCardProps {
  project: ProjectConfig;
  index: number;
  animate?: "onView" | "onMount";
}

const ProjectCard = ({ project, index, animate = "onView" }: ProjectCardProps) => {
  const animationProps =
    animate === "onView"
      ? {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: { duration: 0.6, delay: index * 0.1 },
        }
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: index * 0.1 },
        };

  return (
    <motion.article {...animationProps}>
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
            <span className="text-border" aria-hidden="true">
              &bull;
            </span>
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
  );
};

export default ProjectCard;
