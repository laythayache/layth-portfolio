import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { DEFAULT_KEYWORDS, thinkingPageJsonLd } from "@/content/siteSeo";
import { articles } from "@/content/articles";

export default function Thinking() {
  return (
    <>
      <SEO
        title="Thinking | Layth Ayache"
        description="Technical essays on infrastructure, architecture, and building from unstable ground."
        canonical="https://laythayache.com/thinking"
        keywords={DEFAULT_KEYWORDS}
        modifiedTime="2026-02-16"
        jsonLd={thinkingPageJsonLd(articles)}
      />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="font-sans text-2xl font-semibold text-text-primary">
            Thinking
          </h1>
          <p className="text-sm text-text-secondary">
            Technical essays on infrastructure, decisions, and building from
            unstable ground.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="text-sm text-text-muted">
            Technical writing in progress. Check back soon.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {articles.map((article) => {
              const articleContent = (
                <div
                  className={`group flex flex-col gap-3 border border-border p-6 transition-colors ${
                    article.externalUrl
                      ? "cursor-pointer hover:border-border-strong"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h2 className="font-sans text-lg font-semibold text-text-primary">
                          {article.title}
                        </h2>
                        {article.draft && (
                          <span className="rounded border border-border-strong px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                            Coming soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {article.summary}
                      </p>
                    </div>
                    {!article.draft && (
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-text-muted">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs text-text-muted"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    {article.relatedProject && (
                      <Link
                        to={`/projects/${article.relatedProject.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex w-fit items-center gap-2 rounded border border-border-strong px-3 py-1.5 font-mono text-xs font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent"
                      >
                        {article.relatedProject.label}
                        <ExternalLink size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              );

              return article.externalUrl ? (
                <a
                  key={article.slug}
                  href={article.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline"
                >
                  {articleContent}
                </a>
              ) : (
                <div key={article.slug}>{articleContent}</div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
