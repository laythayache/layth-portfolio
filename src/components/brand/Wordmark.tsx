"use client";

import { sizes } from "@/brand/tokens";

interface WordmarkProps {
  variant?: "stacked" | "inline";
  showSurname?: boolean;
  className?: string;
  as?: "h1" | "h2" | "div" | "span";
}

export default function Wordmark({
  variant = "stacked",
  showSurname = true,
  className = "",
  as: Component = "div",
}: WordmarkProps) {
  const containerClass = variant === "stacked" ? "flex flex-col" : "flex items-baseline gap-2";
  const firstClass = variant === "stacked" 
    ? `font-semibold uppercase tracking-tight ${sizes.wordmark.mobile.first} md:${sizes.wordmark.desktop.first}`
    : `font-semibold uppercase tracking-tight ${sizes.wordmark.mobile.first} md:${sizes.wordmark.desktop.first}`;
  const lastClass = variant === "stacked"
    ? `font-medium uppercase tracking-[0.22em] ${sizes.wordmark.mobile.last} md:${sizes.wordmark.desktop.last} mt-1`
    : `font-medium uppercase tracking-[0.22em] ${sizes.wordmark.mobile.last} md:${sizes.wordmark.desktop.last}`;

  return (
    <Component className={`${containerClass} ${className}`} aria-label="Layth Ayache">
      <span className={firstClass}>LAYTH</span>
      {showSurname && <span className={lastClass}>AYACHE</span>}
    </Component>
  );
}
