import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SEO from "@/components/SEO";

const EMAIL = "hello@laythayache.com";

const inquiries = [
  {
    title: "Collaboration",
    description:
      "Working on infrastructure problems? Building public data systems? Let's discuss technical architecture and implementation.",
    cta: "Discuss collaboration",
    href: `mailto:${EMAIL}?subject=Systems%20Collaboration`,
  },
  {
    title: "Technical Critique",
    description:
      "Found issues in architecture decisions, methodology, or implementation? Technical feedback is expected and valued.",
    cta: "Submit critique",
    href: `mailto:${EMAIL}?subject=Technical%20Critique`,
  },
  {
    title: "General Inquiry",
    description:
      "Questions about systems work, availability, or technical background.",
    cta: "Send inquiry",
    href: `mailto:${EMAIL}`,
  },
];

export default function Submit() {
  return (
    <>
      <SEO
        title="Contact — Layth Ayache"
        description="Collaboration, technical critique, and systems architecture inquiries."
        canonical="https://laythayache.com/contact"
      />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="font-sans text-2xl font-semibold text-text-primary">
            Contact
          </h1>
          <p className="text-sm text-text-secondary">
            Collaboration, critique, or questions about systems architecture.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {inquiries.map((inquiry) => (
            <a
              key={inquiry.title}
              href={inquiry.href}
              target="_blank"
              rel="noreferrer"
            >
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                className="group flex flex-col gap-3 border border-border p-6 transition-colors hover:border-border-strong hover:bg-surface-raised"
              >
                <div className="flex items-start justify-between">
                  <h2 className="font-sans text-lg font-semibold text-text-primary">
                    {inquiry.title}
                  </h2>
                  <ArrowUpRight
                    size={16}
                    className="text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {inquiry.description}
                </p>
                <span className="mt-1 font-mono text-xs uppercase tracking-wider text-text-muted group-hover:text-text-secondary">
                  {inquiry.cta}
                </span>
              </motion.div>
            </a>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <p className="font-mono text-xs text-text-muted">{EMAIL}</p>
        </div>
      </div>
    </>
  );
}
