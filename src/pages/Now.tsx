import SEO from "@/components/SEO";

export default function Now() {
  return (
    <>
      <SEO
        title="Now — Layth Ayache"
        description="What I'm working on right now."
        canonical="https://laythayache.com/now"
      />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-8 font-sans text-2xl font-semibold text-text-primary">
          Now
        </h1>

        <div className="space-y-4 text-base leading-relaxed text-text-secondary">
          <p>
            <strong className="text-text-primary">Building:</strong> Public
            information infrastructure. Distributed scraping framework with
            change detection, normalization pipeline for heterogeneous media
            sources, versioned storage with diff tracking, RESTful API layer
            with query capabilities. Goal: systems that track what public
            institutions publish and when content changes.
          </p>

          <p>
            <strong className="text-text-primary">Fixing:</strong> OmniSign
            federated learning edge cases. Regional dialect variation (Northern
            vs Southern LSL differences), real-world performance degradation in
            natural lighting, hand-occlusion handling. Working toward
            word-level translation as next milestone beyond alphabet.
          </p>

          <p>
            <strong className="text-text-primary">Learning:</strong> Graph
            database patterns for relationship-heavy data structures. Exploring
            Neo4j and similar approaches for systems with complex entity
            relationships and change provenance.
          </p>

          <p>
            <strong className="text-text-primary">Looking for:</strong>{" "}
            Collaborators on public data infrastructure. Particularly interested
            in: media tracking, change detection at scale, ethical data
            collection frameworks, regional deployment in under-resourced
            contexts.
          </p>

          <p>
            <strong className="text-text-primary">Open to:</strong> Technical
            architecture consulting for production systems. Infrastructure
            design reviews. Data pipeline optimization. Federated learning
            architecture.
          </p>
        </div>

        <p className="mt-10 font-mono text-xs uppercase tracking-wider text-text-muted">
          Last updated: February 2026
        </p>
      </div>
    </>
  );
}
