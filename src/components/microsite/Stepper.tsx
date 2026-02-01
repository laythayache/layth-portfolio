import type { HowItWorksStep } from "@/content/omnisign";

interface StepperProps {
  steps: HowItWorksStep[];
}

export default function Stepper({ steps }: StepperProps) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => (
        <div key={step.number} className="flex gap-4">
          {/* Vertical line + number */}
          <div className="flex flex-col items-center">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-border-strong font-mono text-xs font-bold text-text-primary">
              {step.number}
            </div>
            {i < steps.length - 1 && (
              <div className="w-px flex-1 bg-border" />
            )}
          </div>

          {/* Content */}
          <div className="pb-8">
            <h4 className="font-mono text-sm font-semibold text-text-primary">
              {step.title}
            </h4>
            <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
