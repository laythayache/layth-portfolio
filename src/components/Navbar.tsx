import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/systems", label: "Systems" },
  { to: "/writing", label: "Writing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isLightPage = isHome || pathname === "/systems";

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
        <Link to="/" className="flex items-center">
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

        <div className="flex items-center gap-8">
          {links.map((link) => {
            const active =
              pathname === link.to || pathname.startsWith(link.to + "/");
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "font-mono text-xs uppercase tracking-widest transition-colors",
                  isLightPage
                    ? active
                      ? "text-[#1A1A1A]"
                      : "text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70"
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
      </div>
    </nav>
  );
}
