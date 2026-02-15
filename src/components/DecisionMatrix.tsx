/**
 * Decision matrix showing architectural trade-offs
 * Collapsed by default, hover for preview, click to expand full comparison
 * Shows systems thinking and clear reasoning
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Decision {
  title: string;
  option1: { choice: string; pros: string[]; cons: string[] };
  option2: { choice: string; pros: string[]; cons: string[] };
  chosen: "option1" | "option2";
  reason: string;
}

const decisions: Decision[] = [
  {
    title: "Centralized vs Federated Architecture",
    option1: {
      choice: "Centralized",
      pros: [
        "Consistent queries across all data",
        "Strong consistency guarantees",
        "Simpler operational model",
      ],
      cons: ["Single point of failure", "Regional bottleneck", "Data aggregation risk"],
    },
    option2: {
      choice: "Federated",
      pros: ["Improved regional resilience", "Data privacy by region", "Local autonomy"],
      cons: ["Complex synchronization", "Eventual consistency", "Higher ops overhead"],
    },
    chosen: "option1",
    reason: "Chose centralized: Query performance and consistency matter more than resilience at this scale. Easier operations justify the trade-off.",
  },
  {
    title: "Real-time vs Batched Processing",
    option1: {
      choice: "Real-time",
      pros: ["Immediate data freshness", "Live updates on demand", "Responsive system"],
      cons: ["10x infrastructure cost", "Complex pipeline", "Marginal user value"],
    },
    option2: {
      choice: "Batched (15-min)",
      pros: ["Predictable cost", "Simpler pipeline", "Sufficient freshness"],
      cons: ["Slight processing delay", "Less real-time feel", "Batch window gaps"],
    },
    chosen: "option2",
    reason: "Chose batched: 15-minute intervals balance freshness with reality. Real-time would cost 10x for marginal value.",
  },
  {
    title: "On-device vs Cloud ML Inference",
    option1: {
      choice: "On-device",
      pros: ["Privacy preserved", "Works offline", "User retains control"],
      cons: ["Model size limited", "Slower updates", "Device constraints"],
    },
    option2: {
      choice: "Cloud Inference",
      pros: ["Larger models possible", "Faster inference", "Centralized updates"],
      cons: ["Privacy risk", "Connectivity required", "Infrastructure cost"],
    },
    chosen: "option1",
    reason: "Chose on-device: Privacy is non-negotiable for sign language data. Complexity cost is acceptable.",
  },
];

export default function DecisionMatrix() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="w-full space-y-6">
      {decisions.map((decision, idx) => {
        const chosenOption = decision.chosen === "option1" ? decision.option1 : decision.option2;
        const isExpanded = expanded === idx;

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.15 }}
            className="relative overflow-hidden rounded-lg bg-surface-raised border border-border"
          >
            {/* Header - always visible */}
            <button
              onClick={() => setExpanded(isExpanded ? null : idx)}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(idx)}
              onBlur={() => setHovered(null)}
              aria-expanded={isExpanded}
              className="w-full px-8 py-6 text-left hover:bg-surface-overlay/50 transition-colors duration-300"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  {decision.title}
                </h3>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-mono text-xs uppercase tracking-wider text-text-muted bg-surface-overlay px-3 py-1 rounded-full whitespace-nowrap">
                    Chosen: {chosenOption.choice}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-text-muted transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Hover preview - shows reasoning on hover */}
              <AnimatePresence>
                {hovered === idx && !isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {decision.reason}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Expanded content - full trade-off comparison */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="border-t border-border overflow-hidden"
                >
                  {/* Options comparison grid */}
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                    {/* Option 1 */}
                    <div className="p-8 space-y-6">
                      <div className="space-y-1">
                        <h4 className="font-sans text-base font-semibold text-text-primary">
                          {decision.option1.choice}
                        </h4>
                        {decision.chosen === "option1" && (
                          <p className="text-xs font-mono uppercase tracking-wider text-text-muted">
                            ✓ Chosen option
                          </p>
                        )}
                      </div>

                      {/* Pros */}
                      <div className="space-y-3">
                        <p className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                          Advantages
                        </p>
                        <ul className="space-y-2">
                          {decision.option1.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                              <span className="text-text-muted flex-shrink-0">•</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cons */}
                      <div className="space-y-3">
                        <p className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                          Trade-offs
                        </p>
                        <ul className="space-y-2">
                          {decision.option1.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                              <span className="text-text-muted/60 flex-shrink-0">•</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Option 2 */}
                    <div className="p-8 space-y-6">
                      <div className="space-y-1">
                        <h4 className="font-sans text-base font-semibold text-text-primary">
                          {decision.option2.choice}
                        </h4>
                        {decision.chosen === "option2" && (
                          <p className="text-xs font-mono uppercase tracking-wider text-text-muted">
                            ✓ Chosen option
                          </p>
                        )}
                      </div>

                      {/* Pros */}
                      <div className="space-y-3">
                        <p className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                          Advantages
                        </p>
                        <ul className="space-y-2">
                          {decision.option2.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                              <span className="text-text-muted flex-shrink-0">•</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cons */}
                      <div className="space-y-3">
                        <p className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                          Trade-offs
                        </p>
                        <ul className="space-y-2">
                          {decision.option2.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                              <span className="text-text-muted/60 flex-shrink-0">•</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Reasoning footer */}
                  <div className="border-t border-border bg-surface-overlay p-8">
                    <p className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold mb-3">
                      Reasoning
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {decision.reason}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.54 }}
        className="relative overflow-hidden rounded-lg border border-border bg-surface-raised p-8"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="relative z-10 space-y-3">
          <h4 className="font-sans text-sm font-semibold text-text-primary">
            Philosophy
          </h4>
          <p className="text-xs text-text-muted leading-relaxed font-mono">
            Architecture is about choosing the best failure mode for your context. Every decision involves trade-offs. The goal isn't perfection — it's making informed choices with clear reasoning.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
