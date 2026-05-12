import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/content/faq";

export default function FAQSection() {
  const reduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section id="faq" className="section-glass-alt section-shell px-6">
      <motion.div
        className="mx-auto max-w-4xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.03, delayChildren: 0.03 } },
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
            <span className="text-leather">—</span> no. 08 / faq
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-text-primary">
            Frequently asked questions.
          </h2>
          <div aria-hidden="true" className="mt-4 h-[2px] w-14 bg-leather" />
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] text-text-secondary">
            Short answers about consulting, AI systems, and collaboration.
          </p>
        </motion.div>

        <div className="mt-10 space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.article
                key={item.question}
                className="rounded-md border border-border bg-surface-raised"
                variants={{
                  hidden: { opacity: 0, y: 4 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
                }}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-trigger-${index}`}
                  >
                    <span className="text-lg font-semibold text-text-primary">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-text-secondary transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-border px-5 py-4 text-base leading-relaxed text-text-secondary">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
