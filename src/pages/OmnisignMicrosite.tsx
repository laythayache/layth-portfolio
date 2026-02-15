import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import { useRef, useState } from "react";
import SEO from "@/components/SEO";
import { omnisignJsonLd } from "@/content/omnisign-seo";
import { DEFAULT_KEYWORDS } from "@/content/siteSeo";
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
  faqItems,
  timelineItems,
  ctaCards,
} from "@/content/omnisign";
import AnimatedCounter from "@/components/omnisign/AnimatedCounter";
import FAQAccordion from "@/components/omnisign/FAQAccordion";
import HandLandmarks from "@/components/omnisign/HandLandmarks";
import VisualTimeline from "@/components/omnisign/VisualTimeline";
import CTACards from "@/components/omnisign/CTACards";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  function handlePlayClick() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.muted = false;
      v.controls = true;
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }

  return (
    <article className="relative min-h-screen bg-white">
      <SEO
        title="OmniSign | AI Sign Language Translation for Lebanese Sign Language"
        description="OmniSign is an AI-powered Lebanese Sign Language (LSL) translation system built by Layth Ayache, Tayseer Laz, Rami Kronbi, Noor El Hariri, Abu Baker El Khatib, and Dr. Oussama Mustapha at Rafik Hariri University. Partnered with SignWithNaila. 50,000+ signs, 98% accuracy, self-funded."
        keywords={[
          ...DEFAULT_KEYWORDS,
          "OmniSign",
          "Lebanese Sign Language",
          "LSL",
          "sign language translation",
          "AI sign language translation",
          "accessibility technology Lebanon",
          "computer vision",
        ]}
        canonical="https://laythayache.com/projects/omnisign"
        ogType="article"
        ogImage="https://laythayache.com/omnisign-logo.png"
        ogImageAlt="OmniSign logo"
        modifiedTime="2026-02-05"
        jsonLd={omnisignJsonLd}
      />

      {/* Grain texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-40"
        aria-hidden="true"
        style={{ backgroundImage: GRAIN, opacity: 0.035 }}
      />

      {/* ── Hero ── */}
      <section id="hero" className="relative pb-6 pt-8">
        {/* Decorative hand landmarks background */}
        <div className="pointer-events-none absolute -right-10 top-0 h-64 w-64 opacity-[0.07] md:right-10 md:h-96 md:w-96">
          <HandLandmarks className="h-full w-full text-teal-600" />
        </div>
        <div className="mx-auto max-w-6xl px-6">
          <motion.div {...section}>
            <Link
              to="/explore"
              className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-slate-600"
            >
              <ArrowLeft size={14} />
              Back to explore
            </Link>

            <div className="mb-5 flex items-center gap-5">
              <img
                src="/omnisign-logo.png"
                alt="OmniSign logo — AI-powered Lebanese Sign Language translation"
                className="h-14 w-14 object-contain"
              />
              <h1 className="font-sans text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                OmniSign
                <span className="sr-only">
                  {" "}— AI-Powered Lebanese Sign Language Translation
                </span>
              </h1>
            </div>

            <p className="mb-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
              {tagline}
            </p>

            <div className="flex flex-wrap items-center gap-2">
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
          </motion.div>
        </div>
      </section>

      {/* ── Cinematic Video ── */}
      {IS_VIDEO_READY ? (
        <section className="mx-auto max-w-6xl px-6 pb-8">
          <motion.div
            className="group relative overflow-hidden rounded-2xl bg-slate-900 shadow-2xl"
            initial={{ opacity: 0, y: reduced ? 0 : 20, scale: reduced ? 1 : 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0.15 : 0.7, ease: EASE_OUT }}
          >
            <div className="relative aspect-video w-full">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={VIDEO_URL} type="video/mp4" />
              </video>

              {/* Gradient overlay — bottom fade for depth */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-slate-900/10" />

              {/* Play button overlay — visible until user interacts */}
              {!isPlaying && (
                <motion.button
                  onClick={handlePlayClick}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  aria-label="Play video with sound"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform hover:scale-110 md:h-20 md:w-20">
                    <Play size={28} className="ml-1 text-teal-600" />
                  </span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </section>
      ) : (
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-slate-900">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{ backgroundImage: GRAIN, opacity: 0.04 }}
          />
          <motion.div
            className="relative mx-auto max-w-6xl px-6 py-20 md:py-28"
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

      {/* ── Stats — animated counters ── */}
      <section id="stats" className="relative z-10 mx-auto -mt-8 max-w-5xl px-6 pb-16">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200/60 bg-white/80 shadow-lg backdrop-blur-sm sm:grid-cols-4 sm:gap-4">
          {quickFacts.map((fact, i) => (
            <AnimatedCounter
              key={fact.label}
              value={fact.value}
              label={fact.label}
              caveat={fact.caveat}
              index={i}
            />
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

          {/* Big hook — slides from left, dramatic size */}
          <motion.h2
            className="mb-14 max-w-4xl font-sans text-4xl font-bold leading-[1.1] text-slate-900 md:text-5xl lg:text-7xl"
            initial={{ opacity: 0, x: reduced ? 0 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0.15 : 0.8, ease: EASE_OUT }}
          >
            {originHook}
          </motion.h2>

          <div className="grid gap-12 md:grid-cols-5">
            <div className="flex flex-col gap-6 md:col-span-3">
              {originStory.map((p, i) => (
                <motion.p
                  key={i}
                  {...stagger(i)}
                  className={
                    i === 2
                      ? "border-l-2 border-teal-600 pl-6 font-sans text-lg font-medium leading-relaxed text-slate-800"
                      : "text-base leading-[1.8] text-slate-600"
                  }
                >
                  {p}
                </motion.p>
              ))}
            </div>
            <div className="hidden items-end md:col-span-2 md:flex">
              <motion.div
                className="rounded-xl bg-slate-50 p-8"
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: reduced ? 0.15 : 0.6, ease: EASE_OUT }}
              >
                <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-400">
                  The moment
                </p>
                <p className="font-sans text-xl font-semibold leading-snug text-slate-800">
                  He had every right to share that moment with the people around him
                  — easier than that.
                </p>
                <div className="mt-6 h-px bg-gradient-to-r from-teal-600 to-transparent" />
              </motion.div>
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
          <h2 className="mb-8 font-sans text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
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
                <span className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-mono text-xs font-medium text-slate-700 shadow-sm">
                  {region}
                </span>
                {i < regions.length - 1 && (
                  <span
                    className="font-mono text-xl font-bold text-red-400"
                    style={{ textShadow: "0 0 8px rgba(248,113,113,0.4)" }}
                  >
                    &ne;
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid gap-10 md:grid-cols-5 md:gap-12">
            <div className="flex flex-col gap-5 md:col-span-3">
              {discoveryNarrative.map((p, i) => (
                <motion.p
                  key={i}
                  {...stagger(i)}
                  className="text-base leading-[1.8] text-slate-600"
                >
                  {p}
                </motion.p>
              ))}
            </div>
            <div className="flex items-end md:col-span-2">
              <motion.blockquote
                className="border-l-2 border-teal-600 pl-6"
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
      <section id="dataset" className="bg-white">
        <motion.div
          className="mx-auto max-w-5xl px-6 py-20 md:py-28"
          {...section}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-teal-600">
            What We Built
          </p>
          <h2 className="mb-14 font-sans text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
            {datasetTitle}
          </h2>

          {/* Big number cards with animated progress bars */}
          <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {[
              { num: "50k+", desc: "raw signs collected across Lebanon", bar: "62%", barColor: "bg-teal-500", label: "collection" },
              { num: "80k+", desc: "processed image flows after augmentation", bar: "100%", barColor: "bg-teal-600", label: "processed" },
              { num: "30+", desc: "daily words & expressions + full alphabet", bar: "35%", barColor: "bg-teal-400", label: "vocabulary" },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                className="rounded-2xl border border-slate-100 bg-gradient-to-br from-teal-50/80 via-white to-white p-8 shadow-sm sm:p-10"
                {...stagger(i)}
                whileHover={lift}
              >
                <span className="block font-sans text-5xl font-extrabold tracking-tight text-teal-600 md:text-6xl">
                  {card.num}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-slate-500">
                  {card.desc}
                </span>
                <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
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
                <span className="mt-1.5 block text-right font-mono text-[10px] tracking-wider text-slate-400">
                  {card.label}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-5">
              {datasetStory.map((p, i) => (
                <motion.p
                  key={i}
                  {...stagger(i)}
                  className="text-base leading-[1.8] text-slate-600"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Partners — teal left border */}
            <div>
              <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-slate-400">
                Community Partners
              </h3>
              <div className="flex flex-col gap-3">
                {partners.map((partner, i) => (
                  <motion.div
                    key={partner.name}
                    className="rounded-xl border border-slate-200 border-l-2 bg-slate-50/80 p-5 transition-shadow hover:shadow-md"
                    style={{ borderLeftColor: "#0d9488" }}
                    {...stagger(i)}
                    whileHover={lift}
                    transition={{ duration: 0.15 }}
                  >
                    <p className="font-sans text-sm font-semibold text-slate-900">
                      {partner.name}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
                      {partner.note}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Community — cinematic dark break ── */}
      <section id="community" className="relative overflow-hidden bg-slate-900">
        {/* Grain on dark section */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{ backgroundImage: GRAIN, opacity: 0.025 }}
        />
        {/* Teal glow behind the quote */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
          style={{
            width: 600,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(13,148,136,0.08) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="relative mx-auto max-w-5xl px-6 py-24 md:py-32"
          {...section}
        >
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-teal-400">
            Why It Matters
          </p>

          {/* Quote — scale reveal */}
          <motion.blockquote
            className="mb-14"
            initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0.15 : 0.7, ease: EASE_OUT }}
          >
            <p className="max-w-4xl font-sans text-3xl font-bold leading-tight text-white md:text-4xl lg:text-6xl">
              &ldquo;{communityQuote}&rdquo;
            </p>
          </motion.blockquote>

          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {communityStory.map((p, i) => (
              <motion.p
                key={i}
                className="text-base leading-[1.8] text-slate-300"
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
      <section id="features" className="bg-white">
        <motion.div
          className="mx-auto max-w-5xl px-6 py-20 md:py-28"
          {...section}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-teal-600">
            How It Works
          </p>
          <h2 className="mb-4 font-sans text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
            From gesture to language
          </h2>
          <p className="mb-14 max-w-2xl text-base leading-[1.8] text-slate-600">
            {interventionSummary}
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-teal-200 hover:shadow-lg"
                style={{ borderTopWidth: 3, borderTopColor: "#0d9488" }}
                {...stagger(i)}
                whileHover={lift}
              >
                <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 font-mono text-xs font-bold text-teal-600">
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
          className="mx-auto max-w-3xl px-6 py-20 md:py-28"
          {...section}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-teal-600">
            What&apos;s Next
          </p>
          <h2 className="mb-14 font-sans text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
            The road ahead
          </h2>

          <VisualTimeline items={timelineItems} />
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-white">
        <motion.div
          className="mx-auto max-w-3xl px-6 py-20 md:py-28"
          {...section}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-teal-600">
            Questions
          </p>
          <h2 className="mb-10 font-sans text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
            Frequently asked
          </h2>

          <FAQAccordion items={faqItems} />
        </motion.div>
      </section>

      {/* ── Team ── */}
      <section id="team" className="bg-white">
        <motion.div
          className="mx-auto max-w-5xl px-6 py-20 md:py-28"
          {...section}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-teal-600">
            Team
          </p>
          <h2 className="mb-14 font-sans text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
            The people behind OmniSign
          </h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-12">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="group flex flex-col"
                {...stagger(i)}
              >
                <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
                  <motion.img
                    src={member.image}
                    alt={`${member.name} — ${member.role}, OmniSign Lebanese Sign Language project`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  {/* Hover overlay with detail */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="p-4 text-xs leading-relaxed text-white/90">
                      {member.detail}
                    </p>
                  </div>
                </div>
                <h3 className="font-sans text-sm font-semibold text-slate-900">
                  {member.name}
                </h3>
                <p className="font-mono text-[11px] font-medium text-teal-600">
                  {member.role}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-slate-400">
                  {member.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section
        id="get-involved"
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0d9488 0%, #0f766e 40%, #134e4a 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{ backgroundImage: GRAIN, opacity: 0.03 }}
        />
        {/* Decorative hand landmarks */}
        <div className="pointer-events-none absolute -right-20 top-10 h-60 w-60 opacity-10 md:h-80 md:w-80">
          <HandLandmarks className="h-full w-full text-white" />
        </div>
        <motion.div
          className="relative mx-auto max-w-5xl px-6 py-20 md:py-28"
          initial={{ opacity: 0, y: reduced ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduced ? 0.15 : 0.6, ease: EASE_OUT }}
        >
          <div className="mb-12 text-center">
            <h2 className="mb-5 font-sans text-3xl font-bold text-white md:text-4xl">
              This project needs people, not just code.
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-teal-100/90">
              OmniSign needs community involvement, linguistic expertise, data
              contribution, and sustained funding to move beyond its current
              stage. Here&apos;s how you can help.
            </p>
          </div>
          
          <CTACards cards={ctaCards} />
        </motion.div>
      </section>

      {/* ── Media & Social Links ── */}
      <section className="bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-6 py-12 flex flex-col items-center gap-4 text-center">
          <h3 className="font-sans text-lg font-semibold text-slate-800 mb-2">Learn more & connect</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://medium.com/@laythayache5/building-in-a-country-with-no-infrastructure-3f8595472895"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 font-mono text-xs text-slate-700 hover:text-teal-700 hover:border-teal-400 transition"
            >
              <span>Read the story on Medium</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/laythayache"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 font-mono text-xs text-slate-700 hover:text-teal-700 hover:border-teal-400 transition"
            >
              <span>Connect on LinkedIn</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href="https://github.com/laythayache"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 font-mono text-xs text-slate-700 hover:text-teal-700 hover:border-teal-400 transition"
            >
              <span>View GitHub</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
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
