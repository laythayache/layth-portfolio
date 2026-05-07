import { cn } from "@/lib/utils";

export type ChipTone =
  | "stable"
  | "production"
  | "local-first"
  | "zero-cloud"
  | "auditable"
  | "ongoing"
  | "research"
  | "warn";

interface StatusChipProps {
  tone?: ChipTone;
  label: string;
  className?: string;
}

const TONE_STYLES: Record<ChipTone, string> = {
  stable:       "border-success/40 bg-success/10 text-success",
  production:   "border-success/40 bg-success/10 text-success",
  "local-first":"border-accent/40 bg-accent/10 text-accent",
  "zero-cloud": "border-accent/40 bg-accent/10 text-accent",
  auditable:    "border-steel/40 bg-steel/10 text-steel",
  ongoing:      "border-accent/40 bg-accent/10 text-accent",
  research:     "border-steel/40 bg-steel/10 text-steel",
  warn:         "border-warn/40 bg-warn/10 text-warn",
};

export default function StatusChip({ tone = "auditable", label, className }: StatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]",
        TONE_STYLES[tone],
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "warn" ? "bg-warn" :
          tone === "auditable" || tone === "research" ? "bg-steel" :
          tone === "stable" || tone === "production" ? "bg-success" :
          "bg-accent"
        )}
      />
      {label}
    </span>
  );
}
