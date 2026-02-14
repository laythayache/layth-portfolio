import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjectBySlug } from "@/content/projects";
import ProjectShell from "@/layouts/ProjectShell";
import NotFound from "./NotFound";

const sectionLabels: { key: string; label: string }[] = [
  { key: "problem", label: "The Problem" },
  { key: "systemReality", label: "System Reality" },
  { key: "intervention", label: "Intervention" },
  { key: "worked", label: "Worked" },
  { key: "didnt", label: "Didn't" },
  { key: "unsolved", label: "Unsolved" },
  { key: "challenges", label: "Challenges" },
];

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) return <NotFound />;

  return (
    <div className="px-6 py-12">
      <ProjectShell project={project}>
        {/* Back link */}
        <Link
          to="/systems"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-text-secondary"
        >
          <ArrowLeft size={14} />
          Back to systems
        </Link>

        {/* Header */}
        <div className="mb-12 flex flex-col gap-4">
          <h1 className="font-sans text-3xl font-semibold text-text-primary">
            {project.title}
          </h1>
          <p className="text-base leading-relaxed text-text-secondary">
            {project.summary}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
              {project.status}
            </span>
            <span className="text-text-muted">&middot;</span>
            <span className="font-mono text-xs text-text-muted">
              {project.kind}
            </span>
            <span className="text-text-muted">&middot;</span>
            <Link
              to={`/systems/${project.system}`}
              className="font-mono text-xs text-text-muted underline underline-offset-2 hover:text-text-secondary"
            >
              {project.system}
            </Link>
            <span className="text-text-muted">&middot;</span>
            <span className="font-mono text-xs text-text-muted">
              {project.ui_mode}
            </span>
            {project.friend_project && (
              <>
                <span className="text-text-muted">&middot;</span>
                <span className="font-mono text-xs text-sky-400">
                  friend project
                </span>
              </>
            )}
          </div>

          {/* Links */}
          {project.links && (
            <div className="flex flex-wrap gap-4 pt-2">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-text-muted underline underline-offset-2 hover:text-text-secondary"
                >
                  Demo <ArrowUpRight size={12} />
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-text-muted underline underline-offset-2 hover:text-text-secondary"
                >
                  Repo <ArrowUpRight size={12} />
                </a>
              )}
              {project.links.video && (
                <a
                  href={project.links.video}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-text-muted underline underline-offset-2 hover:text-text-secondary"
                >
                  Video <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Truth structure sections */}
        <div className="flex flex-col gap-10">
          {sectionLabels.map(({ key, label }) => {
            const content =
              project.sections[key as keyof typeof project.sections];
            if (!content) return null;
            return (
              <section key={key}>
                <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
                  {label}
                </h2>
                <p className="text-base leading-relaxed text-text-secondary">
                  {content}
                </p>
              </section>
            );
          })}
        </div>

        {/* Challenge CTA */}
        <div className="mt-16 border-t border-border pt-8">
          {project.challenge_url ? (
            <Link
              to={project.challenge_url}
              className="inline-flex items-center gap-2 border border-text-primary px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-text-primary transition-colors hover:bg-text-primary hover:text-surface"
            >
              Challenge this project
              <ArrowUpRight size={14} />
            </Link>
          ) : (
            <p className="font-mono text-xs text-text-muted">
              Challenge URL not set for this project. Reach out via{" "}
              <Link
                to="/submit"
                className="underline underline-offset-2 hover:text-text-secondary"
              >
                /submit
              </Link>{" "}
              to challenge or critique this work.
            </p>
          )}
        </div>
      </ProjectShell>
    </div>
  );
}
