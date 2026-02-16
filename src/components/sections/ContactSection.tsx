import { motion, useReducedMotion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const links = [
  {
    label: "hello@laythayache.com",
    href: "mailto:hello@laythayache.com",
    icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/laythayache",
    icon: Linkedin,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/laythayache",
    icon: Github,
    external: true,
  },
] as const;

export default function ContactSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="contact" className="bg-surface py-24 px-6">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={prefersReduced ? {} : containerVariants}
      >
        <motion.h2
          className="font-serif text-3xl font-bold text-text-primary"
          variants={prefersReduced ? {} : fadeUp}
        >
          Let's Build Something Together
        </motion.h2>

        <motion.p
          className="mt-4 text-text-secondary"
          variants={prefersReduced ? {} : fadeUp}
        >
          Open to consulting, contract work, collaboration, and speaking
          opportunities.
        </motion.p>

        <motion.div
          className={cn(
            "mt-10 flex flex-wrap items-center justify-center gap-6"
          )}
          variants={prefersReduced ? {} : fadeUp}
        >
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </a>
            );
          })}
        </motion.div>

        <motion.p
          className="mt-16 font-mono text-xs text-text-muted"
          variants={prefersReduced ? {} : fadeUp}
        >
          &copy; 2026 Layth Ayache
        </motion.p>
      </motion.div>
    </section>
  );
}
