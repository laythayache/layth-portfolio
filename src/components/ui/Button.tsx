"use client";

import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles = "px-6 py-3 text-sm font-medium rounded transition-colors focus:outline-none";
  
  const style =
    variant === "primary"
      ? {
          backgroundColor: "var(--text)",
          color: "var(--bg)",
        }
      : {
          borderColor: "var(--text)",
          backgroundColor: "transparent",
          color: "var(--text)",
        };

  if (href) {
    if (href.startsWith("#")) {
      // Handle smooth scroll for anchor links
      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      };
      return (
        <a
          href={href}
          onClick={handleClick}
          className={`${baseStyles} ${variant === "primary" ? "" : "border"} ${className}`}
          style={{
            ...style,
            ...(variant === "primary" ? {} : { borderColor: "var(--text)" }),
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = "2px solid var(--accent)";
            e.currentTarget.style.outlineOffset = "3px";
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = "";
            e.currentTarget.style.outlineOffset = "";
          }}
        >
          {children}
        </a>
      );
    }
    return (
      <Link 
        href={href} 
        className={`${baseStyles} ${variant === "primary" ? "" : "border"} ${className}`} 
        style={{
          ...style,
          ...(variant === "primary" ? {} : { borderColor: "var(--text)" }),
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = "2px solid var(--accent)";
          e.currentTarget.style.outlineOffset = "3px";
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = "";
          e.currentTarget.style.outlineOffset = "";
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variant === "primary" ? "" : "border"} ${className}`}
      style={{
        ...style,
        ...(variant === "primary" ? {} : { borderColor: "var(--text)" }),
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = "2px solid var(--accent)";
        e.currentTarget.style.outlineOffset = "3px";
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = "";
        e.currentTarget.style.outlineOffset = "";
      }}
    >
      {children}
    </button>
  );
}
