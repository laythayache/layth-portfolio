/**
 * Metrics showing the scale and impact of systems
 */

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
    description: "Alphabet-level sign language recognition",
    context: "Controlled evaluation; real-world varies with conditions",
  },
  {
    label: "Data Integrity",
    value: "100%",
    description: "Change detection coverage",
    context: "Every content modification tracked and versioned",
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
    description: "Cross-functional team (OmniSign)",
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
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="border border-[#1A1A1A]/10 p-5 rounded hover:border-[#1A1A1A]/20 transition-colors"
          >
            {/* Value (large) */}
            <div className="mb-2">
              <div className="font-sans text-3xl font-semibold text-[#1A1A1A] mb-1">
                {metric.value}
              </div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#1A1A1A]/50">
                {metric.label}
              </h3>
            </div>

            {/* Description and context */}
            <div className="space-y-1 pt-3 border-t border-[#1A1A1A]/5">
              <p className="text-sm text-[#1A1A1A]/70 font-semibold">
                {metric.description}
              </p>
              <p className="text-xs text-[#1A1A1A]/50">
                {metric.context}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-8 p-6 bg-[#F2EDE8]/50 border border-[#1A1A1A]/5 rounded">
        <p className="text-xs text-[#1A1A1A]/60 font-mono">
          <strong>Note:</strong> All metrics are measured in production contexts. Accuracy figures include honest constraints and limitations — no cherry-picked benchmarks.
        </p>
      </div>
    </div>
  );
}
