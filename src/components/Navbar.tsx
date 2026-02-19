import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLenis } from "@/motion/LenisProvider";

const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "speaking", label: "Speaking" },
  { id: "blog", label: "Blog" },
  { id: "certifications", label: "Certs" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
] as const;

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll detection for background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer scroll spy (homepage only)
  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    const ids = NAV_SECTIONS.map((s) => s.id);
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [isHome]);

  const lenis = useLenis();

  const scrollToSection = useCallback(
    (id: string) => {
      setMobileOpen(false);
      if (isHome) {
        if (lenis) {
          lenis.scrollTo(`#${id}`, { offset: -64 });
        } else {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.location.href = `/#${id}`;
      }
    },
    [isHome, lenis]
  );

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-colors duration-300",
        "border-b border-border-strong bg-surface/92 backdrop-blur-md",
        isHome && !scrolled ? "shadow-none" : "shadow-[0_8px_24px_rgb(15_23_42_/_0.08)]"
      )}
    >
      {/* Progress bar */}
      {isHome && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-accent"
          style={{ scaleX }}
        />
      )}

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo / home link */}
        <Link
          to="/"
          aria-label="Home"
          className="flex items-center"
          data-magnetic
          data-cursor-label="Return to Intro"
          onClick={() => {
            if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src="/logo-mark.svg"
            alt="Layth Ayache"
            width={1248}
            height={832}
            loading="eager"
            decoding="async"
            className={cn(
              "h-9 w-auto transition-opacity",
              isHome && !scrolled
                ? "opacity-90"
                : "opacity-90 hover:opacity-100"
            )}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-5 lg:flex">
          {NAV_SECTIONS.map((section) => {
            const active = isHome && activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                data-magnetic
                data-cursor-label={`Jump to ${section.label}`}
                className={cn(
                  "relative pb-1 font-mono text-sm uppercase tracking-[0.15em] transition-colors",
                  active
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-accent"
                )}
              >
                {section.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="rounded-md border border-border-strong bg-surface-raised p-2 text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            className="overflow-hidden border-b border-border bg-surface lg:hidden"
            id="mobile-navigation"
            aria-label="Mobile menu"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {NAV_SECTIONS.map((section) => {
                const active = isHome && activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "rounded px-3 py-3 text-left font-mono text-sm uppercase tracking-[0.15em] transition-colors",
                      active
                        ? "border-l-2 border-accent bg-accent/5 text-text-primary"
                        : "text-text-secondary hover:bg-surface-overlay hover:text-accent"
                    )}
                  >
                    {section.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
