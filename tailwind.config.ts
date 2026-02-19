import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
      fontSize: {
        "display-1": [
          "clamp(2.6rem, 6vw, 4.2rem)",
          { lineHeight: "1.04", letterSpacing: "-0.02em" },
        ],
        "display-2": [
          "clamp(2rem, 4.2vw, 3.2rem)",
          { lineHeight: "1.12", letterSpacing: "-0.015em" },
        ],
        "heading-3": [
          "clamp(1.3rem, 2.6vw, 1.8rem)",
          { lineHeight: "1.2", letterSpacing: "-0.012em" },
        ],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        serif: ['"IBM Plex Serif"', "Georgia", "serif"],
        display: ['"IBM Plex Serif"', "Georgia", "serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      colors: {
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          raised: "rgb(var(--surface-raised) / <alpha-value>)",
          overlay: "rgb(var(--surface-overlay) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--border) / <alpha-value>)",
          strong: "rgb(var(--border-strong) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          hover: "rgb(var(--accent-hover) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
