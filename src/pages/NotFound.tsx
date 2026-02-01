import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="font-mono text-6xl font-bold text-text-muted">
          404
        </span>
        <p className="text-sm text-text-secondary">
          This page doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-4 font-mono text-xs uppercase tracking-wider text-text-muted underline underline-offset-4 hover:text-text-secondary"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
