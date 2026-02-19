import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Cpu,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

type FilterKey = "all" | "ai" | "embedded" | "medical" | "security";

interface FilterOption {
  key: FilterKey;
  label: string;
}

const FILTERS: FilterOption[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI" },
  { key: "embedded", label: "Embedded" },
  { key: "medical", label: "Medical" },
  { key: "security", label: "Security" },
];

function matchesFilter(projectTags: string[] | undefined, filter: FilterKey) {
  const tags = (projectTags ?? []).map((tag) => tag.toLowerCase());
  if (filter === "all") return true;
  if (filter === "ai") return tags.some((tag) => tag.includes("ai"));
  if (filter === "embedded") {
    return tags.some((tag) => tag.includes("embedded") || tag.includes("iot"));
  }
  if (filter === "medical") {
    return tags.some((tag) => tag.includes("medical"));
  }
  return tags.some((tag) => tag.includes("security"));
}

function getProjectIcon(projectTags: string[] | undefined) {
  const tags = (projectTags ?? []).map((tag) => tag.toLowerCase());
  if (tags.some((tag) => tag.includes("medical"))) return Stethoscope;
  if (tags.some((tag) => tag.includes("embedded") || tag.includes("iot")))
    return Cpu;
  if (tags.some((tag) => tag.includes("security"))) return ShieldCheck;
  return Brain;
}

export default function ProjectsSection() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const featured = useMemo(
    () => projects.filter((project) => project.featured),
    []
  );

  const filteredProjects = useMemo(
    () =>
      featured.filter((project) => matchesFilter(project.tags, activeFilter)),
    [activeFilter, featured]
  );
  const totalSlides = filteredProjects.length;

  const goToSlide = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || totalSlides === 0) return;
      const bounded = ((index % totalSlides) + totalSlides) % totalSlides;
      setActiveIndex(bounded);
      track.scrollTo({
        left: bounded * track.clientWidth,
        behavior: "smooth",
      });
    },
    [totalSlides]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollTo({ left: 0, behavior: "auto" });
    setActiveIndex(0);
  }, [activeFilter]);

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
          className="type-h2 text-center"
          initial={reduced ? undefined : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Featured Projects
        </motion.h2>
        <motion.p
          className="type-body mx-auto mt-4 max-w-3xl text-center"
          initial={reduced ? undefined : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Filter by domain and browse case studies. Each card links to a full
          project page with scope, architecture, and outcomes.
        </motion.p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                activeFilter === filter.key
                  ? "border-accent bg-accent text-white"
                  : "border-border-strong bg-surface-raised text-text-secondary hover:border-accent hover:text-accent"
              )}
              aria-pressed={activeFilter === filter.key}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <p className="mt-8 text-center text-base text-text-secondary">
            No projects match this filter yet.
          </p>
        ) : (
          <div className="mt-10" role="region" aria-label="Projects carousel">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="type-caption">Swipe or use arrow keys</p>
              {totalSlides > 1 && (
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
              )}
            </div>

            <div
              ref={trackRef}
              onKeyDown={handleCarouselKeyDown}
              tabIndex={0}
              className={cn(
                "carousel-track flex snap-x snap-mandatory overflow-x-auto rounded-2xl",
                "border border-border bg-surface-raised",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              )}
              aria-label="Use left and right arrow keys to browse projects"
            >
              {filteredProjects.map((project, index) => {
                const Icon = getProjectIcon(project.tags);
                return (
                  <article
                    key={project.slug}
                    className="w-full shrink-0 snap-center p-6 sm:p-8"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Project ${index + 1} of ${totalSlides}`}
                  >
                    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
                      <div className="relative overflow-hidden rounded-xl border border-border bg-surface-overlay">
                        <div className="aspect-[4/3] w-full">
                          {project.thumbnail ? (
                            <img
                              src={project.thumbnail}
                              alt={`${project.title} project thumbnail`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgb(7_108_100_/_0.18),transparent_45%),radial-gradient(circle_at_80%_80%,rgb(10_19_38_/_0.18),transparent_40%)]">
                              <Icon
                                size={54}
                                className="text-accent/80"
                                strokeWidth={1.5}
                                aria-hidden
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <h3 className="type-h3">{project.title}</h3>
                        <p className="mt-3 text-base leading-relaxed text-text-secondary">
                          {project.summary}
                        </p>
                        {project.stack && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.stack.split(", ").map((tech) => (
                              <span
                                key={`${project.slug}-${tech}`}
                                className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-5 flex flex-wrap gap-2">
                          {(project.tags ?? []).map((tag) => (
                            <span
                              key={`${project.slug}-tag-${tag}`}
                              className="rounded border border-border-strong bg-surface px-2.5 py-1 text-xs text-text-secondary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          to={`/projects/${project.slug}`}
                          data-magnetic
                          data-cursor-label="Open project"
                          className="mt-7 inline-flex w-fit items-center gap-2 rounded-md border border-accent px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
                        >
                          Open Case Study
                          <ArrowRight size={14} aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {totalSlides > 1 && (
              <div
                className="mt-4 flex items-center justify-center gap-2"
                aria-label="Carousel pagination"
              >
                {filteredProjects.map((project, index) => (
                  <button
                    key={`dot-${project.slug}`}
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
            )}
          </div>
        )}
      </div>
    </section>
  );
}
