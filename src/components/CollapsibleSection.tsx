import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="mb-8 border-b border-border pb-8 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`section-${title}`}
        className="flex w-full items-center justify-between"
      >
        <h2 className="font-sans text-lg font-semibold text-text-primary">
          {title}
        </h2>
        <ChevronDown
          size={20}
          className={`shrink-0 transition-transform ${
            isOpen ? "rotate-180 text-accent" : "text-text-muted"
          }`}
        />
      </button>
      {isOpen && (
        <div
          id={`section-${title}`}
          className="mt-4 text-base leading-relaxed text-text-secondary prose prose-sm max-w-none"
        >
          {children}
        </div>
      )}
    </section>
  );
}
