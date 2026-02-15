import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/content/omnisign";

interface FAQAccordionProps {
  items: FAQItem[];
}

function FAQItemComponent({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="border-b border-slate-200 last:border-b-0"
      initial={{ opacity: 0, y: reduced ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: reduced ? 0 : index * 0.08,
        duration: reduced ? 0.15 : 0.4,
        ease: [0, 0, 0.2, 1],
      }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-teal-600"
        aria-expanded={isOpen}
      >
        <span className="font-sans text-base font-medium text-slate-800 md:text-lg">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: reduced ? 0.1 : 0.25, ease: [0, 0, 0.2, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown
            size={20}
            className={cn(
              "transition-colors",
              isOpen ? "text-teal-500" : "text-slate-400"
            )}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: reduced ? 0.1 : 0.3, ease: [0, 0, 0.2, 1] },
              opacity: { duration: reduced ? 0.1 : 0.2, delay: reduced ? 0 : 0.1 },
            }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-8">
              {/* Hand "opening" decorative element */}
              <div className="mb-3 flex items-center gap-2">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: reduced ? 0 : 0.15, duration: 0.3 }}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-50"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-500"
                  >
                    <path d="M7 11v-1a5 5 0 0 1 10 0v1" />
                    <path d="M12 12v6" />
                    <path d="M8 17h8" />
                  </svg>
                </motion.div>
                <div className="h-px flex-1 bg-gradient-to-r from-teal-200 to-transparent" />
              </div>

              <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y-0">
      {items.map((item, index) => (
        <FAQItemComponent
          key={index}
          item={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
