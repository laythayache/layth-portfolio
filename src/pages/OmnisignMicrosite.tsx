import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  VIDEO_URL,
  quickFacts,
  problemSummary,
  problemDetail,
  interventionSummary,
  features,
  team,
} from "@/content/omnisign";

export default function OmnisignMicrosite() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-8">
        {/* Back link */}
        <Link
          to="/explore"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-slate-600"
        >
          <ArrowLeft size={14} />
          Back to explore
        </Link>

        {/* Logo + title */}
        <div className="mb-4 flex items-center gap-4">
          <img
            src="/omnisign-logo.png"
            alt=""
            className="h-12 w-12 object-contain"
          />
          <h1 className="font-sans text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            OmniSign
          </h1>
        </div>

        {/* Badges */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            ongoing
          </span>
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-blue-700">
            accessibility
          </span>
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-slate-600">
            computer vision
          </span>
        </div>

        {/* Tagline */}
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
          AI-powered sign language translation for Lebanese Sign Language.
          Computer vision meets an underserved language where data barely exists.
        </p>

        {/* Video */}
        <div className="mb-10 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
          <div className="relative aspect-video w-full">
            <video
              className="h-full w-full object-cover"
              controls
              preload="metadata"
              playsInline
            >
              <source src={VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <span className="block font-sans text-2xl font-bold text-blue-600">
                {fact.value}
              </span>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500">
                {fact.label}
              </span>
              {fact.caveat && (
                <span className="mt-1 block text-[11px] leading-tight text-slate-400">
                  {fact.caveat}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-blue-600">
            The Problem
          </h2>
          <h3 className="mb-8 font-sans text-2xl font-semibold text-slate-900 md:text-3xl">
            A language invisible to technology
          </h3>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <p className="text-base leading-relaxed text-slate-600">
              {problemSummary}
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              {problemDetail}
            </p>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-blue-600">
            How It Works
          </h2>
          <h3 className="mb-4 font-sans text-2xl font-semibold text-slate-900 md:text-3xl">
            From gesture to language
          </h3>
          <p className="mb-12 max-w-2xl text-base leading-relaxed text-slate-600">
            {interventionSummary}
          </p>

          {/* Features grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-md"
              >
                <h4 className="mb-2 font-sans text-sm font-semibold text-slate-900">
                  {feature.title}
                </h4>
                <p className="text-[13px] leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-blue-600">
            Team
          </h2>
          <h3 className="mb-10 font-sans text-2xl font-semibold text-slate-900 md:text-3xl">
            The people behind OmniSign
          </h3>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col gap-3">
                <div className="aspect-square w-full overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-slate-900">
                    {member.name}
                  </p>
                  <p className="font-mono text-[11px] leading-snug text-slate-500">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Get Involved CTA ── */}
      <section className="border-t border-blue-100 bg-blue-600">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center md:py-24">
          <h2 className="mb-4 font-sans text-2xl font-bold text-white md:text-3xl">
            Interested in OmniSign?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-blue-100">
            OmniSign needs community involvement, linguistic expertise, data
            contribution, and sustained funding to move beyond its current
            foundation. If you can contribute, this is an open invitation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/laythayache/omnisign"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-sans text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
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
    </div>
  );
}
