interface SectionProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

export default function Section({ id, label, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-10 first:pt-0">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-wider text-text-muted">
        <a
          href={`#${id}`}
          className="hover:text-text-secondary focus:text-text-secondary focus:outline-none focus:underline focus:underline-offset-4"
        >
          {label}
        </a>
      </h2>
      {children}
    </section>
  );
}
