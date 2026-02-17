import { motion, useReducedMotion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { SECTION } from "@/motion/tokens";
import { useMediaQuery } from "@/motion/useMediaQuery";

const links = [
  {
    label: "hello@laythayache.com",
    href: "mailto:hello@laythayache.com",
    icon: Mail,
    external: false,
    cursorLabel: "Send Email",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/laythayache",
    icon: Linkedin,
    external: true,
    cursorLabel: "Open LinkedIn",
  },
  {
    label: "GitHub",
    href: "https://github.com/laythayache",
    icon: Github,
    external: true,
    cursorLabel: "Open GitHub",
  },
] as const;

const linkHover = {
  y: -2,
  transition: { duration: 0.2, ease: SECTION.ease },
};

export default function ContactSection() {
  const reduced = useReducedMotion();
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const mobileViewport = useMediaQuery("(max-width: 767px)");
  const mobileTuned = coarsePointer || mobileViewport;

  return (
    <section id="contact" className="section-glass px-6 py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={SECTION.viewport}
        variants={SECTION.container}
      >
        <motion.p
          className="font-mono text-xs uppercase tracking-widest text-accent"
          variants={SECTION.fadeUp}
        >
          Get in touch
        </motion.p>

        <motion.h2
          className="mt-4 font-serif text-3xl font-bold text-text-primary md:text-4xl"
          variants={SECTION.fadeUp}
        >
          Let&rsquo;s Build Something Together
        </motion.h2>

        <motion.p
          className="mt-4 text-text-secondary"
          variants={SECTION.fadeUp}
        >
          Open to consulting, contract work, collaboration, and speaking
          opportunities.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
          variants={SECTION.fadeUp}
        >
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                data-magnetic
                data-cursor-label={link.cursorLabel}
                className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent"
                whileHover={reduced || mobileTuned ? undefined : linkHover}
              >
                <Icon size={16} />
                <span>{link.label}</span>
                {link.external && (
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                )}
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-16 flex items-center justify-center gap-3"
          variants={SECTION.fadeUp}
        >
          <div className="h-px w-12 bg-border-strong" />
          <p className="font-mono text-xs text-text-muted">
            &copy; 2026 Layth Ayache
          </p>
          <div className="h-px w-12 bg-border-strong" />
        </motion.div>
      </motion.div>
    </section>
  );
}
