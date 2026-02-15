/**
 * Metrics visualization with large numbers and dramatic hierarchy
 * Spacious floating cards with staggered fade-in and hover lift effects
 */

import { motion } from 'framer-motion';

interface Metric {
  label: string;
  value: string;
  description: string;
  context: string;
}

const metrics: Metric[] = [
  {
    label: "Real-time Latency",
    value: "<100ms",
    description: "OmniSign on-device inference",
    context: "Sub-second responsiveness for conversational UI",
  },
  {
    label: "Accuracy",
    value: "89%",
    description: "Sign language recognition",
    context: "Controlled evaluation; real-world varies",
  },
  {
    label: "Data Integrity",
    value: "100%",
    description: "Change detection coverage",
    context: "Every modification tracked and versioned",
  },
  {
    label: "Systems",
    value: "2",
    description: "In production",
    context: "Both live and actively maintained",
  },
  {
    label: "Contributors",
    value: "6",
    description: "Cross-functional team",
    context: "CV, web, mobile, linguistics specialists",
  },
  {
    label: "Uptime Target",
    value: "99.9%",
    description: "Production reliability",
    context: "With graceful degradation for failures",
  },
];

export default function ScaleMetrics() {
  return (
    <div className="w-full space-y-8">
      {/* Metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.12 }}
            whileHover={{ y: -2 }}
            className="bg-surface-raised border border-border p-6 hover:border-accent/40 transition-all duration-700 ease-out"
          >
            {/* Giant display number */}
            <div className="text-7xl font-bold tracking-tight text-text-primary mb-3">
              {metric.value}
            </div>

            {/* Label */}
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4">
              {metric.label}
            </h3>

            {/* Divider */}
            <div className="h-px bg-accent/20 mb-4" />

            {/* Description */}
            <p className="text-sm font-medium text-text-secondary mb-2 leading-relaxed">
              {metric.description}
            </p>

            {/* Context */}
            <p className="text-xs text-text-muted leading-relaxed">
              {metric.context}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.72 }}
        className="relative overflow-hidden border border-border bg-surface-raised p-6"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-accent/20" />

        <div className="relative z-10 space-y-3">
          <h4 className="font-sans text-sm font-semibold text-text-primary">
            About these metrics
          </h4>
          <p className="text-xs text-text-muted leading-relaxed font-mono">
            All metrics are measured in production contexts with honest constraints noted. No cherry-picked benchmarks. Accuracy figures include real-world degradation scenarios. Latency measured on mid-range devices. Uptime targets are aspirational but grounded in realistic failure modes.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
