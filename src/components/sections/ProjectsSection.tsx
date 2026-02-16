import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { projects } from "@/content/projects";
import { Link } from "react-router-dom";
import { ArrowRight, Code } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
};

interface MiniProject {
  title: string;
  description: string;
  tags: string[];
}

const miniProjects: MiniProject[] = [
  {
    title: "License Plate Recognition System",
    description:
      "Real-time license plate detection using YOLOv8 object detection with OCR pipeline for text extraction.",
    tags: ["YOLOv8", "OCR", "Python"],
  },
  {
    title: "Face Recognition System",
    description:
      "Real-time face identification using OpenCV with Haar cascades and Eigenfaces algorithms.",
    tags: ["OpenCV", "Python"],
  },
  {
    title: "Breast Cancer Detection Model",
    description:
      "Supervised ML classification model for breast cancer detection with feature engineering and preprocessing optimization.",
    tags: ["TensorFlow", "Scikit-learn"],
  },
  {
    title: "Home Security Embedded System",
    description:
      "IoT security system using PIR sensors, Arduino, and Bluetooth MAC detection with app-based activation.",
    tags: ["Arduino", "IoT", "Bluetooth"],
  },
  {
    title: "Network Security Infrastructure",
    description:
      "Enterprise network design with VLANs, VPNs, ASA firewalls, SSH, DHCP, and sub-VLAN configuration.",
    tags: ["Cisco", "VLANs", "Firewalls"],
  },
];

export default function ProjectsSection() {
  const reduced = useReducedMotion();
  const omnisign = projects.find((p) => p.slug === "omnisign") ?? projects[0];

  return (
    <section id="projects" className="bg-surface-overlay px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="text-center font-serif text-3xl font-bold text-text-primary"
          initial={reduced ? undefined : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
        >
          Projects
        </motion.h2>

        {/* Featured project — OmniSign */}
        <motion.div
          className="mt-16 overflow-hidden rounded-lg border border-border bg-surface-raised"
          initial={reduced ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          <div className="flex flex-col md:flex-row">
            {/* Image placeholder */}
            <div className="flex w-full shrink-0 items-center justify-center bg-surface-overlay p-12 md:w-[300px]">
              <Code className="h-16 w-16 text-text-muted" strokeWidth={1} />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-6 md:p-8">
              <h3 className="font-serif text-xl font-semibold text-text-primary md:text-2xl">
                OmniSign &mdash; Lebanese Sign Language Translator
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {omnisign.summary}
              </p>

              {/* Tech tags */}
              {omnisign.stack && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {omnisign.stack.split(", ").map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <Link
                to="/projects/omnisign"
                className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent transition-colors hover:text-accent/80"
              >
                View Case Study
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Project grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {miniProjects.map((project) => (
            <motion.div
              key={project.title}
              className={cn(
                "rounded-lg border border-border bg-surface-raised p-6",
                "transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
              )}
              variants={reduced ? undefined : gridItem}
            >
              <h4 className="font-semibold text-text-primary">
                {project.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
