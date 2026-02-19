import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/motion/useMediaQuery";

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
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const mobileViewport = useMediaQuery("(max-width: 767px)");
  const mobileTuned = coarsePointer || mobileViewport;
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = miniProjects.length;
  const omnisign = projects.find((project) => project.slug === "omnisign") ?? projects[0];

  const goToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const bounded = ((index % totalSlides) + totalSlides) % totalSlides;
    const slideWidth = track.clientWidth;
    setActiveIndex(bounded);
    track.scrollTo({
      left: bounded * slideWidth,
      behavior: "smooth",
    });
  }, [totalSlides]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function handleScroll() {
      const current = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      setActiveIndex((previous) => (previous === current ? previous : current));
    }

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  function handleCarouselKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(activeIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(activeIndex - 1);
    }
  }

  return (
    <section id="projects" className="section-glass-alt section-shell px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-center font-serif text-3xl font-bold text-text-primary md:text-4xl"
          initial={reduced ? undefined : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Projects
        </motion.h2>

        <motion.article
          className="project-card-surface mt-14 overflow-hidden rounded-xl border border-border bg-surface-raised"
          initial={reduced ? undefined : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="flex w-full shrink-0 items-center justify-center bg-surface-overlay p-12 md:w-[320px]">
              <Code className="h-16 w-16 text-text-muted" strokeWidth={1} aria-hidden />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <h3 className="font-serif text-2xl font-semibold text-text-primary">
                OmniSign - Lebanese Sign Language Translator
              </h3>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                {omnisign.summary}
              </p>

              {omnisign.stack && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {omnisign.stack.split(", ").map((technology) => (
                    <span
                      key={technology}
                      className="rounded bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              )}

              <Link
                to="/projects/omnisign"
                data-magnetic
                data-cursor-label="Open Case Study"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-accent px-4 py-2 font-mono text-sm uppercase tracking-[0.12em] text-accent transition-colors hover:bg-accent hover:text-white"
              >
                View Case Study
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.article>

        <div className="mt-12" role="region" aria-label="Projects carousel">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="font-mono text-sm uppercase tracking-[0.16em] text-text-muted">
              More Projects
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToSlide(activeIndex - 1)}
                aria-label="Previous project"
                className="rounded-md border border-border-strong bg-surface-raised p-2 text-text-primary transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => goToSlide(activeIndex + 1)}
                aria-label="Next project"
                className="rounded-md border border-border-strong bg-surface-raised p-2 text-text-primary transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            onKeyDown={handleCarouselKeyDown}
            tabIndex={0}
            className={cn(
              "carousel-track flex snap-x snap-mandatory overflow-x-auto rounded-xl",
              "border border-border bg-surface-raised",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            )}
            aria-label="Use left and right arrow keys to browse projects"
          >
            {miniProjects.map((project, index) => (
              <article
                key={project.title}
                className="w-full shrink-0 snap-center p-6 sm:p-8"
                role="group"
                aria-roledescription="slide"
                aria-label={`Project ${index + 1} of ${totalSlides}`}
              >
                <h3 className="text-xl font-semibold text-text-primary">{project.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2" aria-label="Carousel pagination">
            {miniProjects.map((project, index) => (
              <button
                key={`dot-${project.title}`}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                aria-current={activeIndex === index}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all",
                  activeIndex === index
                    ? "w-6 bg-accent"
                    : "bg-border-strong hover:bg-accent/65"
                )}
              />
            ))}
          </div>

          {!mobileTuned && (
            <p className="mt-3 text-center text-sm text-text-muted">
              Tip: use arrow keys to navigate this carousel.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
