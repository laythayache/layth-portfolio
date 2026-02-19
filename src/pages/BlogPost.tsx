import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SEO from "@/components/SEO";
import { getPostBySlug } from "@/content/posts";
import { blogPostJsonLd, DEFAULT_KEYWORDS } from "@/content/siteSeo";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <NotFound />;

  return (
    <>
      <SEO
        title={`${post.title} | Layth Ayache`}
        description={post.excerpt}
        canonical={`https://laythayache.com/blog/${post.slug}`}
        keywords={[...DEFAULT_KEYWORDS, ...post.tags]}
        publishedTime={post.date}
        modifiedTime={post.date}
        ogType="article"
        ogImage={post.coverImage ? `https://laythayache.com${post.coverImage}` : undefined}
        jsonLd={blogPostJsonLd(post)}
      />

      <article className="section-shell px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent"
          >
            <ArrowLeft size={14} aria-hidden />
            Back to articles
          </Link>

          <header className="mt-6">
            <p className="type-caption">
              {post.date} · {post.readingTimeMinutes} min read
            </p>
            <h1 className="type-h2 mt-3">{post.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
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
          </header>

          {post.coverImage && (
            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface-overlay">
              <img
                src={post.coverImage}
                alt={`${post.title} hero image`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="blog-markdown mt-8 max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {post.externalCanonical && (
            <a
              href={post.externalCanonical}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface-raised px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
              title="Opens in a new tab"
            >
              Original publication
              <ArrowUpRight size={14} aria-hidden />
            </a>
          )}
        </div>
      </article>
    </>
  );
}
