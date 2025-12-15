"use client";

interface LogoMarkProps {
  className?: string;
  size?: number;
}

/**
 * Canonical LogoMark component - always perfectly circular
 * Size controlled by CSS variable when size={0}
 */
export default function LogoMark({ className = "", size }: LogoMarkProps) {
  const svgSize = size && size > 0 ? size : undefined;
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Layth Ayache mark"
      className={`logo-mark ${className}`}
      width={svgSize}
      height={svgSize}
      style={{ 
        color: "var(--accent)",
        aspectRatio: "1 / 1",
        display: "block",
        ...(svgSize ? {} : { width: "100%", height: "100%" })
      }}
    >
      <g fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="butt">
        <path d="M 72.98 69.28 A 30 30 0 0 1 23.52 34.61" />
        <path d="M 26.72 31.12 A 30 30 0 0 1 76.23 64.54" />
      </g>
    </svg>
  );
}
