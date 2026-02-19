import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqItems } from "@/content/faq";
import { SECTION } from "@/motion/tokens";

const itemReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.04 + i * 0.06,
      ease: SECTION.ease,
    },
  }),
};

export default function FAQSection() {
  const reduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="section-glass-alt section-shell px-6">
      <motion.div
        className="mx-auto max-w-3xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={SECTION.viewport}
      >
        <motion.h2
          className="text-center font-serif text-3xl font-bold text-text-primary md:text-4xl"
          variants={SECTION.fadeUp}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="mt-12">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                className="border-b border-border py-4"
                variants={itemReveal}
                custom={index}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  data-cursor-label={isOpen ? "Collapse" : "Expand"}
                  className={cn(
                    "flex w-full items-center justify-between text-left",
                    "text-base font-semibold text-text-primary transition-colors hover:text-accent"
                  )}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: SECTION.ease }}
                    className="ml-4 shrink-0"
                  >
                    <ChevronDown size={16} className="text-text-muted" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: SECTION.ease }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-base text-text-secondary">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
