/**
 * Beautiful metrics visualization showing scale and impact
 */

interface Metric {
  label: string;
  value: string;
  description: string;
  context: string;
  accent?: string;
}

const metrics: Metric[] = [
  {
    label: "Real-time Latency",
    value: "<100ms",
    description: "OmniSign on-device inference",
    context: "Sub-second responsiveness for conversational UI",
    accent: "from-slate-400 to-slate-500",
  },
  {
    label: "Accuracy",
    value: "89%",
    description: "Sign language recognition",
    context: "Controlled evaluation; real-world varies",
    accent: "from-slate-500 to-slate-600",
  },
  {
    label: "Data Integrity",
    value: "100%",
    description: "Change detection coverage",
    context: "Every modification tracked and versioned",
    accent: "from-slate-600 to-slate-700",
  },
  {
    label: "Systems",
    value: "2",
    description: "In production",
    context: "Both live and actively maintained",
    accent: "from-slate-700 to-slate-800",
  },
  {
    label: "Contributors",
    value: "6",
    description: "Cross-functional team",
    context: "CV, web, mobile, linguistics specialists",
    accent: "from-slate-800 to-slate-900",
  },
  {
    label: "Uptime Target",
    value: "99.9%",
    description: "Production reliability",
    context: "With graceful degradation for failures",
    accent: "from-slate-900 to-black",
  },
];

export default function ScaleMetrics() {
  return (
    <div className="w-full space-y-6">
      {/* Metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => (
          <div
            key={metric.label}
            className="group relative overflow-hidden rounded-xl border border-[#1A1A1A]/10 p-6 bg-white transition-all duration-300 hover:border-[#1A1A1A]/20 hover:shadow-lg hover:-translate-y-1"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {/* Gradient background on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${metric.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />

            {/* Accent line */}
            <div
              className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${metric.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Content */}
            <div className="relative z-10 space-y-4">
              {/* Value section */}
              <div>
                <div className="font-sans text-4xl font-bold tracking-tight text-[#1A1A1A] mb-2 transition-all duration-300 group-hover:scale-105 group-hover:translate-y-0 origin-left">
                  {metric.value}
                </div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#1A1A1A]/50 group-hover:text-[#1A1A1A]/70 transition-colors duration-300">
                  {metric.label}
                </h3>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-[#1A1A1A]/10 via-[#1A1A1A]/20 to-[#1A1A1A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Description and context */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-[#1A1A1A] group-hover:text-[#1A1A1A] transition-colors duration-300">
                  {metric.description}
                </p>
                <p className="text-xs text-[#1A1A1A]/55 leading-relaxed group-hover:text-[#1A1A1A]/70 transition-colors duration-300">
                  {metric.context}
                </p>
              </div>

              {/* Small indicator dot */}
              <div className="flex items-center gap-2 pt-2">
                <div className="w-1 h-1 rounded-full bg-[#1A1A1A]/30 group-hover:bg-[#1A1A1A]/60 transition-colors duration-300" />
                <span className="text-xs text-[#1A1A1A]/40 group-hover:text-[#1A1A1A]/60 transition-colors duration-300 font-mono">
                  Production metric
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced footer note */}
      <div className="relative overflow-hidden rounded-xl border border-[#1A1A1A]/10 bg-gradient-to-br from-white via-[#FEFDFB] to-white p-6 transition-all duration-300 hover:border-[#1A1A1A]/20 hover:shadow-lg">
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A1A1A]/10 to-transparent" />

        <div className="relative z-10 space-y-3">
          <h4 className="font-sans text-sm font-semibold text-[#1A1A1A]">
            About these metrics
          </h4>
          <p className="text-xs text-[#1A1A1A]/60 leading-relaxed font-mono">
            All metrics are measured in production contexts with honest constraints noted. No cherry-picked benchmarks. Accuracy figures include real-world degradation scenarios. Latency measured on mid-range devices. Uptime targets are aspirational but grounded in realistic failure modes.
          </p>
        </div>
      </div>
    </div>
  );
}
