import { motion, useReducedMotion } from "framer-motion";
import {
  Boxes,
  Eye,
  Workflow,
  Compass,
  ServerCog,
  ArrowRight,
} from "lucide-react";
import { useCallback } from "react";
import { useLenis } from "@/motion/LenisProvider";

interface Service {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  blurb: string;
  signals: string[];
}

const SERVICES: Service[] = [
  {
    id: "ai-architecture",
    icon: Boxes,
    title: "AI System Architecture",
    blurb:
      "Designing production AI systems from data ingestion to deployment — with clear data flow, measurable reliability, and constraints defined upfront.",
    signals: ["Discovery → architecture", "Reliability budgets", "Deployment strategy"],
  },
  {
    id: "computer-vision",
    icon: Eye,
    title: "Computer Vision Systems",
    blurb:
      "Detection, recognition, OCR, and edge inference for real-world video pipelines — including low-light, motion blur, and on-device deployment.",
    signals: ["YOLOv8 / OpenCV", "ONNX edge runtime", "Privacy-aware pipelines"],
  },
  {
    id: "data-automation",
    icon: Workflow,
    title: "Data & Automation Pipelines",
    blurb:
      "Cleaning, classifying, indexing, and connecting messy operational data — with auditability and graceful failure modes built in.",
    signals: ["ETL design", "Web scraping at scale", "CRM / SaaS integration"],
  },
  {
    id: "discovery",
    icon: Compass,
    title: "Technical Discovery",
    blurb:
      "Turning unclear business problems into scoped systems, architecture, and execution plans before a line of production code is written.",
    signals: ["Constraint mapping", "Architecture review", "Build-vs-buy analysis"],
  },
  {
    id: "infra-aware-ai",
    icon: ServerCog,
    title: "Infrastructure-Aware AI",
    blurb:
      "Designing systems for unstable networks, limited hardware, privacy constraints, and local-first deployments — engineered for the field, not the lab.",
    signals: ["Local-first inference", "Async sync patterns", "Zero-cloud options"],
  },
];

export default function ServicesSection() {
  const reduced = useReducedMotion();
  const lenis = useLenis();

  const scrollToContact = useCallback(() => {
    if (lenis) {
      lenis.scrollTo("#contact", { offset: -84 });
      return;
    }
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, [lenis]);

  return (
    <section
      id="services"
      className="section-shell relative px-6"
      aria-labelledby="services-heading"
    >
      <div
        className="system-grid-bg pointer-events-none absolute inset-0 opacity-25"
        aria-hidden="true"
      />
      <motion.div
        className="relative mx-auto max-w-6xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
        }}
      >
        <motion.div
          className="mb-10"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
            <span className="text-leather">—</span> no. 02 / services
          </p>
          <h2
            id="services-heading"
            className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-text-primary"
          >
            Engineered for the field, not the lab.
          </h2>
          <div aria-hidden="true" className="mt-4 h-[2px] w-14 bg-leather" />
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] text-text-secondary">
            Five engagement shapes — built around what production AI actually
            requires: scoped problems, reliability budgets, and architecture that
            survives the constraints of real environments.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                className="card-lift group relative flex flex-col rounded-md border border-border bg-surface-raised p-6"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-accent/10 p-2 text-accent">
                    <Icon size={18} aria-hidden />
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                    Service
                  </p>
                </div>
                <h3 className="type-h3 mt-4">{service.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {service.blurb}
                </p>
                <ul className="mt-5 space-y-1.5 border-t border-border pt-4">
                  {service.signals.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted"
                    >
                      <span aria-hidden="true" className="h-px w-3 bg-accent/60" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            data-magnetic
            data-cursor-label="Discuss a system"
          >
            Discuss a System
            <ArrowRight size={14} aria-hidden />
          </button>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md border border-text-primary/70 bg-transparent px-7 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-text-primary hover:text-surface-raised"
          >
            View Case Studies
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
