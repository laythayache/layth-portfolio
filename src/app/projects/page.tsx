const projects = [
  {
    title: "Reality Map (3D Landing System)",
    desc: "R3F experiment focused on interaction + performance constraints. (Details to be re-added.)",
    link: null,
  },
  {
    title: "Latch (Taxi Platform MVP)",
    desc: "Client/Driver/Admin split; MVP planning and architecture.",
    link: null,
  },
  {
    title: "Sign Language Translation (LSL focus)",
    desc: "Research direction combining CV + NLP for multilingual sign translation.",
    link: null,
  },
];

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Projects</h1>
      <p className="text-zinc-700 max-w-2xl">
        Minimal list for now. Each project will become a short case study with goal, approach, stack, and results.
      </p>

      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.title} className="rounded-lg border p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="font-medium">{p.title}</div>
              {p.link ? (
                <a className="text-sm underline" href={p.link} target="_blank" rel="noreferrer">
                  Link
                </a>
              ) : (
                <span className="text-sm text-zinc-500">Link soon</span>
              )}
            </div>
            <p className="mt-2 text-sm text-zinc-700">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
