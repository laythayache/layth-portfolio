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
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        isHome && !scrolled
          ? "bg-transparent"
          : "border-b border-border bg-surface/95 backdrop-blur-sm"
      )}
    >
      {/* Progress bar */}
      {isHome && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-accent"
          style={{ scaleX }}
        />
      )}

      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
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
            className={cn(
              "h-8 w-auto transition-opacity",
              isHome && !scrolled
                ? "pointer-events-none opacity-0"
                : "opacity-50 hover:opacity-70"
            )}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-6 lg:flex">
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
                  "relative pb-1 font-mono text-xs uppercase tracking-widest transition-colors",
                  active
                    ? "text-text-primary"
                    : "text-text-muted hover:text-accent"
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
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="p-2 text-text-primary transition-colors"
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
          >
            <div className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-4">
              {NAV_SECTIONS.map((section) => {
                const active = isHome && activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "px-3 py-2.5 text-left font-mono text-sm uppercase tracking-widest transition-colors",
                      active
                        ? "border-l-2 border-accent text-text-primary"
                        : "text-text-muted hover:text-accent"
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
