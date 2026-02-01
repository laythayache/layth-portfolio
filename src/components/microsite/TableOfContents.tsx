import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/content/omnisign";

interface TableOfContentsProps {
  items: TocItem[];
}

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function DesktopTOC({ items }: TableOfContentsProps) {
  const ids = items.map((i) => i.id);
  const active = useActiveSection(ids);

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 hidden lg:block"
    >
      <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-text-muted">
        On this page
      </p>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block border-l-2 py-1 pl-3 font-mono text-xs transition-colors focus:outline-none focus:underline focus:underline-offset-2",
                active === item.id
                  ? "border-text-primary text-text-primary"
                  : "border-transparent text-text-muted hover:text-text-secondary hover:border-border-strong"
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

  return (
    <nav aria-label="Table of contents" className="mb-8 lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between border border-border px-4 py-3 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-text-secondary focus:outline-none focus:ring-1 focus:ring-border-strong"
        aria-expanded={open}
      >
        Table of contents
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <ul className="border border-t-0 border-border">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 font-mono text-xs text-text-muted transition-colors hover:bg-surface-raised hover:text-text-secondary focus:outline-none focus:bg-surface-raised focus:text-text-secondary"
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
