import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import {
  filterPostsByTag,
  getAllPosts,
  getAllPostTags,
} from "@/content/posts";
import { DEFAULT_KEYWORDS } from "@/content/siteSeo";

const POSTS_PER_PAGE = 3;

function buildSearchParams(page: number, tag: string | null) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (tag) params.set("tag", tag);
  return params;
}

export default function BlogIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const activeTag = searchParams.get("tag");

  const allPosts = getAllPosts();
  const allTags = getAllPostTags();
  const filtered = filterPostsByTag(allPosts, activeTag);
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const currentPosts = filtered.slice(startIndex, startIndex + POSTS_PER_PAGE);

  function setTag(tag: string | null) {
    setSearchParams(buildSearchParams(1, tag));
  }

  function setPage(page: number) {
    setSearchParams(buildSearchParams(page, activeTag));
  }

  return (
    <>
      <SEO
        title="Writing and Insights | Layth Ayache"
        description="Articles on AI systems engineering, infrastructure reliability, and applied technical strategy."
        canonical="https://laythayache.com/blog"
        keywords={[...DEFAULT_KEYWORDS, "blog", "articles", "ai insights"]}
        modifiedTime={allPosts[0]?.date}
      />

      <section className="section-shell px-6">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent"
          >
            <ArrowLeft size={14} aria-hidden />
            Back to homepage
          </Link>

          <h1 className="type-h2 mt-5">Writing and Insights</h1>
          <p className="type-body mt-4 max-w-3xl">
            Notes on building practical AI systems, resilient software, and
            infrastructure that holds under pressure.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTag(null)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeTag === null
                  ? "border-accent bg-accent text-white"
                  : "border-border-strong bg-surface-raised text-text-secondary hover:border-accent hover:text-accent"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setTag(tag)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  activeTag === tag
                    ? "border-accent bg-accent text-white"
                    : "border-border-strong bg-surface-raised text-text-secondary hover:border-accent hover:text-accent"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {currentPosts.map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-xl border border-border bg-surface-raised"
              >
                {post.coverImage && (
                  <div className="aspect-[16/9] w-full overflow-hidden border-b border-border bg-surface-overlay">
                    <img
                      src={post.coverImage}
                      alt={`${post.title} cover image`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-sm text-text-muted">
                    {post.date} · {post.readingTimeMinutes} min read
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-text-secondary">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={`${post.slug}-${tag}`}
                        className="rounded-full border border-border-strong bg-surface px-2.5 py-1 text-xs text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                  >
                    Read article
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage(Math.max(1, safePage - 1))}
              disabled={safePage <= 1}
              className="rounded-md border border-border-strong bg-surface-raised px-3 py-2 text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-text-muted">
              Page {safePage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage(Math.min(totalPages, safePage + 1))}
              disabled={safePage >= totalPages}
              className="rounded-md border border-border-strong bg-surface-raised px-3 py-2 text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
