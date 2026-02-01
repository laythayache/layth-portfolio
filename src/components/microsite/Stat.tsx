interface StatProps {
  label: string;
  value: string;
  caveat?: string;
}

export default function Stat({ label, value, caveat }: StatProps) {
  return (
    <div className="flex flex-col gap-1 border border-border p-3">
      <span className="font-mono text-xl font-bold text-text-primary">
        {value}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
        {label}
      </span>
      {caveat && (
        <span className="text-[11px] leading-tight text-text-muted/70">
          {caveat}
        </span>
      )}
    </div>
  );
}
