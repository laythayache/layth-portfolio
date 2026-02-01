// ──────────────────────────────────────────────
// OmniSign microsite content — single source of truth
// ──────────────────────────────────────────────

export interface QuickFact {
  label: string;
  value: string;
  caveat?: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

// ── Video ───────────────────────────────────
// Replace with your R2 public bucket URL once you have it.
// Find it in: R2 > portfolio-assets > Settings > Public access

export const VIDEO_URL =
  "https://pub-XXXXX.r2.dev/WhatsApp%20Video%202025-11-29%20at%2012.43.10%20PM.mp4";

// ── Quick facts ─────────────────────────────

export const quickFacts: QuickFact[] = [
  {
    label: "Accuracy",
    value: "98%",
    caveat: "Internal evaluation on controlled dataset",
  },
  {
    label: "Languages",
    value: "ASL + LSL",
    caveat: "American & Lebanese Sign Language",
  },
  {
    label: "Latency",
    value: "<100ms",
    caveat: "Edge computing, optimal conditions",
  },
  {
    label: "Privacy",
    value: "Federated",
    caveat: "Sign data never leaves device",
  },
];

// ── The Problem ─────────────────────────────

export const problemSummary =
  "Lebanese Sign Language has no digital infrastructure. No standard dataset, no translation system, no unified reference. Deaf communities in Lebanon navigate daily life through a language that is invisible to technology — and largely invisible to policy.";

export const problemDetail =
  "Before this project, there were no publicly available LSL datasets. The language existed only in person-to-person transmission, invisible to research and technology. Multiple initiatives to document and digitize LSL have been attempted over the years — most collapsed due to lack of funding, institutional support, or community involvement. Without digital tools, LSL speakers face barriers to education, employment, healthcare, and social inclusion. The absence of translation technology is not a convenience problem — it is a civil rights gap.";

// ── Intervention ────────────────────────────

export const interventionSummary =
  "OmniSign combines computer vision, neural language modeling, and edge computing to provide real-time gesture-to-text-and-speech translation — with privacy as a structural constraint, not an afterthought.";

// ── Features ────────────────────────────────

export const features: Feature[] = [
  {
    title: "Real-Time Translation",
    description:
      "Computer vision pipeline for live video calls. Instant recognition and translation of sign language gestures with sub-frame latency.",
  },
  {
    title: "AI Language Model",
    description:
      "Neural networks trained on diverse sign language datasets. 98% accuracy on internal evaluation. Real-world performance varies by conditions.",
  },
  {
    title: "Multi-Modal Output",
    description:
      "Simultaneous text and speech output. Real-time TTS generates natural spoken language from recognized signs.",
  },
  {
    title: "Learning Platform",
    description:
      "Interactive sign language lessons with progress tracking and personalized learning paths for ASL and LSL.",
  },
  {
    title: "Accessibility First",
    description:
      "WCAG-compliant interface with haptic feedback, screen reader support, and high-contrast modes.",
  },
  {
    title: "ASL & LSL Support",
    description:
      "Dedicated support for both American and Lebanese Sign Language. LSL support built from our own dataset — the first of its kind.",
  },
  {
    title: "Low Latency",
    description:
      "Under 100ms end-to-end using edge computing. Inference runs on-device where possible, with edge fallback for complex sequences.",
  },
  {
    title: "Privacy Protected",
    description:
      "Federated learning architecture. Sign data is processed on-device and never transmitted to central servers.",
  },
];

// ── Team ────────────────────────────────────

export const team: TeamMember[] = [
  {
    name: "Tayseer Laz",
    role: "Web & PR Coordinator",
    image: "/tayseer-laz.jpeg",
  },
  {
    name: "Layth Ayache",
    role: "Computer Vision & ML Engineer",
    image: "/layth-ayache.jpeg",
  },
  {
    name: "Abu Baker Hussein El Khatib",
    role: "Mobile & Web Development",
    image: "/abubaker.jpeg",
  },
  {
    name: "Noor El Hariri",
    role: "Web Developer & Project Coordinator",
    image: "/noor-el-hariri.jpeg",
  },
  {
    name: "Rami Kronbi",
    role: "Computer Vision & ML Engineer",
    image: "/rami-kronbi.jpeg",
  },
  {
    name: "Dr. Oussama Mustapha",
    role: "Research Advisor",
    image: "/oussama-mustapha.jpeg",
  },
];
