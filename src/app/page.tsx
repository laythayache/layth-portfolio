"use client";

import { useEffect, useState, useRef } from "react";
import LogoMark from "@/components/LogoMark";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import Typewriter from "@/components/Typewriter";

export default function HomePage() {
  const [revealPhase, setRevealPhase] = useState<"loader" | "typing" | "globalReveal" | "pageReveal">("loader");
  const [shouldStartTyping, setShouldStartTyping] = useState(false);
  const heroLockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Expose hero lockup ref globally for WelcomeLoader to access
    if (heroLockupRef.current) {
      (window as any).__heroLockupRef = heroLockupRef.current;
    }

    // Check if loader has been seen before (route change)
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    if (hasSeenLoader) {
      // Skip loader on subsequent navigations - show everything immediately
      setRevealPhase("pageReveal");
      // Trigger reveals immediately
      setTimeout(() => {
        document.querySelectorAll('.reveal-global').forEach(el => el.classList.add('revealed'));
        document.querySelectorAll('.reveal-ctas').forEach(el => el.classList.add('revealed'));
        document.querySelectorAll('.reveal-page-content').forEach(el => el.classList.add('revealed'));
      }, 100);
      return;
    }

    // Listen for loader completion
    const checkLoaderComplete = () => {
      if (document.body.classList.contains("loader-complete")) {
        setRevealPhase("typing");
        setShouldStartTyping(true);
      }
    };

    // Check immediately and set up interval
    checkLoaderComplete();
    const interval = setInterval(checkLoaderComplete, 100);

    return () => {
      clearInterval(interval);
      delete (window as any).__heroLockupRef;
    };
  }, []);

  const handleTypingComplete = () => {
    setRevealPhase("globalReveal");
    // Reveal global elements (ThemeToggle)
    setTimeout(() => {
      document.querySelectorAll('.reveal-global').forEach(el => el.classList.add('revealed'));
    }, 50);
    
    // After global reveal, show CTAs and page content
    setTimeout(() => {
      setRevealPhase("pageReveal");
      document.querySelectorAll('.reveal-ctas').forEach(el => el.classList.add('revealed'));
      document.querySelectorAll('.reveal-page-content').forEach(el => el.classList.add('revealed'));
    }, 600);
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
          {/* Hero Lockup Anchor - hidden until settle completes */}
          <div 
            ref={heroLockupRef}
            className="hero-lockup-anchor"
          >
            <div className="flex justify-center mb-8" data-hero-emblem>
              <LogoMark size={120} />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "var(--text)" }} data-hero-name>
                Layth Ayache
              </h1>
            <div 
              className="text-lg md:text-xl max-w-2xl mx-auto min-h-[1.5em]"
              style={{ color: "var(--text)" }}
            >
              {shouldStartTyping ? (
                <Typewriter 
                  text="grow to love and love to grow" 
                  onComplete={handleTypingComplete}
                  className="block"
                />
              ) : revealPhase === "pageReveal" ? (
                <span style={{ opacity: 1 }}>grow to love and love to grow</span>
              ) : null}
            </div>
          </div>
          </div>
          <div 
            className={`flex flex-wrap gap-4 justify-center reveal-ctas ${revealPhase === "globalReveal" || revealPhase === "pageReveal" ? "revealed" : ""}`}
          >
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
      <section 
        id="work" 
        className={`py-20 px-6 reveal-page-content ${revealPhase === "pageReveal" ? "revealed" : ""}`}
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
        className={`py-20 px-6 reveal-page-content ${revealPhase === "pageReveal" ? "revealed" : ""}`}
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
        className={`py-20 px-6 reveal-page-content ${revealPhase === "pageReveal" ? "revealed" : ""}`}
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
        className={`py-20 px-6 reveal-page-content ${revealPhase === "pageReveal" ? "revealed" : ""}`}
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
        className={`py-8 px-6 border-t text-center text-sm reveal-page-content ${revealPhase === "pageReveal" ? "revealed" : ""}`}
        style={{ borderColor: "var(--text)", color: "var(--text)", opacity: 0.5 }}
      >
        <p>© {new Date().getFullYear()} Layth Ayache</p>
      </footer>
    </>
  );
}
