import SEO from "@/components/SEO";
import { DEFAULT_KEYWORDS } from "@/content/siteSeo";
import { experiments, type ExperimentStatus } from "@/content/experiments";

const statusColor: Record<ExperimentStatus, string> = {
  active: "text-accent",
  researching: "text-text-secondary",
  paused: "text-text-muted/60",
};

const statusDot: Record<ExperimentStatus, string> = {
  active: "bg-accent",
  researching: "bg-text-secondary",
  paused: "bg-text-muted/30",
};

export default function Experiments() {
  return (
    <>
      <SEO
        title="Experiments | Layth Ayache"
        description="Ongoing technical experiments in AI infrastructure, multilingual retrieval, edge inference, and data extraction."
        canonical="https://laythayache.com/experiments"
        keywords={DEFAULT_KEYWORDS}
        modifiedTime="2026-02-16"
      />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="font-sans text-2xl font-semibold text-text-primary">
            Experiments
          </h1>
          <p className="text-sm text-text-secondary">
            Active research and technical exploration. Status tracked honestly.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {experiments.map((exp) => (
            <article key={exp.id} className="border border-border p-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-sans text-lg font-semibold text-text-primary">
                  {exp.title}
                </h2>
                <span className="flex shrink-0 items-center gap-1.5">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${statusDot[exp.status]}`}
                  />
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider ${statusColor[exp.status]}`}
                  >
                    {exp.status}
                  </span>
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {exp.description}
              </p>
              <p className="mt-3 font-mono text-xs text-text-muted">
                Updated:{" "}
                {new Date(exp.updated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
