import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLenis } from "@/motion/LenisProvider";
import useScrollSpy from "@/hooks/useScrollSpy";

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
const NAV_SECTION_IDS = NAV_SECTIONS.map((section) => section.id);
const SCROLLSPY_THRESHOLDS = [0.2, 0.45, 0.7];

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(NAV_SECTION_IDS, {
    rootMargin: "-30% 0px -55% 0px",
    threshold: SCROLLSPY_THRESHOLDS,
    initialActive: "about",
  });

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll detection for background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav with Escape
  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const lenis = useLenis();

  const scrollToSection = useCallback(
    (id: string) => {
      setMobileOpen(false);
      if (isHome) {
        if (lenis) {
          lenis.scrollTo(`#${id}`, { offset: -84 });
        } else {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.location.assign(`/#${id}`);
      }
    },
    [isHome, lenis]
  );

  return (
    <nav
      aria-label="Navigation"
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-colors duration-300",
        "border-b border-border-strong bg-surface/94 backdrop-blur-lg",
        isHome && !scrolled
          ? "shadow-none"
          : "shadow-[0_8px_24px_rgb(15_23_42_/_0.08)]"
      )}
    >
      {/* Progress bar */}
      {isHome && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-accent"
          style={{ scaleX }}
        />
      )}

      <div className="mx-auto flex h-[var(--nav-height)] max-w-6xl items-center justify-between px-6">
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
        <div className="hidden items-center gap-2 lg:flex">
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
                  "relative rounded-md px-3 py-2 text-base font-medium transition-colors",
                  active
                    ? "bg-accent/12 text-text-primary"
                    : "text-text-secondary hover:bg-surface-overlay hover:text-accent"
                )}
              >
                {section.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-accent"
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
            className="rounded-md border border-border-strong bg-surface-raised p-2.5 text-text-primary transition-colors hover:border-accent hover:text-accent"
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
            aria-label="Mobile navigation"
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
                      "rounded-md px-3 py-3 text-left text-base font-medium transition-colors",
                      active
                        ? "border-l-2 border-accent bg-accent/12 text-text-primary"
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
