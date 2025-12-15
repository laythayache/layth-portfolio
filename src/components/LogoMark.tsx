interface LogoMarkProps {
  className?: string;
  size?: number;
}

export default function LogoMark({ className = "", size = 100 }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      role="img"
      aria-label="Layth Ayache mark"
      className={`logo-mark ${className}`}
      width={size}
      height={size}
      style={{ color: "var(--accent)" }}
    >
      <g fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="butt">
        <path d="M 72.98 69.28 A 30 30 0 0 1 23.52 34.61" />
        <path d="M 26.72 31.12 A 30 30 0 0 1 76.23 64.54" />
      </g>
    </svg>
  );
}
