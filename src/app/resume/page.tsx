export default function ResumePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold" style={{ color: "var(--text)" }}>Resume</h1>
      <p className="max-w-2xl" style={{ color: "var(--text)", opacity: 0.7 }}>
        Add your PDF to <code className="rounded px-1 py-0.5" style={{ backgroundColor: "var(--text)", color: "var(--bg)", opacity: 0.1 }}>public/resume.pdf</code> and this link will work.
      </p>
      <a className="inline-block rounded border px-4 py-2" href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ borderColor: "var(--text)", color: "var(--text)" }}>
        Open Resume PDF
      </a>
    </section>
  );
}
