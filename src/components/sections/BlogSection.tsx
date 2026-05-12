import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllPosts } from "@/content/posts";
import NewsletterSignup from "@/components/NewsletterSignup";

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
        <motion.div
          className="mb-10"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
            <span className="text-leather">—</span> no. 06 / writing
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-text-primary">
            Field notes from the engineering bench.
          </h2>
          <div aria-hidden="true" className="mt-4 h-[2px] w-14 bg-leather" />
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] text-text-secondary">
            In-depth notes on AI systems design, reliability, and practical
            engineering decisions.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <motion.article
              key={post.slug}
              className="card-lift overflow-hidden rounded-md border border-border bg-surface-raised"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
              }}
            >
              <div className="aspect-[16/9] overflow-hidden border-b border-border bg-surface-overlay">
                <img
                  src={post.coverImage || "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&q=80"}
                  alt={
                    post.coverImageAlt ??
                    `${post.title} cover image`
                  }
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
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

        <motion.div
          className="mx-auto mt-8 max-w-md"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          <NewsletterSignup />
        </motion.div>
      </motion.div>
    </section>
  );
}
