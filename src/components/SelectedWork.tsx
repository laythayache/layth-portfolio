import Link from "next/link";

interface WorkItem {
  title: string;
  claim: string;
  tags: string[];
  date: string;
  href: string;
}

const workItems: WorkItem[] = [
  {
    title: "System Critique",
    claim: "Analysis of critical infrastructure failures in public sector deployments",
    tags: ["Gov", "Health", "Security"],
    date: "2024-12",
    href: "/critique",
  },
  {
    title: "Reference Architecture",
    claim: "Resilient patterns for AI systems operating under resource constraints",
    tags: ["AI", "Security", "Gov"],
    date: "2024-11",
    href: "/architectures",
  },
  {
    title: "Field Note",
    claim: "Observations from healthcare system deployments in constrained environments",
    tags: ["Health", "Gov"],
    date: "2024-10",
    href: "/notes",
  },
];

export default function SelectedWork() {
  return (
    <section className="py-20 space-y-8">
      <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Selected Work</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {workItems.map((item) => (
          <WorkCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Link
      href={item.href}
      className="group border border-[var(--accent)]/20 bg-[var(--bg-secondary)]/30 p-6 space-y-4 hover:border-[var(--accent)]/40 hover:bg-[var(--bg-secondary)]/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200">
          {item.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {item.claim}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 border border-[var(--accent)]/20 text-[var(--text-secondary)] uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-[var(--text-secondary)]/60 ml-auto">
          {item.date}
        </span>
      </div>

      <div className="pt-2 border-t border-[var(--accent)]/20">
        <span className="text-sm text-[var(--accent)] group-hover:underline transition-all duration-200">
          Open →
        </span>
      </div>
    </Link>
  );
}
