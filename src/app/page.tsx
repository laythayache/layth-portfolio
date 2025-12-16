"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "@/experience/ExperienceProvider";
import { TIMELINE } from "@/experience/constants";
import Lockup from "@/components/Lockup";
import Typewriter from "@/components/Typewriter";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import EmblemBloom from "@/components/EmblemBloom";

export default function HomePage() {
  const { phase, setPhase } = useExperience();
  const heroLockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Expose hero lockup ref globally for ExperienceOverlay FLIP settle
    if (heroLockupRef.current) {
      (window as any).__heroLockupRef = heroLockupRef.current;
    }

    return () => {
      delete (window as any).__heroLockupRef;
    };
  }, []);

  // Handle phase transitions for reveals - smooth staggered cascade
  useEffect(() => {
    if (phase === "REVEAL") {
      // Sequential reveal with refined timing for smoother cascade
      const headerTimeout = setTimeout(() => {
        document.querySelectorAll('.reveal-header').forEach(el => {
          el.classList.add('revealed');
        });
      }, TIMELINE.REVEAL_HEADER);

      const globalTimeout = setTimeout(() => {
        document.querySelectorAll('.reveal-global').forEach(el => {
          el.classList.add('revealed');
        });
      }, TIMELINE.REVEAL_HEADER + TIMELINE.REVEAL_GLOBAL);

      const ctasTimeout = setTimeout(() => {
        document.querySelectorAll('.reveal-ctas').forEach(el => {
          el.classList.add('revealed');
        });
      }, TIMELINE.REVEAL_HEADER + TIMELINE.REVEAL_GLOBAL + TIMELINE.REVEAL_CTAS);

      const contentTimeout = setTimeout(() => {
        document.querySelectorAll('.reveal-content').forEach(el => {
          el.classList.add('revealed');
        });
        setPhase("READY");
      }, TIMELINE.REVEAL_HEADER + TIMELINE.REVEAL_GLOBAL + TIMELINE.REVEAL_CTAS + TIMELINE.REVEAL_CONTENT);

      return () => {
        clearTimeout(headerTimeout);
        clearTimeout(globalTimeout);
        clearTimeout(ctasTimeout);
        clearTimeout(contentTimeout);
      };
    } else if (phase === "READY") {
      // Ensure all reveals are shown
      document.querySelectorAll('.reveal-header').forEach(el => el.classList.add('revealed'));
      document.querySelectorAll('.reveal-global').forEach(el => el.classList.add('revealed'));
      document.querySelectorAll('.reveal-ctas').forEach(el => el.classList.add('revealed'));
      document.querySelectorAll('.reveal-content').forEach(el => el.classList.add('revealed'));
    }
  }, [phase, setPhase]);

  const handleTypewriterComplete = () => {
    setPhase("REVEAL");
  };

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
    "AI/ML", "Computer Vision", "NLP", "Networking", "Embedded Systems",
    "Security", "Deployment", "System Architecture",
  ];

  const isReadyOrReveal = phase === "READY" || phase === "REVEAL";
  const shouldStartTyping = phase === "TYPE";

  return (
    <>
      {/* Emblem Bloom - only visible in READY phase */}
      {phase === "READY" && <EmblemBloom />}
      
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center py-20 px-6">
        <div className="w-full">
          {/* Hero Lockup - rendered from initial render with opacity: 0, occupying final layout */}
          <div ref={heroLockupRef}>
            <Lockup
              mode="hero"
              showMotto={false}
              showCtas={false}
              markSizeVar="--mark-hero"
              className="hero-lockup-anchor"
              style={{
                opacity: 0, // Initially hidden, revealed by overlay
              }}
            >
              {/* Motto with typewriter */}
              <p className="lockup__motto">
                {shouldStartTyping ? (
                  <Typewriter
                    text="grow to love and love to grow"
                    onComplete={handleTypewriterComplete}
                    speed={45}
                  />
                ) : phase === "READY" || phase === "REVEAL" ? (
                  "grow to love and love to grow"
                ) : null}
              </p>
              
              {/* CTAs */}
              <div
                className={`lockup__ctas flex flex-wrap gap-4 justify-center reveal-ctas ${isReadyOrReveal ? "revealed" : ""}`}
              >
                <Button href="#work" variant="primary">
                  Projects
                </Button>
                <Button href="/resume.pdf" variant="secondary">
                  Resume
                </Button>
              </div>
            </Lockup>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section
        id="work"
        className={`py-20 px-6 reveal-content ${isReadyOrReveal ? "revealed" : ""}`}
      >
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
      <section
        className={`py-20 px-6 reveal-content ${isReadyOrReveal ? "revealed" : ""}`}
        style={{ backgroundColor: "var(--bg)" }}
      >
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
      <section
        className={`py-20 px-6 reveal-content ${isReadyOrReveal ? "revealed" : ""}`}
      >
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
      <section
        className={`py-20 px-6 reveal-content ${isReadyOrReveal ? "revealed" : ""}`}
        style={{ backgroundColor: "var(--bg)" }}
      >
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
      <footer
        className={`py-8 px-6 border-t text-center text-sm reveal-content ${isReadyOrReveal ? "revealed" : ""}`}
        style={{ borderColor: "var(--text)", color: "var(--text)", opacity: 0.5 }}
      >
        <p>© {new Date().getFullYear()} Layth Ayache</p>
      </footer>
    </>
  );
}
