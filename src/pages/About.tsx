export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 font-sans text-2xl font-semibold text-text-primary">
        About
      </h1>

      <div className="flex flex-col gap-8 text-base leading-relaxed text-text-secondary">
        <section>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
            Method
          </h2>
          <p>
            I treat every project as a system to understand before intervening.
            The process is always the same: map the problem, document the
            constraints honestly, build the smallest viable intervention, then
            record what worked and what didn't — publicly.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
            Who I am
          </h2>
          <p>
            Layth Ayache. Based in Lebanon. I work at the intersection of
            software engineering and systems that affect real people —
            accessibility, public infrastructure, environmental data, healthcare
            logistics. I'm not building a career narrative. I'm building things
            that need to exist, documenting the process honestly, and inviting
            scrutiny.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
            Why public
          </h2>
          <p>
            Most portfolios present polished results. This workspace shows the
            full picture: the failures, the unsolved problems, the tradeoffs I'm
            not sure about. If you see something wrong, that's not a bug in the
            presentation — it's an invitation to challenge it.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
            Stack
          </h2>
          <p className="font-mono text-sm text-text-muted">
            React · TypeScript · Vite · Tailwind CSS · Framer Motion ·
            Cloudflare Pages
          </p>
        </section>
      </div>
    </div>
  );
}
