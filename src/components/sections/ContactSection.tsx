import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { SECTION } from "@/motion/tokens";
import { useMediaQuery } from "@/motion/useMediaQuery";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type FormFeedback =
  | { kind: "idle"; message: string }
  | { kind: "error"; message: string }
  | { kind: "success"; message: string };

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  message: "",
};

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/laythayache",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/laythayache",
    icon: Github,
  },
] as const;

const linkHover = {
  y: -2,
  transition: { duration: 0.2, ease: SECTION.ease },
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactSection() {
  const reduced = useReducedMotion();
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const mobileViewport = useMediaQuery("(max-width: 767px)");
  const mobileTuned = coarsePointer || mobileViewport;
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [feedback, setFeedback] = useState<FormFeedback>({
    kind: "idle",
    message: "",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFeedback({
        kind: "error",
        message: "Please fill in all fields before sending.",
      });
      return;
    }

    if (!isValidEmail(form.email)) {
      setFeedback({
        kind: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    const subject = `Portfolio inquiry from ${form.name.trim()}`;
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      "",
      form.message.trim(),
    ].join("\n");
    const params = new URLSearchParams({ subject, body });

    window.location.href = `mailto:laythayache5@gmail.com?${params.toString()}`;
    setForm(INITIAL_FORM);
    setFeedback({
      kind: "success",
      message: "Your email app should open now. If it does not, use the direct email button below.",
    });
  }

  return (
    <section id="contact" className="section-glass section-shell px-6">
      <motion.div
        className="mx-auto max-w-4xl"
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
          Let&apos;s Build Something Together
        </motion.h2>

        <motion.p
          className="mt-4 max-w-2xl text-base text-text-secondary"
          variants={SECTION.fadeUp}
        >
          Open to consulting, contract work, collaboration, and speaking engagements.
        </motion.p>

        <motion.a
          href="mailto:laythayache5@gmail.com"
          data-magnetic
          data-cursor-label="Send Email"
          className="mt-8 inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-5 py-3 font-mono text-sm uppercase tracking-[0.13em] text-white transition-colors hover:bg-accent-hover"
          variants={SECTION.fadeUp}
        >
          <Mail size={16} />
          laythayache5@gmail.com
        </motion.a>

        <motion.form
          className="mt-10 rounded-xl border border-border bg-surface-raised p-6 shadow-sm md:p-8"
          variants={SECTION.fadeUp}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-mono text-xs uppercase tracking-[0.12em] text-text-muted"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(event) =>
                  setForm((previous) => ({ ...previous, name: event.target.value }))
                }
                className="mt-2 w-full rounded-md border border-border-strong bg-white px-4 py-3 text-base text-text-primary"
                required
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block font-mono text-xs uppercase tracking-[0.12em] text-text-muted"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) =>
                  setForm((previous) => ({ ...previous, email: event.target.value }))
                }
                className="mt-2 w-full rounded-md border border-border-strong bg-white px-4 py-3 text-base text-text-primary"
                required
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="contact-message"
              className="block font-mono text-xs uppercase tracking-[0.12em] text-text-muted"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={(event) =>
                setForm((previous) => ({ ...previous, message: event.target.value }))
              }
              rows={6}
              className="mt-2 w-full rounded-md border border-border-strong bg-white px-4 py-3 text-base leading-relaxed text-text-primary"
              required
            />
          </div>

          {feedback.kind !== "idle" && (
            <p
              role={feedback.kind === "error" ? "alert" : "status"}
              className={
                feedback.kind === "error"
                  ? "mt-4 text-sm text-red-700"
                  : "mt-4 text-sm text-green-700"
              }
            >
              {feedback.message}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-6 py-3 font-mono text-sm uppercase tracking-[0.13em] text-white transition-colors hover:bg-accent-hover"
          >
            Send Message
            <ArrowUpRight size={15} />
          </button>
        </motion.form>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          variants={SECTION.fadeUp}
        >
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                data-cursor-label={`Open ${link.label}`}
                className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface-raised px-4 py-2.5 text-sm text-text-primary transition-colors hover:border-accent hover:text-accent"
                whileHover={reduced || mobileTuned ? undefined : linkHover}
              >
                <Icon size={16} />
                {link.label}
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-12 flex items-center gap-3"
          variants={SECTION.fadeUp}
        >
          <div className="h-px w-12 bg-border-strong" />
          <p className="font-mono text-xs text-text-muted">&copy; 2026 Layth Ayache</p>
          <div className="h-px w-12 bg-border-strong" />
        </motion.div>
      </motion.div>
    </section>
  );
}
