export default function LiveFocusPanel() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="border border-[var(--accent)]/20 bg-[var(--bg-secondary)]/50 p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">
            Current Focus
          </h2>
          <span className="pulse-indicator" aria-hidden="true" />
        </div>
        <p className="text-sm text-[var(--text-primary)] leading-relaxed">
          Healthcare data infrastructure resilience in constrained environments
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t border-[var(--accent)]/20">
        <h3 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">
          Active Domains
        </h3>
        <ul className="space-y-2 text-sm text-[var(--text-primary)]">
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            Government Systems
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            Healthcare Infrastructure
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            AI Risk & Security
          </li>
        </ul>
      </div>

      <div className="pt-4 border-t border-[var(--accent)]/20">
        <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">
          Last Update
        </div>
        <div className="text-sm text-[var(--text-primary)] font-mono">
          {currentDate}
        </div>
      </div>
    </div>
  );
}
