"use client";

import { useRouter } from "next/navigation";
import { useExperience } from "@/contexts/ExperienceContext";
import LogoMark from "./LogoMark";

export default function Header() {
  const router = useRouter();
  const { phase, startReplay } = useExperience();

  const handleEmblemClick = () => {
    // Navigate to home
    router.replace("/");
    
    // Remove any hash from URL
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    
    // Scroll to top immediately
    window.scrollTo({ top: 0, behavior: "instant" as any });
    
    // Start replay
    startReplay();
  };

  // Only show header when phase is ready
  const isVisible = phase === "ready";

  return (
    <header
      className="header-emblem"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
        transform: isVisible ? "translateY(0)" : "translateY(-4px)",
      }}
    >
      <button
        onClick={handleEmblemClick}
        aria-label="Home"
        className="header-emblem__button"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: isVisible ? "pointer" : "default",
        }}
      >
        <LogoMark size={40} />
      </button>
    </header>
  );
}

