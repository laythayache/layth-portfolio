import { useState } from "react";
import PortraitHero from "@/components/PortraitHero";
import { useHysteresisLag } from "@/motion/useHysteresisLag";

export default function Home() {
  const [hovered, setHovered] = useState(false);
  const lagActive = useHysteresisLag(hovered);

  return (
    <div className="relative -mt-16 flex min-h-screen flex-col overflow-x-hidden bg-[#F2EDE8]">
      {/* Layer 1: static grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-30"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          opacity: 0.035,
        }}
      />

      {/* Navbar clearance */}
      <div className="h-16 shrink-0" aria-hidden="true" />

      {/* ── Centered composition ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-8">
        <p className="mb-8 text-center font-sans text-sm font-light tracking-[0.2em] text-[#1A1A1A]">
          Layth Ayache
        </p>

        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <PortraitHero active={lagActive} tone="light" />
        </div>

        <p className="mt-10 text-center font-sans text-sm font-light tracking-[0.2em] text-[#1A1A1A]">
          Layth Ayache
        </p>
      </div>
    </div>
  );
}
