export default function ResumePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Resume</h1>
      <p className="text-zinc-700 max-w-2xl">
        Add your PDF to <code className="rounded bg-zinc-100 px-1 py-0.5">public/resume.pdf</code> and this link will work.
      </p>
      <a className="inline-block rounded border px-4 py-2 hover:bg-zinc-50" href="/resume.pdf" target="_blank" rel="noreferrer">
        Open Resume PDF
      </a>
    </section>
  );
}
