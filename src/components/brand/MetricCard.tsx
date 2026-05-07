import { cn } from "@/lib/utils";

interface MetricCardProps {
  value: string;
  label: string;
  caption?: string;
  className?: string;
}

export default function MetricCard({ value, label, caption, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-surface-raised p-5",
        className
      )}
    >
      <p className="font-serif text-3xl font-semibold text-text-primary">{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
        {label}
      </p>
      {caption && (
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{caption}</p>
      )}
    </div>
  );
}
