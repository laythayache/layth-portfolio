"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"day" | "night">("day");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage only (default to day)
    const stored = localStorage.getItem("theme") as "day" | "night" | null;
    const initialTheme = stored || "day";
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: "day" | "night") => {
    const root = document.documentElement;
    if (newTheme === "night") {
      root.setAttribute("data-theme", "night");
    } else {
      root.removeAttribute("data-theme");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "day" ? "night" : "day";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return (
      <button
        className="px-4 py-2 text-sm border rounded transition-colors"
        style={{
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
        aria-label="Toggle theme"
      >
        ...
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 text-sm border rounded transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        borderColor: "var(--border)",
        color: "var(--text)",
        backgroundColor: "var(--bg)",
        focusRingColor: "var(--accent)",
      }}
      aria-label={`Switch to ${theme === "day" ? "night" : "day"} mode`}
    >
      {theme === "day" ? "Night" : "Day"}
    </button>
  );
}
