import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SEO from "@/components/SEO";
import { omnisignJsonLd } from "@/content/omnisign-seo";
import {
  VIDEO_URL,
  tagline,
  quickFacts,
  originHook,
  originStory,
  discoveryTitle,
  discoveryNarrative,
  datasetTitle,
  datasetStory,
  partners,
  interventionSummary,
  features,
  communityQuote,
  communityStory,
  roadmapItems,
  team,
} from "@/content/omnisign";

/* ── Animation constants ── */
const EASE_OUT: [number, number, number, number] = [0, 0, 0.2, 1];

const IS_VIDEO_READY = !VIDEO_URL.includes("XXXXX");

const regions = [
  "Beqaa",
  "South Lebanon",
  "Beirut",
  "School A — Beirut",
  "School B — Beirut",
];

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`;

export default function OmnisignMicrosite() {
  const reduced = useReducedMotion();

  /* Reusable animation prop builders */
  const section = {
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 } as const,
    transition: { duration: reduced ? 0.15 : 0.6, ease: EASE_OUT },
  };

  function stagger(i: number, extra?: Record<string, unknown>) {
    return {
      initial: { opacity: 0, y: reduced ? 0 : 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true } as const,
      transition: {
        delay: reduced ? 0 : i * 0.08,
        duration: reduced ? 0.15 : 0.5,
        ease: EASE_OUT,
        ...extra,
      },
    };
  }

  const lift = reduced ? {} : { y: -2 };

  return (
    <article className="relative min-h-screen bg-white">
      <SEO
        title="OmniSign — AI Sign Language Translation | Lebanese Sign Language"
        description="OmniSign is an AI-powered Lebanese Sign Language (LSL) translation system built by Layth Ayache, Tayseer Laz, Rami Kronbi, Noor El Hariri, Abu Baker El Khatib, and Dr. Oussama Mustapha at Rafik Hariri University. Partnered with SignWithNaila. 50,000+ signs, 98% accuracy, self-funded."
        keywords="OmniSign, Lebanese Sign Language, LSL, Sign Language Lebanon, Arabic Sign Language, sign language translation, AI sign language, computer vision sign language, deaf community Lebanon, SignWithNaila, Rafik Hariri University, Layth Ayache, Tayseer Laz, Abu Baker Hussein El Khatib, Noor El Hariri, Rami Kronbi, Dr. Oussama Mustapha, accessibility, real-time translation, machine learning"
        canonical="https://laythayache.com/projects/omnisign"
        ogType="article"
        ogImage="https://laythayache.com/omnisign-logo.png"
        jsonLd={omnisignJsonLd}
      />

      {/* Grain texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-40"
        aria-hidden="true"
        style={{ backgroundImage: GRAIN, opacity: 0.035 }}
      />

      {/* ── Hero ── */}
      <section id="hero" className="mx-auto max-w-5xl px-6 pb-10 pt-8">
        <motion.div {...section}>
          <Link
            to="/explore"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-slate-600"
          >
            <ArrowLeft size={14} />
            Back to explore
          </Link>

          <div className="mb-6 flex items-center gap-4">
            <img
              src="/omnisign-logo.png"
              alt="OmniSign logo — AI-powered Lebanese Sign Language translation"
              className="h-12 w-12 object-contain"
            />
            <h1 className="font-sans text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              OmniSign
              <span className="sr-only">
                {" "}— AI-Powered Lebanese Sign Language Translation
              </span>
            </h1>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ongoing
            </span>
            <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-teal-700">
              accessibility
            </span>
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-slate-600">
              computer vision
            </span>
            <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-amber-700">
              self-funded
            </span>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
            {tagline}
          </p>
        </motion.div>
      </section>

      {/* ── Video or visual hero ── */}
      {IS_VIDEO_READY ? (
        <motion.section
          className="mx-auto max-w-5xl px-6 pb-16"
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0.15 : 0.5, ease: EASE_OUT }}
        >
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
            <div className="relative aspect-video w-full">
              <video
                className="h-full w-full object-cover"
                controls
                preload="metadata"
                playsInline
              >
                <source src={VIDEO_URL} type="video/mp4" />
              </video>
            </div>
          </div>
        </motion.section>
      ) : (
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-slate-900">
          <motion.div
            className="relative mx-auto max-w-5xl px-6 py-20 md:py-28"
            {...section}
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-teal-200">
              Demo coming soon
            </p>
            <p className="max-w-xl font-sans text-2xl font-medium leading-snug text-white/90 md:text-3xl">
              Real-time sign language recognition,
              <br />
              built for a language with no digital history.
            </p>
          </motion.div>
        </section>
      )}

      {/* ── Stats strip ── */}
      <section id="stats" className="border-y border-slate-100">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-slate-100 sm:grid-cols-4">
          {quickFacts.map((fact, i) => (
            <motion.div
              key={fact.label}
              className="px-6 py-8 text-center"
              initial={{ opacity: 0, scale: reduced ? 1 : 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: reduced ? 0 : i * 0.1,
                duration: reduced ? 0.15 : 0.5,
                ease: EASE_OUT,
              }}
            >
              <span className="block font-sans text-4xl font-extrabold tracking-tight text-teal-600 md:text-5xl">
                {fact.value}
              </span>
              <span className="mt-2 block font-mono text-[11px] uppercase tracking-wider text-slate-500">
                {fact.label}
              </span>
              {fact.caveat && (
                <span className="mt-1 block text-[11px] leading-tight text-slate-400">
                  {fact.caveat}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Origin Story ── */}
      <section id="origin" className="bg-white">
        <motion.div
          className="mx-auto max-w-5xl px-6 py-20 md:py-28"
          {...section}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-teal-600">
            How It Started
          </p>

          {/* Big hook — slides from left */}
          <motion.h2
            className="mb-12 max-w-3xl font-sans text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, x: reduced ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0.15 : 0.8, ease: EASE_OUT }}
          >
            {originHook}
          </motion.h2>

          <div className="max-w-3xl">
            <div className="flex flex-col gap-5">
              {originStory.map((p, i) => (
                <motion.p
                  key={i}
                  {...stagger(i)}
                  className={
                    i === 2
                      ? "border-l-2 border-teal-600 pl-5 font-sans text-lg font-medium leading-relaxed text-slate-800"
                      : "text-base leading-relaxed text-slate-600"
                  }
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── The Discovery ── */}
      <section id="discovery" className="border-t border-slate-100 bg-slate-50">
        <motion.div
          className="mx-auto max-w-5xl px-6 py-20 md:py-28"
          {...section}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-teal-600">
            What We Found
          </p>
          <h2 className="mb-6 font-sans text-3xl font-bold text-slate-900 md:text-4xl">
            {discoveryTitle}
          </h2>

          {/* Fragmentation visual — staggered chips */}
          <div className="mb-12 flex flex-wrap items-center gap-2">
            {regions.map((region, i) => (
              <motion.div
                key={region}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: reduced ? 0 : i * 0.06,
                  duration: reduced ? 0.15 : 0.4,
                  ease: EASE_OUT,
                }}
              >
                <span className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-mono text-xs text-slate-700">
                  {region}
                </span>
                {i < regions.length - 1 && (
                  <span
                    className="font-mono text-lg font-bold text-red-400"
                    style={{ textShadow: "0 0 8px rgba(248,113,113,0.4)" }}
                  >
                    &ne;
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid gap-10 md:grid-cols-5 md:gap-12">
            <div className="flex flex-col gap-4 md:col-span-3">
              {discoveryNarrative.map((p, i) => (
                <motion.p
                  key={i}
                  {...stagger(i)}
                  className="text-base leading-relaxed text-slate-600"
                >
                  {p}
                </motion.p>
              ))}
            </div>
            <div className="flex items-end md:col-span-2">
              <motion.blockquote
                className="border-l-2 border-teal-600 pl-5"
                initial={{ opacity: 0, x: reduced ? 0 : 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduced ? 0.15 : 0.6, ease: EASE_OUT }}
              >
                <p className="font-sans text-xl font-semibold leading-snug text-slate-800 md:text-2xl">
                  &ldquo;We decided this was the step we had to take ourselves
                  — not wait for someone else to take it.&rdquo;
                </p>
              </motion.blockquote>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── The Dataset ── */}
      <section id="dataset" className="border-t border-slate-100 bg-white">
        <motion.div
          className="mx-auto max-w-5xl px-6 py-20 md:py-28"
          {...section}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-teal-600">
            What We Built
          </p>
          <h2 className="mb-12 font-sans text-3xl font-bold text-slate-900 md:text-4xl">
            {datasetTitle}
          </h2>

          {/* Big number cards with animated progress bars */}
          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { num: "50k+", desc: "raw signs collected across Lebanon", bar: "62%", barColor: "bg-teal-500", label: "collection" },
              { num: "80k+", desc: "processed image flows after augmentation", bar: "100%", barColor: "bg-teal-600", label: "processed" },
              { num: "30+", desc: "daily words & expressions + full alphabet", bar: "35%", barColor: "bg-teal-400", label: "vocabulary" },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                className="rounded-xl border border-slate-200 bg-gradient-to-br from-teal-50 to-white p-8"
                {...stagger(i)}
              >
                <span className="block font-sans text-5xl font-extrabold tracking-tight text-teal-600 md:text-6xl">
                  {card.num}
                </span>
                <span className="mt-2 block text-sm text-slate-500">
                  {card.desc}
                </span>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className={`h-full rounded-full ${card.barColor}`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: card.bar }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reduced ? 0.15 : 0.8,
                      delay: reduced ? 0 : 0.3,
                      ease: EASE_OUT,
                    }}
                  />
                </div>
                <span className="mt-1 block text-right font-mono text-[10px] text-slate-400">
                  {card.label}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col gap-4">
              {datasetStory.map((p, i) => (
                <motion.p
                  key={i}
                  {...stagger(i)}
                  className="text-base leading-relaxed text-slate-600"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Partners — teal left border */}
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-slate-400">
                Community Partners
              </h3>
              <div className="flex flex-col gap-3">
                {partners.map((partner, i) => (
                  <motion.div
                    key={partner.name}
                    className="rounded-lg border border-slate-200 border-l-2 bg-slate-50 p-4"
                    style={{ borderLeftColor: "#0d9488" }}
                    {...stagger(i)}
                    whileHover={lift}
                    transition={{ duration: 0.15 }}
                  >
                    <p className="font-sans text-sm font-semibold text-slate-900">
                      {partner.name}
                    </p>
                    <p className="mt-0.5 text-[13px] text-slate-500">
                      {partner.note}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Community — full-width quote break ── */}
      <section id="community" className="relative overflow-hidden bg-slate-900">
        {/* Grain on dark section */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{ backgroundImage: GRAIN, opacity: 0.025 }}
        />
        <motion.div
          className="relative mx-auto max-w-5xl px-6 py-20 md:py-28"
          {...section}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-teal-400">
            Why It Matters
          </p>

          {/* Quote — scale reveal */}
          <motion.blockquote
            className="mb-12"
            initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0.15 : 0.7, ease: EASE_OUT }}
          >
            <p className="font-sans text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              &ldquo;{communityQuote}&rdquo;
            </p>
          </motion.blockquote>

          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {communityStory.map((p, i) => (
              <motion.p
                key={i}
                className="text-base leading-relaxed text-slate-300"
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: reduced ? 0 : 0.3 + i * 0.1,
                  duration: reduced ? 0.15 : 0.5,
                  ease: EASE_OUT,
                }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── How It Works ── */}
      <section id="features" className="border-t border-slate-100 bg-white">
        <motion.div
          className="mx-auto max-w-5xl px-6 py-20 md:py-28"
          {...section}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-teal-600">
            How It Works
          </p>
          <h2 className="mb-4 font-sans text-3xl font-bold text-slate-900 md:text-4xl">
            From gesture to language
          </h2>
          <p className="mb-12 max-w-2xl text-base leading-relaxed text-slate-600">
            {interventionSummary}
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="group relative overflow-hidden rounded-lg border border-slate-200 border-t-2 bg-white p-5 transition-all hover:border-teal-200 hover:shadow-md"
                style={{ borderTopColor: "#0d9488" }}
                {...stagger(i)}
                whileHover={lift}
              >
                <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 font-mono text-xs font-bold text-teal-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 font-sans text-sm font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Roadmap ── */}
      <section id="roadmap" className="border-t border-slate-100 bg-slate-50">
        <motion.div
          className="mx-auto max-w-5xl px-6 py-20 md:py-28"
          {...section}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-teal-600">
            What&apos;s Next
          </p>
          <h2 className="mb-12 font-sans text-3xl font-bold text-slate-900 md:text-4xl">
            The road ahead
          </h2>

          {/* Timeline */}
          <div className="relative">
            {/* Animated connecting line */}
            <motion.div
              className="absolute left-4 top-0 hidden w-px bg-slate-200 md:block"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0.15 : 1.2, ease: EASE_OUT }}
            />

            <div className="flex flex-col gap-8">
              {roadmapItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="relative flex gap-6"
                  {...stagger(i)}
                  whileHover={lift}
                >
                  {/* Dot on timeline */}
                  <div className="relative z-10 hidden md:block">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        i === 0
                          ? "border-teal-600 bg-teal-600"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] font-bold ${
                          i === 0 ? "text-white" : "text-slate-400"
                        }`}
                      >
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-lg border border-slate-200 bg-white p-6">
                    <span className="mb-2 inline-block rounded-full bg-teal-50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-teal-600">
                      {item.label}
                    </span>
                    <h3 className="mb-1 font-sans text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Team ── */}
      <section id="team" className="border-t border-slate-100 bg-white">
        <motion.div
          className="mx-auto max-w-5xl px-6 py-20 md:py-28"
          {...section}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-teal-600">
            Team
          </p>
          <h2 className="mb-12 font-sans text-3xl font-bold text-slate-900 md:text-4xl">
            The people behind OmniSign
          </h2>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="flex flex-col gap-3"
                {...stagger(i)}
              >
                <div className="aspect-square w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  <motion.img
                    src={member.image}
                    alt={`${member.name} — ${member.role}, OmniSign Lebanese Sign Language project`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    whileHover={reduced ? {} : { scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-medium text-slate-900">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[11px] font-medium text-teal-600">
                    {member.role}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-400">
                    {member.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section id="get-involved" className="border-t border-teal-100 bg-teal-600">
        <motion.div
          className="mx-auto max-w-5xl px-6 py-16 text-center md:py-24"
          initial={{ opacity: 0, y: reduced ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduced ? 0.15 : 0.6, ease: EASE_OUT }}
        >
          <h2 className="mb-4 font-sans text-2xl font-bold text-white md:text-3xl">
            This project needs people, not just code.
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-teal-100">
            OmniSign needs community involvement, linguistic expertise, data
            contribution, and sustained funding to move beyond its current
            stage. If you can contribute in any way — this is an open
            invitation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/laythayache/omnisign"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-sans text-sm font-semibold text-teal-600 transition-colors hover:bg-teal-50"
            >
              View on GitHub
              <ArrowUpRight size={16} />
            </a>
            <Link
              to="/submit?project=omnisign"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Submit a challenge
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <p className="font-mono text-[11px] text-slate-400">
            &copy; 2026 OmniSign. All rights reserved.
          </p>
        </div>
      </footer>
    </article>
  );
}
