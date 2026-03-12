import { useState, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import useScrollSpy from "@/hooks/useScrollSpy";

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}
const TOC_THRESHOLDS = [0.2, 0.5, 0.75];

export function DesktopTOC({ items }: TableOfContentsProps) {
  const ids = items.map((item) => item.id);
  const active = useScrollSpy(ids, {
    rootMargin: "-28% 0px -60% 0px",
    threshold: TOC_THRESHOLDS,
    initialActive: ids[0] ?? "",
  });

  return (
    <nav
      aria-label="Table of contents"
      className="hidden rounded-xl border border-border bg-surface-raised/90 p-4 shadow-sm backdrop-blur lg:block"
    >
      <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-text-muted">
        On this page
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block rounded border-l-2 py-1 pl-3 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30",
                active === item.id
                  ? "border-accent bg-surface-overlay text-text-primary"
                  : "border-transparent text-text-muted hover:text-text-primary"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MobileTOC({ items }: TableOfContentsProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <nav aria-label="Table of contents" className="mb-8 lg:hidden">
      <button
        onClick={() => setOpen((previous) => !previous)}
        className="flex w-full items-center justify-between rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
        aria-expanded={open}
        aria-controls={panelId}
      >
        Table of contents
        <ChevronDown
          size={16}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <ul
          id={panelId}
          className="mt-1 overflow-hidden rounded-lg border border-border bg-surface-raised"
        >
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-overlay hover:text-text-primary focus:outline-none focus:bg-surface-overlay"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
