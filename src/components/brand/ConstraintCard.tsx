import { cn } from "@/lib/utils";
import StatusChip, { type ChipTone } from "./StatusChip";

interface ConstraintCardProps {
  constraint: string;
  response: string;
  tone?: ChipTone;
  className?: string;
}

export default function ConstraintCard({
  constraint,
  response,
  tone = "auditable",
  className,
}: ConstraintCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-border bg-surface-raised p-5",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
          Constraint
        </p>
        <StatusChip tone={tone} label="design response" />
      </div>
      <p className="mt-3 font-serif text-lg leading-snug text-text-primary">
        {constraint}
      </p>
      <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-text-secondary">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          Response —{" "}
        </span>
        {response}
      </p>
    </div>
  );
}
