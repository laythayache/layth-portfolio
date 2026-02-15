import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { filterProjects } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";
import NotFound from "./NotFound";

export default function SystemDetail() {
  const { slug } = useParams<{ slug: string }>();
  const projects = slug ? filterProjects({ system: slug }) : [];

  if (!slug || projects.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <Link
        to="/systems"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={14} />
        All systems
      </Link>

      <div className="mb-10 flex flex-col gap-2">
        <h1 className="font-sans text-2xl font-semibold text-text-primary">
          {slug}
        </h1>
        <p className="text-sm text-text-secondary">
          {projects.length} project{projects.length !== 1 ? "s" : ""} in this
          system.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
