import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllPosts } from "@/content/posts";

export default function BlogSection() {
  const reduced = useReducedMotion();
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog" className="section-glass-alt section-shell px-6">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
        }}
      >
        <motion.h2
          className="type-h2 text-center"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          Writing and Insights
        </motion.h2>
        <motion.p
          className="type-body mx-auto mt-4 max-w-3xl text-center"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          In-depth notes on AI systems design, reliability, and practical
          engineering decisions.
        </motion.p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <motion.article
              key={post.slug}
              className="overflow-hidden rounded-xl border border-border bg-surface-raised"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
              }}
            >
              {post.coverImage && (
                <div className="aspect-[16/9] overflow-hidden border-b border-border bg-surface-overlay">
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
                <h3 className="mt-2 text-xl font-semibold text-text-primary">
                  {post.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={`${post.slug}-${tag}`}
                      className="rounded border border-border-strong bg-surface px-2.5 py-1 text-xs text-text-secondary"
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
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-8 flex justify-center"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface-raised px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            View all articles
            <ArrowRight size={14} aria-hidden />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
