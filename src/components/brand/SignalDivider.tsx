import { cn } from "@/lib/utils";

interface SignalDividerProps {
  label?: string;
  className?: string;
}

export default function SignalDivider({ label, className }: SignalDividerProps) {
  return (
    <div className={cn("mx-auto flex max-w-6xl items-center gap-4 px-6", className)}>
      <div className="signal-line flex-1" aria-hidden="true" />
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
          {label}
        </span>
      )}
      <div className="signal-line flex-1" aria-hidden="true" />
    </div>
  );
}
