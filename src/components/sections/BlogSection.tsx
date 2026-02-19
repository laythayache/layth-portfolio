import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { articles } from "@/content/articles";
import { Link } from "react-router-dom";
import { SECTION } from "@/motion/tokens";
import { useMediaQuery } from "@/motion/useMediaQuery";

const MotionLink = motion(Link);

const arrowNudge = {
  rest: { x: 0 },
  hover: {
    x: 4,
    transition: { duration: 0.24, ease: SECTION.ease },
  },
};

export default function BlogSection() {
  const reduced = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(3);
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const mobileViewport = useMediaQuery("(max-width: 767px)");
  const mobileTuned = coarsePointer || mobileViewport;
  const visibleArticles = articles.slice(0, visibleCount);

  const cardHover =
    reduced || mobileTuned ? undefined : SECTION.cardHover;

  return (
    <section id="blog" className="section-glass-alt section-shell px-6">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={SECTION.viewport}
        variants={SECTION.container}
      >
        <motion.h2
          className="text-center font-serif text-3xl font-bold text-text-primary md:text-4xl"
          variants={SECTION.fadeUp}
        >
          Writing &amp; Insights
        </motion.h2>

        <div className="mt-12 flex flex-col gap-6">
          {visibleArticles.map((article) => (
            <motion.div
              key={article.slug}
              className={cn(
                "overflow-hidden rounded-lg border border-border bg-surface-raised",
                "flex flex-col transition-colors md:flex-row"
              )}
              variants={SECTION.fadeUp}
              whileHover={cardHover}
            >
              <div className="flex w-full shrink-0 items-center justify-center bg-surface-overlay p-8 md:w-48">
                <FileText size={32} className="text-text-muted" />
              </div>

              <div className="flex flex-col gap-2 p-6">
                <h3 className="text-xl font-semibold text-text-primary">
                  {article.title}
                </h3>
                <p className="text-base text-text-secondary">{article.summary}</p>
                <p className="font-mono text-sm text-text-muted">
                  {article.date}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-4">
                  {article.externalUrl && (
                    <a
                      href={article.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-magnetic
                      data-cursor-label="Read Article"
                      className="inline-flex items-center gap-1.5 font-mono text-sm text-accent hover:underline"
                    >
                      Read on Medium
                      <ArrowRight size={13} />
                    </a>
                  )}

                  {article.relatedProject && (
                    <MotionLink
                      to={`/projects/${article.relatedProject.slug}`}
                      data-magnetic
                      data-cursor-label="View Project"
                      className="inline-flex items-center gap-1.5 font-mono text-sm text-text-secondary transition-colors hover:text-accent"
                      initial="rest"
                      animate="rest"
                      whileHover={reduced || mobileTuned ? undefined : "hover"}
                    >
                      {article.relatedProject.label}
                      <motion.span variants={arrowNudge}>
                        <ArrowRight size={13} />
                      </motion.span>
                    </MotionLink>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleCount < articles.length && (
          <motion.div className="mt-8 flex justify-center" variants={SECTION.fadeUp}>
            <button
              type="button"
              onClick={() => setVisibleCount((previous) => previous + 3)}
              className="rounded-md border border-border-strong bg-surface-raised px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              Load More Articles
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
