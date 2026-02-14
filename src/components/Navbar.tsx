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

const LIGHT_ROUTES = ["/", "/systems"];

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isLightPage =
    LIGHT_ROUTES.includes(pathname) || pathname.startsWith("/systems/");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-300",
        isLightPage
          ? "bg-[#F2EDE8]"
          : "border-b border-border bg-surface/80 backdrop-blur-md"
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
                : "opacity-70 hover:opacity-100"
            )}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-6 md:flex">
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
                    "font-mono text-xs uppercase tracking-widest transition-colors",
                    isLightPage
                      ? active
                        ? "text-[#1A1A1A]"
                        : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]/70"
                      : active
                        ? "text-text-primary"
                        : "text-text-muted hover:text-text-secondary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Primary CTA button */}
          <Link
            to="/contact"
            className={cn(
              "rounded border font-mono text-xs uppercase tracking-wider transition-colors px-4 py-2",
              isLightPage
                ? "border-[#1A1A1A] bg-[#1A1A1A] text-[#F2EDE8] hover:bg-[#1A1A1A]/80"
                : "border-text-primary bg-text-primary text-surface hover:bg-text-primary/80"
            )}
          >
            Contact
          </Link>
        </div>

        {/* Mobile: Contact + Hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            to="/contact"
            className={cn(
              "rounded border font-mono text-xs uppercase tracking-wider transition-colors px-3 py-1.5",
              isLightPage
                ? "border-[#1A1A1A] bg-[#1A1A1A] text-[#F2EDE8] hover:bg-[#1A1A1A]/80"
                : "border-text-primary bg-text-primary text-surface hover:bg-text-primary/80"
            )}
          >
            Contact
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className={cn(
              "p-2 transition-colors",
              isLightPage ? "text-[#1A1A1A]" : "text-text-primary"
            )}
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
            className={cn(
              "overflow-hidden border-b md:hidden",
              isLightPage
                ? "border-[#1A1A1A]/10 bg-[#F2EDE8]"
                : "border-border bg-surface"
            )}
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
                      "rounded px-3 py-2.5 font-mono text-sm uppercase tracking-widest transition-colors",
                      isLightPage
                        ? active
                          ? "bg-[#1A1A1A]/5 text-[#1A1A1A]"
                          : "text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/5 hover:text-[#1A1A1A]"
                        : active
                          ? "bg-surface-raised text-text-primary"
                          : "text-text-muted hover:bg-surface-raised hover:text-text-secondary"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
