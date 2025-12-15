interface MethodStep {
  label: string;
  description: string;
}

const steps: MethodStep[] = [
  {
    label: "Observe",
    description: "Document system behavior under real-world constraints and failure modes",
  },
  {
    label: "Threat Model",
    description: "Identify vulnerabilities, attack surfaces, and failure points in critical infrastructure",
  },
  {
    label: "Constraints",
    description: "Map resource limitations, regulatory requirements, and environmental factors",
  },
  {
    label: "Architecture",
    description: "Design resilient patterns that account for observed failures and constraints",
  },
  {
    label: "Publish Corrections",
    description: "Share findings and architectural recommendations for public sector adoption",
  },
];

export default function MethodFlow() {
  return (
    <section className="py-20 space-y-8">
      <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Method</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {steps.map((step, index) => (
          <MethodStepCard key={step.label} step={step} index={index} isLast={index === steps.length - 1} />
        ))}
      </div>
    </section>
  );
}

function MethodStepCard({ step, index, isLast }: { step: MethodStep; index: number; isLast: boolean }) {
  return (
    <div className="group relative">
      <div 
        className="border border-[var(--accent)]/20 bg-[var(--bg-secondary)]/30 p-6 space-y-3 hover:border-[var(--accent)]/40 hover:bg-[var(--bg-secondary)]/50 transition-all duration-200 h-full cursor-default"
        title={step.description}
        aria-label={`${step.label}: ${step.description}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 border border-[var(--accent)]/30 flex items-center justify-center text-sm font-medium text-[var(--text-primary)]">
            {index + 1}
          </div>
          <h3 className="text-base font-medium text-[var(--text-primary)]">
            {step.label}
          </h3>
        </div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-2">
          {step.description}
        </p>
      </div>
      {!isLast && (
        <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-[var(--accent)]/20 transform -translate-y-1/2 z-0" aria-hidden="true" />
      )}
    </div>
  );
}
