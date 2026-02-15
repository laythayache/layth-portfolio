import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { to: "/systems", label: "Systems" },
  { to: "/playbook", label: "Playbook" },
  { to: "/writing", label: "Writing" },
  { to: "/now", label: "Now" },
  { to: "/about", label: "About" },
] as const;

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-300",
        isHome
          ? "bg-surface"
          : "border-b border-border bg-surface"
      )}
    >
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
        <Link to="/" aria-label="Home" className="flex items-center">
          <img
            src="/logo-mark.svg"
            alt="Layth Ayache"
            className={cn(
              "h-8 w-auto transition-opacity",
              isHome
                ? "pointer-events-none opacity-0"
                : "opacity-50 hover:opacity-70"
            )}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-8">
            {links.map((link) => {
              const active =
                pathname === link.to || pathname.startsWith(link.to + "/");
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative pb-1 font-mono text-xs uppercase tracking-widest transition-colors",
                    active
                      ? "text-text-primary"
                      : "text-text-muted hover:text-accent"
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Contact — thin bronze border, no fill */}
          <Link
            to="/contact"
            className="border border-accent px-4 py-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-surface"
          >
            Contact
          </Link>
        </div>

        {/* Mobile: Hamburger only */}
        <div className="flex items-center md:hidden">
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
            className="overflow-hidden border-b border-border bg-surface md:hidden"
          >
            <div className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-4">
              {links.map((link) => {
                const active =
                  pathname === link.to || pathname.startsWith(link.to + "/");
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-3 py-2.5 font-mono text-sm uppercase tracking-widest transition-colors",
                      active
                        ? "text-text-primary border-l-2 border-accent"
                        : "text-text-muted hover:text-accent"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-3 py-2.5 font-mono text-sm uppercase tracking-widest text-accent transition-colors hover:text-accent-hover"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
