import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import { useLenis } from "@/motion/LenisProvider";
import { SECTION } from "@/motion/tokens";

export default function HeroSection() {
  const reduced = useReducedMotion();
  const lenis = useLenis();

  function scrollToSection(id: string) {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -84 });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section
      id="hero"
      className="hero-accessible relative flex min-h-[calc(100vh-var(--nav-height))] flex-col overflow-hidden px-6"
      aria-labelledby="hero-title"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgb(7_108_100_/_0.07),transparent_45%),radial-gradient(circle_at_15%_85%,rgb(15_23_42_/_0.04),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_96%,rgb(184_201_214_/_0.18)_100%),linear-gradient(90deg,transparent_96%,rgb(184_201_214_/_0.14)_100%)] bg-[size:42px_42px]" />

      {/* Main content — vertically centered */}
      <div className="relative z-10 mx-auto my-auto grid w-full max-w-6xl items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Text column */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="type-kicker">
            AI Systems & Automation Engineer · Beirut
          </p>
          <h1 id="hero-title" className="type-h1 mt-5 max-w-xl">
            I build reliable systems so teams can focus on what matters.
          </h1>
          <p className="type-body mt-6 max-w-lg">
            Technical consultant managing tech stacks, building automations, and
            ensuring system reliability across SaaS platforms, CRMs, and
            internal tools.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <motion.button
              type="button"
              onClick={() => scrollToSection("projects")}
              whileHover={reduced ? undefined : SECTION.buttonHover}
              whileTap={reduced ? undefined : SECTION.buttonTap}
              data-magnetic
              data-cursor-label="View Work"
              className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              View Work
              <ArrowRight size={16} aria-hidden />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scrollToSection("contact")}
              whileHover={reduced ? undefined : SECTION.buttonHover}
              whileTap={reduced ? undefined : SECTION.buttonTap}
              data-magnetic
              data-cursor-label="Contact"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface-raised px-6 py-3 text-base font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent"
            >
              Start a Conversation
              <MessageCircle size={16} aria-hidden />
            </motion.button>
          </div>

          <ul className="mt-8 grid gap-2 text-sm text-text-secondary sm:grid-cols-3">
            <li className="rounded-md border border-border bg-white/70 px-3 py-2">
              CRM & SaaS management
            </li>
            <li className="rounded-md border border-border bg-white/70 px-3 py-2">
              Workflow automation
            </li>
            <li className="rounded-md border border-border bg-white/70 px-3 py-2">
              Data pipelines & reliability
            </li>
          </ul>
        </motion.div>

        {/* Image column — professional headshot placeholder */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: reduced ? 0 : 0.1,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Decorative ring behind image */}
            <div className="absolute -inset-3 rounded-2xl border border-border-strong opacity-50" />
            <img
              src="/layth-ayache.jpeg"
              alt="Layth Ayache — AI Systems Engineer"
              className="relative h-[340px] w-[340px] rounded-2xl border border-border-strong object-cover shadow-[0_18px_40px_rgb(15_23_42_/_0.10)] sm:h-[400px] sm:w-[400px]"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToSection("about")}
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="scroll-indicator relative z-10 mx-auto mb-6 flex flex-col items-center gap-1 text-text-muted"
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-medium uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown size={18} aria-hidden />
      </motion.button>
    </section>
  );
}
