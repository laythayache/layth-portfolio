import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEO from "@/components/SEO";

interface Article {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
}

const articles: Article[] = [
  {
    slug: "pipelines-that-dont-fail-silently",
    title: "Pipelines That Don't Fail Silently",
    summary:
      "Error handling, monitoring, and alerting patterns for production data pipelines. Why silent failures are worse than crashes.",
    date: "2026-02-10",
    tags: ["infrastructure", "monitoring", "pipelines"],
  },
  {
    slug: "versioning-public-data",
    title: "Versioning Public Data",
    summary:
      "Change detection and diff storage for dynamic content. Design decisions for tracking what was published, when it changed, and what the source actually said.",
    date: "2026-01-28",
    tags: ["architecture", "versioning", "public-data"],
  },
];

export default function Writing() {
  return (
    <>
      <SEO
        title="Writing — Layth Ayache"
        description="Technical notes on infrastructure, architecture, pipelines, and systems design."
        canonical="https://laythayache.com/writing"
      />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="font-sans text-2xl font-semibold text-text-primary">
            Writing
          </h1>
          <p className="text-sm text-text-secondary">
            Technical notes on infrastructure, architecture, and systems design.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="text-sm text-text-muted">
            Technical writing in progress. Check back soon.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/writing/${article.slug}`}
                className="group flex flex-col gap-3 border border-border p-6 transition-colors hover:border-border-strong hover:bg-surface-raised"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="font-sans text-lg font-semibold text-text-primary mb-2">
                      {article.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {article.summary}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <span className="font-mono text-xs text-text-muted">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {article.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-text-muted">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
