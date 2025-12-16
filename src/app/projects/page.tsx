import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Layth Ayache's portfolio of AI, ML, and Computer Vision projects including 3D landing systems, taxi platform MVP, and sign language translation research.",
  openGraph: {
    title: "Projects by Layth Ayache | AI & ML Portfolio",
    description: "Portfolio of AI/ML projects: 3D systems, computer vision applications, NLP research, and full-stack platforms.",
  },
};

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
      <h1 className="text-2xl font-semibold" style={{ color: "var(--text)" }}>Projects</h1>
      <p className="max-w-2xl" style={{ color: "var(--text)", opacity: 0.7 }}>
        Minimal list for now. Each project will become a short case study with goal, approach, stack, and results.
      </p>

      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.title} className="rounded-lg border p-5" style={{ borderColor: "var(--text)" }}>
            <div className="flex items-center justify-between gap-4">
              <div className="font-medium" style={{ color: "var(--text)" }}>{p.title}</div>
              {p.link ? (
                <a className="text-sm underline" href={p.link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", textDecorationColor: "var(--accent)" }}>
                  Link
                </a>
              ) : (
                <span className="text-sm" style={{ color: "var(--text)", opacity: 0.5 }}>Link soon</span>
              )}
            </div>
            <p className="mt-2 text-sm" style={{ color: "var(--text)", opacity: 0.7 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
