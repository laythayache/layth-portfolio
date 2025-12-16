import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Layth Ayache, an AI, ML, and Computer Vision engineer focused on applied machine learning, computer vision systems, and NLP engineering with Arabic dialect interest.",
  openGraph: {
    title: "About Layth Ayache | AI & ML Engineer",
    description: "Applied machine learning, computer vision, and NLP engineering. Building measurable and shippable end-to-end systems.",
  },
};

export default function AboutPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold" style={{ color: "var(--text)" }}>About</h1>
      <p className="max-w-2xl" style={{ color: "var(--text)", opacity: 0.7 }}>
        I&apos;m Layth Ayache. I focus on applied machine learning, computer vision, and building end-to-end systems
        that are measurable and shippable.
      </p>
      <div className="rounded-lg border p-5" style={{ borderColor: "var(--text)" }}>
        <div className="font-medium" style={{ color: "var(--text)" }}>Focus areas</div>
        <ul className="mt-3 list-disc pl-5 text-sm space-y-1" style={{ color: "var(--text)", opacity: 0.7 }}>
          <li>ML pipelines (data → training → evaluation)</li>
          <li>Computer vision (detection, classification, tracking)</li>
          <li>NLP (Arabic dialect interest), deployment-minded engineering</li>
        </ul>
      </div>
    </section>
  );
}
