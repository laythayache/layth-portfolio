import { motion, useReducedMotion } from "framer-motion";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { articles } from "@/content/articles";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BlogSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="blog" className="bg-surface-overlay py-24 px-6">
      <motion.div
        className="mx-auto max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={prefersReduced ? {} : containerVariants}
      >
        <motion.h2
          className="text-center font-serif text-3xl font-bold text-text-primary"
          variants={prefersReduced ? {} : slideUp}
        >
          Writing &amp; Insights
        </motion.h2>

        <div className="mt-12 flex flex-col gap-6">
          {articles.map((article) => (
            <motion.div
              key={article.slug}
              className={cn(
                "overflow-hidden rounded-lg border border-border bg-surface-raised",
                "flex flex-col md:flex-row"
              )}
              variants={prefersReduced ? {} : slideUp}
            >
              {/* Placeholder image area */}
              <div className="flex w-full shrink-0 items-center justify-center bg-surface-overlay p-8 md:w-48">
                <FileText size={32} className="text-text-muted" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 p-6">
                <h3 className="font-semibold text-text-primary">
                  {article.title}
                </h3>
                <p className="text-sm text-text-secondary">{article.summary}</p>
                <p className="font-mono text-xs text-text-muted">
                  {article.date}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-4">
                  {article.externalUrl && (
                    <a
                      href={article.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-accent hover:underline"
                    >
                      Read on Medium &rarr;
                    </a>
                  )}

                  {article.relatedProject && (
                    <Link
                      to={`/projects/${article.relatedProject.slug}`}
                      className="font-mono text-sm text-text-secondary hover:text-accent transition-colors"
                    >
                      {article.relatedProject.label}
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
