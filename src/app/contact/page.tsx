import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Layth Ayache for AI, ML, Computer Vision, and NLP engineering opportunities and collaborations.",
  openGraph: {
    title: "Contact Layth Ayache | AI & ML Engineer",
    description: "Reach out for AI/ML engineering opportunities, computer vision projects, and technical collaborations.",
  },
};

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold" style={{ color: "var(--text)" }}>Contact</h1>
      <p className="max-w-2xl" style={{ color: "var(--text)", opacity: 0.7 }}>
        Fastest way to reach me:
      </p>
      <div className="rounded-lg border p-5 text-sm space-y-2" style={{ borderColor: "var(--text)", color: "var(--text)", opacity: 0.7 }}>
        <div>
          Email: <a className="underline" href="mailto:layth@example.com" style={{ color: "var(--text)", textDecorationColor: "var(--accent)" }}>layth@example.com</a>
        </div>
        <div>
          GitHub: <a className="underline" href="https://github.com/laythayache" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", textDecorationColor: "var(--accent)" }}>github.com/laythayache</a>
        </div>
        <div>
          LinkedIn: <a className="underline" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", textDecorationColor: "var(--accent)" }}>linkedin.com</a>
        </div>
      </div>
    </section>
  );
}
