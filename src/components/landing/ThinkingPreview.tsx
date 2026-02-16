import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { articles } from "@/content/articles";

const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
};

export default function ThinkingPreview() {
  const reduced = useReducedMotion();
  const latest = articles.filter((a) => !a.draft).slice(0, 3);

  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-3xl"
        initial={reduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fade}
      >
        <h2 className="font-serif text-2xl font-semibold text-text-primary md:text-3xl">
          Thinking
        </h2>
        <p className="mt-3 text-sm text-text-secondary">
          Technical essays on infrastructure, decisions, and building from
          unstable ground.
        </p>

        <div className="mt-8 space-y-6">
          {latest.map((article) => (
            <div key={article.slug} className="border-t border-border pt-6">
              <h3 className="font-sans text-base font-semibold text-text-primary">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {article.summary}
              </p>
              <p className="mt-2 font-mono text-xs text-text-muted">
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/thinking"
            className="font-mono text-sm text-text-muted underline underline-offset-4 decoration-border transition-colors hover:text-accent hover:decoration-accent"
          >
            All writing &rarr;
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
