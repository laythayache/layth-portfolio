import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SEO from "@/components/SEO";
import { getPostBySlug } from "@/content/posts";
import { blogPostJsonLd, DEFAULT_KEYWORDS } from "@/content/siteSeo";
import { extractTocFromMarkdown, slugify } from "@/lib/blog-toc";
import {
  DesktopTOC,
  MobileTOC,
} from "@/components/microsite/TableOfContents";
import ShareBar from "@/components/ShareBar";
import { cn } from "@/lib/utils";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  const tocItems = useMemo(
    () => (post ? extractTocFromMarkdown(post.content) : []),
    [post]
  );
  const showToc = tocItems.length >= 2;

  if (!post) return <NotFound />;

  const postUrl = `https://laythayache.com/blog/${post.slug}`;

  return (
    <>
      <SEO
        title={`${post.title} | Layth Ayache`}
        description={post.excerpt}
        canonical={postUrl}
        keywords={[...DEFAULT_KEYWORDS, ...post.tags]}
        publishedTime={post.date}
        modifiedTime={post.date}
        ogType="article"
        ogImage={post.coverImage ? `https://laythayache.com${post.coverImage}` : undefined}
        jsonLd={blogPostJsonLd(post)}
      />

      <article className="relative section-shell px-6">
        {showToc && (
          <div className="fixed right-8 top-28 z-30 hidden w-48 lg:block">
            <DesktopTOC items={tocItems} />
          </div>
        )}

        <div className={cn("mx-auto max-w-3xl", showToc && "lg:mr-64")}>
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
            {showToc && (
              <div className="mt-6">
                <MobileTOC items={tocItems} />
              </div>
            )}
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
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => {
                  const text = String(children);
                  const id = slugify(text);
                  return (
                    <h2 id={id} className="scroll-mt-24">
                      {children}
                    </h2>
                  );
                },
              }}
            >
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

          <ShareBar url={postUrl} title={post.title} />
        </div>
      </article>
    </>
  );
}
