export const metadata = {
  title: "Systems Failure Analysis | AI, Security, Digital Infrastructure",
  description: "I study why systems fail under pressure. AI, security, and digital infrastructure — focused on government, healthcare, and public services in constrained environments.",
};

export default function HomePage() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          role="img"
          aria-label="Layth Ayache mark"
          className="w-full h-full animate-spin-slow text-[var(--accent)]"
        >
          <g fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="butt">
            {/* Arc 1: ~40° to ~208° */}
            <path d="M 72.98 69.28 A 30 30 0 0 1 23.52 34.61" />
            {/* Arc 2: ~219° to ~29° */}
            <path d="M 26.72 31.12 A 30 30 0 0 1 76.23 64.54" />
          </g>
        </svg>
      </div>
    </section>
  );
}
