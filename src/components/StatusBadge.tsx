interface StatusBadgeProps {
  status: string;
}

const statusDot: Record<string, string> = {
  completed: "bg-accent",
  ongoing: "bg-accent/60",
  paused: "bg-text-muted/30",
  idea: "bg-accent/30",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${statusDot[status] ?? "bg-text-muted/30"}`}
      />
      <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
        {status}
      </span>
    </span>
  );
}
