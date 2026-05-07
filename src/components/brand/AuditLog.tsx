import { cn } from "@/lib/utils";

export interface AuditEntry {
  ts: string;
  level?: "info" | "ok" | "warn";
  text: string;
}

interface AuditLogProps {
  entries: AuditEntry[];
  title?: string;
  className?: string;
}

const LEVEL_TAG: Record<NonNullable<AuditEntry["level"]>, string> = {
  info: "[INFO]",
  ok: "[ OK ]",
  warn: "[WARN]",
};

const LEVEL_COLOR: Record<NonNullable<AuditEntry["level"]>, string> = {
  info: "text-steel",
  ok: "text-success",
  warn: "text-warn",
};

export default function AuditLog({ entries, title, className }: AuditLogProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-[rgb(var(--code-bg))] p-4 font-mono text-[12px] leading-[1.6] text-[rgb(var(--code-text))]",
        className
      )}
      role="log"
      aria-label={title ?? "Audit log"}
    >
      {title && (
        <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-steel-soft">
          {title}
        </p>
      )}
      <ul className="space-y-1">
        {entries.map((entry, i) => {
          const level = entry.level ?? "info";
          return (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 text-steel-soft">{entry.ts}</span>
              <span className={cn("shrink-0 font-semibold", LEVEL_COLOR[level])}>
                {LEVEL_TAG[level]}
              </span>
              <span className="text-[rgb(var(--code-text))]">{entry.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
