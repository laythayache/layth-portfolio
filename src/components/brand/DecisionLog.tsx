import { cn } from "@/lib/utils";

export interface Decision {
  id: string;
  title: string;
  chose: string;
  rejected?: string;
  why: string;
}

interface DecisionLogProps {
  decisions: Decision[];
  className?: string;
}

export default function DecisionLog({ decisions, className }: DecisionLogProps) {
  return (
    <ol
      className={cn("relative space-y-6 border-l border-border-strong pl-6", className)}
    >
      {decisions.map((d, i) => (
        <li key={d.id} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[31px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-accent/50 bg-surface-raised font-mono text-[10px] text-accent"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h4 className="font-serif text-lg text-text-primary">{d.title}</h4>
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
            chose <span className="text-accent">{d.chose}</span>
            {d.rejected && (
              <>
                {" · over "}
                <span className="text-text-muted line-through decoration-warn/50">
                  {d.rejected}
                </span>
              </>
            )}
          </p>
          <p className="mt-2 text-base leading-relaxed text-text-secondary">{d.why}</p>
        </li>
      ))}
    </ol>
  );
}
