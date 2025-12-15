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
      localStorage.setItem("theme", "night");
    } else {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "day");
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
        className="theme-toggle"
        style={{
          borderColor: "var(--text)",
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
      className="theme-toggle"
      style={{
        borderColor: "var(--text)",
        color: "var(--text)",
        backgroundColor: "var(--bg)",
      }}
      aria-label={`Switch to ${theme === "day" ? "night" : "day"} mode`}
    >
      {theme === "day" ? "Night" : "Day"}
    </button>
  );
}
