import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

type FeedbackState =
  | { kind: "idle"; message: string }
  | { kind: "error"; message: string }
  | { kind: "success"; message: string };

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

const SOCIAL_LINKS = [
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

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactSection() {
  const reduced = useReducedMotion();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [feedback, setFeedback] = useState<FeedbackState>({
    kind: "idle",
    message: "",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFeedback({
        kind: "error",
        message: "Please complete name, email, and message.",
      });
      return;
    }

    if (!isValidEmail(form.email)) {
      setFeedback({
        kind: "error",
        message: "Please provide a valid email address.",
      });
      return;
    }

    if (form.message.trim().length < 20) {
      setFeedback({
        kind: "error",
        message: "Please add a bit more detail (at least 20 characters).",
      });
      return;
    }

    const subject = form.subject.trim() || `Portfolio inquiry from ${form.name.trim()}`;
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      form.company.trim() ? `Company: ${form.company.trim()}` : null,
      "",
      form.message.trim(),
    ]
      .filter(Boolean)
      .join("\n");
    const params = new URLSearchParams({ subject, body });

    window.location.href = `mailto:laythayache5@gmail.com?${params.toString()}`;
    setForm(INITIAL_FORM);
    setFeedback({
      kind: "success",
      message:
        "Your email app should open now. If it does not, email laythayache5@gmail.com directly.",
    });
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <section id="contact" className="section-glass section-shell px-6">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
        }}
      >
        <motion.p
          className="type-kicker"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          Contact
        </motion.p>
        <motion.h2
          className="type-h2 mt-4"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          Let&apos;s Build The Future Together
        </motion.h2>
        <motion.p
          className="type-body mt-4 max-w-2xl"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          Open to consulting, partnerships, and technical collaboration on AI,
          automation, and resilient infrastructure.
        </motion.p>

        <motion.a
          href="mailto:laythayache5@gmail.com"
          className="mt-7 inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          <Mail size={17} aria-hidden />
          Email laythayache5@gmail.com
        </motion.a>

        <motion.form
          className="mt-9 rounded-2xl border border-border-strong bg-surface-raised p-6 shadow-sm md:p-8"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="type-caption block text-text-secondary"
              >
                Name *
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="mt-2 w-full rounded-md border border-border-strong bg-white px-4 py-3 text-base text-text-primary focus:border-accent focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="type-caption block text-text-secondary"
              >
                Email *
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="mt-2 w-full rounded-md border border-border-strong bg-white px-4 py-3 text-base text-text-primary focus:border-accent focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="contact-company"
                className="type-caption block text-text-secondary"
              >
                Company (optional)
              </label>
              <input
                id="contact-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={(event) => updateField("company", event.target.value)}
                className="mt-2 w-full rounded-md border border-border-strong bg-white px-4 py-3 text-base text-text-primary focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="type-caption block text-text-secondary"
              >
                Subject (optional)
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                className="mt-2 w-full rounded-md border border-border-strong bg-white px-4 py-3 text-base text-text-primary focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="contact-message"
              className="type-caption block text-text-secondary"
            >
              Message *
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              rows={7}
              className="mt-2 w-full rounded-md border border-border-strong bg-white px-4 py-3 text-base leading-relaxed text-text-primary focus:border-accent focus:outline-none"
              required
            />
            <p className="mt-2 text-sm text-text-muted">
              Minimum detail: 20 characters.
            </p>
          </div>

          {feedback.kind !== "idle" && (
            <p
              role={feedback.kind === "error" ? "alert" : "status"}
              className={
                feedback.kind === "error"
                  ? "mt-4 text-sm font-medium text-red-700"
                  : "mt-4 text-sm font-medium text-emerald-700"
              }
            >
              {feedback.message}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Send Message
            <ArrowUpRight size={15} aria-hidden />
          </button>

          <p className="mt-4 text-xs text-text-muted">
            Privacy note: your message is sent through your local email client,
            and no form data is stored on this website.
          </p>
        </motion.form>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface-raised px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
                title="Opens in a new tab"
              >
                <Icon size={16} aria-hidden />
                {link.label}
              </a>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-12 flex items-center gap-3"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          <div className="h-px w-12 bg-border-strong" />
          <p className="text-sm text-text-muted">© 2026 Layth Ayache</p>
          <div className="h-px w-12 bg-border-strong" />
        </motion.div>
      </motion.div>
    </section>
  );
}
