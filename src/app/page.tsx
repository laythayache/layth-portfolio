export default function HomePage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">
          AI / ML / Computer Vision Engineer
        </h1>
        <p className="max-w-2xl text-zinc-700">
          I build practical ML systems: data pipelines, model training/evaluation, and deployable applications.
          This site is a clean baseline—projects and case studies will be added incrementally.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card title="Projects" desc="Selected work with concise, verifiable outcomes." href="/projects" />
        <Card title="Resume" desc="One-page summary + downloadable link placeholder." href="/resume" />
        <Card title="About" desc="Short professional narrative and focus areas." href="/about" />
        <Card title="Contact" desc="Email + links. No forms required to go live." href="/contact" />
      </div>

      <div className="rounded-lg border p-5">
        <p className="text-sm text-zinc-700">
          Status: Online (baseline). Next steps: add 3–5 projects with metrics, links, and screenshots.
        </p>
      </div>
    </section>
  );
}

function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <a href={href} className="rounded-lg border p-5 transition hover:bg-zinc-50">
      <div className="font-medium">{title}</div>
      <div className="mt-2 text-sm text-zinc-700">{desc}</div>
    </a>
  );
}
