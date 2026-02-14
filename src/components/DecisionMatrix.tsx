/**
 * Beautiful decision matrix showing architectural trade-offs
 * Demonstrates systems thinking and reasoning
 */

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
  return (
    <div className="w-full space-y-6">
      {decisions.map((decision, idx) => (
        <div
          key={idx}
          className="group relative overflow-hidden rounded-xl border border-[#1A1A1A]/10 bg-white transition-all duration-300 hover:border-[#1A1A1A]/20 hover:shadow-lg"
        >
          {/* Subtle gradient on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-3 transition-opacity duration-300 bg-gradient-to-br from-[#1A1A1A] to-transparent" />

          {/* Decision title header */}
          <div className="relative z-10 border-b border-[#1A1A1A]/10 bg-gradient-to-r from-white to-[#FEFDFB] px-6 py-5 group-hover:from-[#FEFDFB] group-hover:to-white transition-colors duration-300">
            <h3 className="font-sans text-base font-semibold text-[#1A1A1A] tracking-tight">
              {decision.title}
            </h3>
          </div>

          {/* Options comparison grid */}
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#1A1A1A]/10">
            {/* Option 1 */}
            <div className="relative p-6 overflow-hidden group/option transition-all duration-300">
              {/* Option background on hover */}
              <div className="absolute inset-0 opacity-0 group-hover/option:opacity-2 transition-opacity duration-300 bg-gradient-to-br from-[#1A1A1A] to-transparent" />

              <div className="relative z-10 space-y-4">
                {/* Option title with indicator */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                      decision.chosen === "option1"
                        ? "border-[#1A1A1A] bg-[#1A1A1A]"
                        : "border-[#1A1A1A]/30 group-hover/option:border-[#1A1A1A]/50"
                    }`}
                  >
                    {decision.chosen === "option1" && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <h4 className="font-sans font-semibold text-[#1A1A1A] group-hover/option:text-[#1A1A1A]/80 transition-colors duration-300">
                    {decision.option1.choice}
                  </h4>
                  {decision.chosen === "option1" && (
                    <span className="ml-auto text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/60 bg-[#1A1A1A]/5 px-2 py-1 rounded">
                      Chosen
                    </span>
                  )}
                </div>

                {/* Pros */}
                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/40 font-semibold">
                    Advantages
                  </p>
                  <ul className="space-y-2">
                    {decision.option1.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#1A1A1A]/75 group-hover/option:text-[#1A1A1A]/90 transition-colors duration-300">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#1A1A1A]/40 group-hover/option:text-[#1A1A1A]/60 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/40 font-semibold">
                    Trade-offs
                  </p>
                  <ul className="space-y-2">
                    {decision.option1.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#1A1A1A]/60 group-hover/option:text-[#1A1A1A]/75 transition-colors duration-300">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#1A1A1A]/30 group-hover/option:text-[#1A1A1A]/50 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Option 2 */}
            <div className="relative p-6 overflow-hidden group/option transition-all duration-300">
              {/* Option background on hover */}
              <div className="absolute inset-0 opacity-0 group-hover/option:opacity-2 transition-opacity duration-300 bg-gradient-to-br from-[#1A1A1A] to-transparent" />

              <div className="relative z-10 space-y-4">
                {/* Option title with indicator */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                      decision.chosen === "option2"
                        ? "border-[#1A1A1A] bg-[#1A1A1A]"
                        : "border-[#1A1A1A]/30 group-hover/option:border-[#1A1A1A]/50"
                    }`}
                  >
                    {decision.chosen === "option2" && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <h4 className="font-sans font-semibold text-[#1A1A1A] group-hover/option:text-[#1A1A1A]/80 transition-colors duration-300">
                    {decision.option2.choice}
                  </h4>
                  {decision.chosen === "option2" && (
                    <span className="ml-auto text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/60 bg-[#1A1A1A]/5 px-2 py-1 rounded">
                      Chosen
                    </span>
                  )}
                </div>

                {/* Pros */}
                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/40 font-semibold">
                    Advantages
                  </p>
                  <ul className="space-y-2">
                    {decision.option2.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#1A1A1A]/75 group-hover/option:text-[#1A1A1A]/90 transition-colors duration-300">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#1A1A1A]/40 group-hover/option:text-[#1A1A1A]/60 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/40 font-semibold">
                    Trade-offs
                  </p>
                  <ul className="space-y-2">
                    {decision.option2.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#1A1A1A]/60 group-hover/option:text-[#1A1A1A]/75 transition-colors duration-300">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#1A1A1A]/30 group-hover/option:text-[#1A1A1A]/50 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Reasoning footer */}
          <div className="relative z-10 border-t border-[#1A1A1A]/10 bg-gradient-to-r from-[#FEFDFB] to-white px-6 py-4 group-hover:from-white group-hover:to-[#FEFDFB] transition-colors duration-300">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]/40 mt-2 flex-shrink-0" />
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/50 mb-2 font-semibold">
                  Reasoning
                </p>
                <p className="text-sm text-[#1A1A1A]/75 leading-relaxed group-hover:text-[#1A1A1A]/85 transition-colors duration-300">
                  {decision.reason}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Footer note */}
      <div className="relative overflow-hidden rounded-xl border border-[#1A1A1A]/10 bg-gradient-to-br from-white via-[#FEFDFB] to-white p-6 transition-all duration-300 hover:border-[#1A1A1A]/20 hover:shadow-lg">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A1A1A]/10 to-transparent" />

        <div className="relative z-10 space-y-3">
          <h4 className="font-sans text-sm font-semibold text-[#1A1A1A]">
            Philosophy
          </h4>
          <p className="text-xs text-[#1A1A1A]/60 leading-relaxed font-mono">
            Architecture is about choosing the best failure mode for your context. Every decision involves trade-offs. The goal isn't perfection — it's making informed choices with clear reasoning.
          </p>
        </div>
      </div>
    </div>
  );
}
