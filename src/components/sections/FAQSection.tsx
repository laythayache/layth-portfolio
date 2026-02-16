import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqItems } from "@/content/faq";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FAQSection() {
  const prefersReduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="bg-surface-overlay py-24 px-6">
      <motion.div
        className="mx-auto max-w-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={prefersReduced ? {} : fadeUp}
      >
        <h2 className="text-center font-serif text-3xl font-bold text-text-primary">
          Frequently Asked Questions
        </h2>

        <div className="mt-12">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="border-b border-border py-4">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className={cn(
                    "flex w-full items-center justify-between text-left",
                    "font-semibold text-sm text-text-primary"
                  )}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-4 shrink-0"
                  >
                    <ChevronDown size={16} className="text-text-muted" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-sm text-text-secondary">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
