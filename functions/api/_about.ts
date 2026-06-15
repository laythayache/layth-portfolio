/// <reference types="@cloudflare/workers-types" />
// Editable About-page content — a single JSON document in the same R2 bucket
// (GALLERY) under the "about/" prefix. Edited in /admin → About tab, rendered
// by src/pages/About.tsx. Files prefixed "_" are not routed.
import type { Env } from "./_auth";

export type Fact = { label: string; value: string };
export type Principle = { title: string; body: string };
export interface AboutContent {
  role: string;
  intro: string; // paragraphs separated by blank lines
  facts: Fact[];
  focusTitle: string;
  focus: string[];
  principlesTitle: string;
  principles: Principle[];
}

export const ABOUT_KEY = "about/content.json";

/* Minimal defaults — only the confirmed title is seeded; the owner fills the
   rest in /admin (so nothing unverified ships). Empty sections hide on the page. */
export const DEFAULT_ABOUT: AboutContent = {
  role: "AI Systems Engineer & Technical Consultant",
  intro: "",
  facts: [],
  focusTitle: "Focus areas",
  focus: [],
  principlesTitle: "How I work",
  principles: [],
};

const str = (v: unknown, max = 400): string => (typeof v === "string" ? v.slice(0, max) : "");
const rec = (v: unknown): Record<string, unknown> => (v && typeof v === "object" ? (v as Record<string, unknown>) : {});

export function sanitizeAbout(input: unknown): AboutContent {
  const o = rec(input);
  const facts = Array.isArray(o.facts)
    ? o.facts.map((f) => { const r = rec(f); return { label: str(r.label, 60), value: str(r.value, 240) }; }).filter((f) => f.label || f.value).slice(0, 12)
    : [];
  const principles = Array.isArray(o.principles)
    ? o.principles.map((p) => { const r = rec(p); return { title: str(r.title, 120), body: str(r.body, 700) }; }).filter((p) => p.title || p.body).slice(0, 12)
    : [];
  const focus = Array.isArray(o.focus) ? o.focus.map((x) => str(x, 140)).filter(Boolean).slice(0, 24) : [];
  return {
    role: str(o.role, 120),
    intro: str(o.intro, 2400),
    facts,
    focusTitle: str(o.focusTitle, 60) || "Focus areas",
    focus,
    principlesTitle: str(o.principlesTitle, 60) || "How I work",
    principles,
  };
}

export async function readAbout(env: Env): Promise<AboutContent> {
  const obj = await env.GALLERY.get(ABOUT_KEY);
  if (!obj) return DEFAULT_ABOUT;
  try {
    return sanitizeAbout(await obj.json());
  } catch {
    return DEFAULT_ABOUT;
  }
}
export async function writeAbout(env: Env, c: AboutContent): Promise<void> {
  await env.GALLERY.put(ABOUT_KEY, JSON.stringify(c), { httpMetadata: { contentType: "application/json" } });
}
