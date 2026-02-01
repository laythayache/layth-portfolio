import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Section from "@/components/microsite/Section";
import Stat from "@/components/microsite/Stat";
import Callout from "@/components/microsite/Callout";
import Badge from "@/components/microsite/Badge";
import FeatureCard from "@/components/microsite/FeatureCard";
import Stepper from "@/components/microsite/Stepper";
import AudienceCard from "@/components/microsite/AudienceCard";
import TeamGrid from "@/components/microsite/TeamGrid";
import ThanksList from "@/components/microsite/ThanksList";
import Diagram from "@/components/microsite/Diagram";
import CTA from "@/components/microsite/CTA";
import { DesktopTOC, MobileTOC } from "@/components/microsite/TableOfContents";
import {
  tocItems,
  quickFacts,
  problemIntro,
  lslSubsections,
  systemRealityIntro,
  systemConstraints,
  audiences,
  interventionIntro,
  translationFlow,
  howItWorks,
  features,
  workedIntro,
  workedPoints,
  didntIntro,
  didntPoints,
  unsolvedIntro,
  unsolvedPoints,
  buildFutureCTA,
  challengePrompts,
  thanks,
  team,
  footerContent,
} from "@/content/omnisign";

export default function OmnisignMicrosite() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Skip to content */}
      <a
        href="#problem"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-20 focus:z-50 focus:border focus:border-text-primary focus:bg-surface focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-text-primary"
      >
        Skip to content
      </a>

      {/* Back link */}
      <Link
        to="/explore"
        className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-text-secondary"
      >
        <ArrowLeft size={14} />
        Back to explore
      </Link>

      {/* ── Header ── */}
      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="status">ongoing</Badge>
          <Badge>intervention</Badge>
          <Badge>accessibility</Badge>
          <Badge variant="mode">lab</Badge>
        </div>

        <div className="mb-3 flex items-center gap-4">
          <img
            src="/omnisign-logo.png"
            alt=""
            className="h-10 w-10 object-contain"
          />
          <h1 className="font-sans text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            OmniSign
          </h1>
        </div>

        <p className="mb-6 max-w-2xl text-base leading-relaxed text-text-secondary">
          AI-powered sign language translation for Lebanese Sign Language.
          Computer vision meets an underserved language where data barely exists.
        </p>

        {/* Emoji strip */}
        <div className="mb-6 flex items-center gap-2 text-lg opacity-60">
          <span role="img" aria-label="wave">👋</span>
          <span role="img" aria-label="love sign">🤟</span>
          <span role="img" aria-label="peace">✌️</span>
          <span role="img" aria-label="pray">🙏</span>
          <span role="img" aria-label="thumbs up">👍</span>
          <span role="img" aria-label="heart">❤️</span>
        </div>

        {/* Quick facts */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickFacts.map((fact) => (
            <Stat
              key={fact.label}
              label={fact.label}
              value={fact.value}
              caveat={fact.caveat}
            />
          ))}
        </div>
      </header>

      {/* Mobile TOC */}
      <MobileTOC items={tocItems} />

      {/* ── Main content + Desktop TOC ── */}
      <div className="lg:grid lg:grid-cols-[1fr_180px] lg:gap-12">
        <div>
          {/* ════════════════════════════════════ */}
          {/* SECTION 1: THE PROBLEM              */}
          {/* ════════════════════════════════════ */}
          <Section id="problem" label="The Problem">
            <p className="mb-8 text-base leading-relaxed text-text-secondary">
              {problemIntro}
            </p>

            <div className="flex flex-col gap-6">
              {lslSubsections.map((sub) => (
                <div key={sub.title}>
                  <h3 className="mb-2 font-sans text-sm font-semibold text-text-primary">
                    {sub.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {sub.content}
                  </p>
                </div>
              ))}
            </div>

            <Callout variant="note" className="mt-8">
              Core reference: Arabic Sign Language gestures serve as the
              foundation for the LSL dataset. The Arabic sign language alphabet
              is used as the basis for initial data collection and model
              training.
            </Callout>

            <div className="mt-4 border border-border p-4">
              <img
                src="/arabic-sign-language-alphabet.png"
                alt="Arabic Sign Language alphabet reference chart showing hand positions for each letter"
                className="w-full"
                loading="lazy"
              />
              <p className="mt-2 font-mono text-[11px] text-text-muted">
                Arabic Sign Language — alphabet gestures used as LSL dataset
                foundation
              </p>
            </div>
          </Section>

          {/* ════════════════════════════════════ */}
          {/* SECTION 2: SYSTEM REALITY            */}
          {/* ════════════════════════════════════ */}
          <Section id="system-reality" label="System Reality">
            <p className="mb-6 text-base leading-relaxed text-text-secondary">
              {systemRealityIntro}
            </p>

            <h3 className="mb-3 font-sans text-sm font-semibold text-text-primary">
              Constraints
            </h3>
            <ul className="mb-8 flex flex-col gap-3">
              {systemConstraints.map((c, i) => (
                <li
                  key={i}
                  className="border-l-2 border-border pl-4 text-sm leading-relaxed text-text-secondary"
                >
                  {c}
                </li>
              ))}
            </ul>

            <h3 className="mb-4 font-sans text-sm font-semibold text-text-primary">
              Built for everyone
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {audiences.map((a) => (
                <AudienceCard key={a.title} audience={a} />
              ))}
            </div>
          </Section>

          {/* ════════════════════════════════════ */}
          {/* SECTION 3: INTERVENTION              */}
          {/* ════════════════════════════════════ */}
          <Section id="intervention" label="Intervention">
            <p className="mb-8 text-base leading-relaxed text-text-secondary">
              {interventionIntro}
            </p>

            {/* Translation flow */}
            <h3 className="mb-4 font-sans text-sm font-semibold text-text-primary">
              Real-time translation flow
            </h3>
            <Diagram nodes={translationFlow} />

            {/* How it works */}
            <h3 className="mb-4 mt-10 font-sans text-sm font-semibold text-text-primary">
              How it works
            </h3>
            <Stepper steps={howItWorks} />

            {/* Features */}
            <h3 className="mb-4 font-sans text-sm font-semibold text-text-primary">
              Features
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <FeatureCard key={f.title} feature={f} />
              ))}
            </div>

            <Callout variant="warn" className="mt-6">
              Features marked with NDA require access approval. Model
              architecture, edge infrastructure details, and federated learning
              implementation specifics are available under non-disclosure.{" "}
              <Link
                to="/projects/omnisign/contact"
                className="underline underline-offset-2"
              >
                Request access
              </Link>
              .
            </Callout>
          </Section>

          {/* ════════════════════════════════════ */}
          {/* SECTION 4: WHAT WORKED               */}
          {/* ════════════════════════════════════ */}
          <Section id="what-worked" label="What Worked">
            <p className="mb-6 text-base leading-relaxed text-text-secondary">
              {workedIntro}
            </p>
            <ul className="flex flex-col gap-3">
              {workedPoints.map((point, i) => (
                <li
                  key={i}
                  className="border-l-2 border-emerald-500/30 pl-4 text-sm leading-relaxed text-text-secondary"
                >
                  {point}
                </li>
              ))}
            </ul>
          </Section>

          {/* ════════════════════════════════════ */}
          {/* SECTION 4b: WHAT DIDN'T              */}
          {/* ════════════════════════════════════ */}
          <Section id="what-didnt" label="What Didn't">
            <p className="mb-6 text-base leading-relaxed text-text-secondary">
              {didntIntro}
            </p>
            <ul className="flex flex-col gap-3">
              {didntPoints.map((point, i) => (
                <li
                  key={i}
                  className="border-l-2 border-red-500/30 pl-4 text-sm leading-relaxed text-text-secondary"
                >
                  {point}
                </li>
              ))}
            </ul>
          </Section>

          {/* ════════════════════════════════════ */}
          {/* SECTION 5: UNSOLVED                  */}
          {/* ════════════════════════════════════ */}
          <Section id="unsolved" label="What Remains Unsolved">
            <p className="mb-6 text-base leading-relaxed text-text-secondary">
              {unsolvedIntro}
            </p>
            <ul className="mb-10 flex flex-col gap-3">
              {unsolvedPoints.map((point, i) => (
                <li
                  key={i}
                  className="border-l-2 border-amber-500/30 pl-4 text-sm leading-relaxed text-text-secondary"
                >
                  {point}
                </li>
              ))}
            </ul>

            <div className="border border-border p-6">
              <h3 className="mb-2 font-sans text-lg font-semibold text-text-primary">
                {buildFutureCTA.heading}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                {buildFutureCTA.description}
              </p>
              <CTA to="/projects/omnisign/contact">Get involved</CTA>
            </div>
          </Section>

          {/* ════════════════════════════════════ */}
          {/* SECTION 6: CHALLENGES                */}
          {/* ════════════════════════════════════ */}
          <Section id="challenges" label="Challenges">
            <p className="mb-6 text-base leading-relaxed text-text-secondary">
              These are open questions — genuine uncertainties about whether
              OmniSign is approaching the problem correctly. If you have
              expertise, experience, or just a strong opinion, the challenge is
              open.
            </p>

            <div className="mb-8 flex flex-col gap-4">
              {challengePrompts.map((prompt, i) => (
                <div
                  key={i}
                  className="border border-border p-4 transition-colors hover:bg-surface-raised"
                >
                  <h4 className="mb-2 font-sans text-sm font-semibold text-text-primary">
                    {prompt.question}
                  </h4>
                  <p className="text-[13px] leading-relaxed text-text-muted">
                    {prompt.context}
                  </p>
                </div>
              ))}
            </div>

            <CTA to="/submit?project=omnisign">Submit a challenge</CTA>
          </Section>

          {/* ── Special Thanks ── */}
          <div className="border-t border-border py-10">
            <h2 className="mb-6 font-mono text-xs uppercase tracking-wider text-text-muted">
              Special Thanks
            </h2>
            <ThanksList items={thanks} />
          </div>

          {/* ── Team ── */}
          <div id="team" className="scroll-mt-24 border-t border-border py-10">
            <h2 className="mb-6 font-mono text-xs uppercase tracking-wider text-text-muted">
              Team
            </h2>
            <TeamGrid members={team} />
          </div>

          {/* ── Footer ── */}
          <footer className="border-t border-border py-8">
            <p className="mb-4 text-sm text-text-secondary">
              {footerContent.tagline}
            </p>
            <div className="mb-4 flex flex-wrap gap-4">
              {footerContent.links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="font-mono text-xs text-text-muted underline underline-offset-2 hover:text-text-secondary"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-mono text-xs text-text-muted underline underline-offset-2 hover:text-text-secondary"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
            <p className="font-mono text-[11px] text-text-muted/60">
              {footerContent.copyright}
            </p>
            <div className="mt-1 flex gap-3">
              {footerContent.legal.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-mono text-[11px] text-text-muted/40 hover:text-text-muted"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </footer>
        </div>

        {/* Desktop TOC sidebar */}
        <DesktopTOC items={tocItems} />
      </div>
    </div>
  );
}
