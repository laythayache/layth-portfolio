import LogoMark from "@/components/LogoMark";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";

export const metadata = {
  title: "Layth Ayache | AI, Security, Digital Infrastructure",
  description: "Engineering systems that fail gracefully under pressure. Focused on AI, security, and digital infrastructure for government, healthcare, and public services.",
};

export default function HomePage() {
  const projects = [
    {
      title: "Healthcare Data Pipeline",
      outcome: "Reduced processing time by 60% while maintaining HIPAA compliance in resource-constrained environments.",
      tags: ["Health", "AI", "Security"],
      href: "#",
    },
    {
      title: "Government System Audit",
      outcome: "Identified and remediated critical vulnerabilities affecting 2M+ users across public services infrastructure.",
      tags: ["Gov", "Security"],
      href: "#",
    },
    {
      title: "ML Model Deployment",
      outcome: "Deployed production ML system with 99.9% uptime in constrained network environments.",
      tags: ["AI", "Deployment"],
      href: "#",
    },
  ];

  const capabilities = [
    "AI/ML",
    "Computer Vision",
    "NLP",
    "Networking",
    "Embedded Systems",
    "Security",
    "Deployment",
    "System Architecture",
  ];

  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center py-20 px-6">
        <div className="max-w-4xl mx-auto w-full text-center space-y-8">
          <div className="flex justify-center mb-8">
            <LogoMark size={120} />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
              Layth Ayache
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "var(--text)", opacity: 0.7 }}>
              Engineering systems that fail gracefully under pressure. Focused on AI, security, and digital infrastructure for government, healthcare, and public services.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="#work" variant="primary">
              Projects
            </Button>
            <Button href="/resume.pdf" variant="secondary">
              Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-20 px-6">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-12" style={{ color: "var(--text)" }}>
            Selected Work
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.title}
                title={project.title}
                outcome={project.outcome}
                tags={project.tags}
                href={project.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-12" style={{ color: "var(--text)" }}>
            Capabilities
          </h2>
          <div className="flex flex-wrap gap-3">
            {capabilities.map((capability) => (
              <Tag key={capability}>{capability}</Tag>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--text)" }}>
            About
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p style={{ color: "var(--text)", opacity: 0.7 }}>
              I build and analyze systems that operate under real-world constraints: limited resources, regulatory requirements, and high-stakes environments. My work focuses on making AI and digital infrastructure reliable, secure, and maintainable.
            </p>
            <p style={{ color: "var(--text)", opacity: 0.7 }}>
              I approach engineering with a focus on failure modes, threat modeling, and architectural resilience. Every system I design accounts for what happens when things go wrong—because they will.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-3xl mx-auto w-full text-center space-y-6">
          <h2 className="text-3xl font-bold" style={{ color: "var(--text)" }}>
            Contact
          </h2>
          <div className="space-y-3">
            <p style={{ color: "var(--text)", opacity: 0.7 }}>
              <a
                href="mailto:layth@example.com"
                className="hover:underline"
                style={{ 
                  color: "var(--text)",
                  textDecorationColor: "var(--accent)",
                  textUnderlineOffset: "2px"
                }}
              >
                layth@example.com
              </a>
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ 
                  color: "var(--text)",
                  textDecorationColor: "var(--accent)",
                  textUnderlineOffset: "2px"
                }}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/laythayache"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ 
                  color: "var(--text)",
                  textDecorationColor: "var(--accent)",
                  textUnderlineOffset: "2px"
                }}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t text-center text-sm" style={{ borderColor: "var(--text)", color: "var(--text)", opacity: 0.5 }}>
        <p>© {new Date().getFullYear()} Layth Ayache</p>
      </footer>
    </>
  );
}
