import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import "./portfolio/navigation.css";

const links = [
  { to: "/projects/", label: "Work" },
  { to: "/#services", label: "Capabilities" },
  { to: "/#experience", label: "Experience" },
  { to: "/about/", label: "About" },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return <nav className="portfolio-nav" aria-label="Navigation">
    <div className="nav-inner">
      <Link to="/" className="nav-wordmark" aria-label="Home" onClick={() => { setOpen(false); if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" }); }}>layth<span>.</span></Link>
      <div className="nav-desktop">{links.map(link => <Link key={link.to} to={link.to} aria-current={location.pathname === link.to.replace(/\/$/, "") ? "page" : undefined}>{link.label}</Link>)}</div>
      <Link to="/#contact" className="nav-contact" onClick={() => setOpen(false)}>Let’s talk<ArrowUpRight size={15} /></Link>
      <button ref={toggle} type="button" className="nav-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X size={21} /> : <Menu size={21} />}</button>
    </div>
    {open && <div id="mobile-navigation" className="nav-mobile">{links.map(link => <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={17} /></Link>)}<Link to="/#contact" onClick={() => setOpen(false)}>Contact<ArrowUpRight size={17} /></Link></div>}
  </nav>;
}
