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
  ndaRequired: boolean;
}

export interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
}

export interface TranslationFlowNode {
  label: string;
  detail: string;
}

export interface Audience {
  title: string;
  points: string[];
  ndaRequired: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface ThankItem {
  name: string;
  note: string;
  link?: string;
}

export interface LSLSubsection {
  title: string;
  content: string;
}

export interface ChallengePrompt {
  question: string;
  context: string;
}

export interface TocItem {
  id: string;
  label: string;
}

// ── Table of contents ───────────────────────

export const tocItems: TocItem[] = [
  { id: "problem", label: "The Problem" },
  { id: "system-reality", label: "System Reality" },
  { id: "intervention", label: "Intervention" },
  { id: "what-worked", label: "What Worked" },
  { id: "what-didnt", label: "What Didn't" },
  { id: "unsolved", label: "Unsolved" },
  { id: "challenges", label: "Challenges" },
];

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

// ── Section 1: The Problem ──────────────────

export const problemIntro =
  "Lebanese Sign Language has no digital infrastructure. No standard dataset, no translation system, no unified reference. Deaf communities in Lebanon navigate daily life through a language that is invisible to technology — and largely invisible to policy.";

export const lslSubsections: LSLSubsection[] = [
  {
    title: "A Language Without a Map",
    content:
      "LSL is not a standardized or unified language. It varies across regions, communities, and schools. There is no comprehensive dictionary, no grammar reference, and no formal teaching corpus. Every attempt to build technology for LSL starts from nearly zero.",
  },
  {
    title: "The Invisible Language",
    content:
      "Before this project, there were no publicly available LSL datasets. The language existed only in person-to-person transmission, invisible to research and technology. What cannot be measured cannot be improved — and LSL could not be measured.",
  },
  {
    title: "A History of Failed Starts",
    content:
      "Multiple initiatives to document and digitize LSL have been attempted over the years. Most collapsed due to lack of funding, institutional support, or community involvement. The pattern is consistent: initial enthusiasm, partial data collection, then abandonment.",
  },
  {
    title: "An Urgent Silence",
    content:
      "Without digital tools, LSL speakers face barriers to education, employment, healthcare, and social inclusion. The absence of translation technology is not a convenience problem — it is a civil rights gap. Every year without infrastructure is another year of exclusion.",
  },
];

// ── Section 2: System Reality ───────────────

export const systemRealityIntro =
  "Building sign language translation for LSL means operating inside constraints that most ML projects never encounter. The technical challenges are real, but the systemic ones are harder.";

export const systemConstraints: string[] = [
  "No standardized LSL grammar or vocabulary reference exists. Regional variation is significant and undocumented.",
  "Arabic Sign Language gestures serve as the closest reference foundation, but LSL diverges in ways that are not formally catalogued.",
  "Sign language data is inherently biometric. Collection, storage, and processing carry privacy obligations that exceed typical computer vision projects.",
  "Real-time translation requires sub-100ms inference. Server-round-trip architectures cannot meet this for live conversation.",
  "WCAG compliance is non-negotiable. The target users are the people most affected by accessibility failures.",
  "Federated learning is necessary to keep sign data on-device, but adds architectural complexity and limits model coordination.",
];

export const audiences: Audience[] = [
  {
    title: "Individuals",
    points: [
      "Mobile app for daily communication",
      "Video call integration with real-time subtitles",
      "Personal sign language learning paths",
    ],
    ndaRequired: false,
  },
  {
    title: "Educators",
    points: [
      "Interactive LSL/ASL lesson builder",
      "Student progress tracking and analytics",
      "Classroom integration tools",
    ],
    ndaRequired: false,
  },
  {
    title: "Developers",
    points: [
      "REST API for sign language recognition",
      "JavaScript SDK for web integration",
      "Technical documentation and model specs",
    ],
    ndaRequired: true,
  },
  {
    title: "Organizations",
    points: [
      "Enterprise deployment and team training",
      "WCAG compliance certification support",
      "Custom model fine-tuning for domain-specific signs",
    ],
    ndaRequired: true,
  },
];

// ── Section 3: Intervention ─────────────────

export const interventionIntro =
  "OmniSign is an AI-powered sign language translation system focused on Lebanese Sign Language. It combines computer vision, neural language modeling, and edge computing to provide real-time gesture-to-text-and-speech translation — with privacy as a structural constraint, not an afterthought.";

export const translationFlow: TranslationFlowNode[] = [
  { label: "Sign Input", detail: '"Love"' },
  { label: "Federated Model Processing", detail: '"I love you!"' },
  { label: "Text & Speech Output", detail: "Real-time TTS" },
];

export const howItWorks: HowItWorksStep[] = [
  {
    number: 1,
    title: "Capture",
    description:
      "Computer vision captures hand gestures, facial expressions, and body position in real-time through standard camera input.",
  },
  {
    number: 2,
    title: "Process",
    description:
      "Federated on-device processing analyzes gesture context, grammar patterns, and temporal sequences. Sign data never leaves the device.",
  },
  {
    number: 3,
    title: "Translate",
    description:
      "Recognized gestures are converted to structured text. A text-to-speech engine generates natural spoken output simultaneously.",
  },
  {
    number: 4,
    title: "Connect",
    description:
      "Bidirectional real-time communication: sign-to-text/speech for signers, text/speech-to-visual-cues for non-signers.",
  },
];

export const features: Feature[] = [
  {
    title: "Real-Time Translation",
    description:
      "Computer vision pipeline for live video calls. Instant recognition and translation of sign language gestures with sub-frame latency.",
    ndaRequired: false,
  },
  {
    title: "AI Language Model",
    description:
      "Neural networks trained on diverse sign language datasets. Reported accuracy: 98% on internal evaluation set. Real-world performance varies by lighting, angle, and signer variation.",
    ndaRequired: true,
  },
  {
    title: "Multi-Modal Output",
    description:
      "Simultaneous text and speech output. Real-time TTS generates natural spoken language from recognized signs. Configurable output modes.",
    ndaRequired: false,
  },
  {
    title: "Learning Platform",
    description:
      "Interactive sign language lessons with progress tracking and personalized learning paths. Covers both ASL and LSL curricula.",
    ndaRequired: false,
  },
  {
    title: "Accessibility First",
    description:
      "WCAG-compliant interface with haptic feedback, screen reader support, and high-contrast modes. Built for the people who need it most.",
    ndaRequired: false,
  },
  {
    title: "ASL & LSL Support",
    description:
      "Dedicated support for both American Sign Language and Lebanese Sign Language. LSL support built from our own dataset — the first of its kind.",
    ndaRequired: false,
  },
  {
    title: "Low Latency",
    description:
      "Under 100ms end-to-end using edge computing architecture. Inference runs on-device where possible, with edge fallback for complex sequences.",
    ndaRequired: true,
  },
  {
    title: "Privacy Protected",
    description:
      "Privacy-first architecture using federated learning. Sign data is processed on-device and never transmitted to central servers. Model updates are aggregated without raw data exposure.",
    ndaRequired: true,
  },
];

// ── Section 4: What Worked ──────────────────

export const workedIntro =
  "OmniSign is not finished. But several things worked — and they represent real progress in a space where progress has historically stalled.";

export const workedPoints: string[] = [
  "Built the first-ever functional LSL dataset. Limited in context and vocabulary, but it exists — a foundation where there was none.",
  "Alphabet-level gesture recognition achieved approximately 89% accuracy in controlled testing. The 98% figure reported elsewhere reflects a narrower evaluation scope.",
  "Real-time inference operational on mid-range mobile devices using MediaPipe for hand/pose landmark extraction.",
  "Multi-modal output (text + speech) functioning end-to-end in prototype.",
  "Edge processing architecture achieving sub-100ms latency in optimal conditions.",
  "Privacy-first federated learning pipeline operational — sign data stays on-device.",
  "WCAG compliance achieved across the interface.",
  "Team of 6 delivered across computer vision, web development, mobile, and linguistics disciplines.",
];

// ── Section 4b: What Didn't ─────────────────

export const didntIntro =
  "Honesty requires documenting what fell short. These are not footnotes — they are central to understanding the project's actual state.";

export const didntPoints: string[] = [
  "Word-level and sentence-level LSL translation remain unsolved. The system handles alphabet-level signs but not conversational signing.",
  "The dataset is too small for robust generalization. Performance degrades significantly outside controlled conditions.",
  "Regional LSL variation is not addressed. The dataset reflects one community's signing patterns.",
  "The 98% accuracy claim needs significant caveats — it applies to a controlled evaluation set, not in-the-wild performance. Real-world accuracy is lower and highly variable.",
  "Community data contribution pipeline was planned but not operationalized. Data collection still requires direct researcher involvement.",
  "Grammar and temporal pattern recognition is rudimentary. The system recognizes individual signs but struggles with sign sequences that carry grammatical meaning.",
];

// ── Section 5: What Remains Unsolved ────────

export const unsolvedIntro =
  "These are the open problems. Some are technical, some are structural, all are real. This section is the most important one on this page.";

export const unsolvedPoints: string[] = [
  "Scaling the LSL dataset beyond alphabet-level to include words, phrases, and conversational patterns.",
  "Building a community data contribution pipeline that is ethical, sustainable, and produces high-quality training data.",
  "Handling regional LSL variation systematically — documenting differences, building models that can adapt.",
  "Moving from gesture recognition to genuine conversational translation with grammar and context awareness.",
  "Funding sustainability. This project has no commercial model and runs on contributed time.",
  "Institutional partnerships for data collection, validation, and deployment in schools and public services.",
];

export const buildFutureCTA = {
  heading: "Build the Future With Us",
  description:
    "OmniSign needs community involvement, linguistic expertise, data contribution, and sustained funding to move beyond its current foundation. If you can contribute in any of these areas, this is an open invitation.",
};

// ── Section 6: Challenges ───────────────────

export const challengePrompts: ChallengePrompt[] = [
  {
    question:
      "Is computer vision the right approach for sign language translation?",
    context:
      "Sensor-based methods (gloves, wristbands) offer higher spatial precision. Camera-based CV is more accessible but less accurate for fine motor signs. What's the right tradeoff?",
  },
  {
    question:
      "What does 98% accuracy actually mean in real-world conditions?",
    context:
      "The reported metric is on a controlled evaluation set. How should we communicate model performance honestly? What evaluation methodology would be more rigorous?",
  },
  {
    question:
      "Is federated learning genuinely necessary, or is it over-engineering?",
    context:
      "Federated learning adds significant architectural complexity. Is the privacy benefit proportional? Would differential privacy on centralized data achieve similar protections with less complexity?",
  },
  {
    question:
      "Should LSL standardization precede or follow digitization?",
    context:
      "Building technology for a non-standardized language risks encoding one variant as 'correct.' But waiting for standardization means waiting indefinitely. What's the responsible sequence?",
  },
  {
    question:
      "Are we solving the right problem?",
    context:
      "Would investment in LSL education infrastructure be more impactful than translation technology? Is OmniSign addressing a symptom rather than the root cause of exclusion?",
  },
];

// ── Special Thanks ──────────────────────────

export const thanks: ThankItem[] = [
  {
    name: "Sign with Naila",
    note: "Community education and outreach for sign language awareness",
    link: "https://www.instagram.com/signwithnaila/",
  },
  {
    name: "Father Charbel and the Sin el Fil Church",
    note: "Hosting and facilitating data collection sessions with the deaf community",
  },
  {
    name: "The Aaramoun Orphanage",
    note: "Participation in early testing and feedback from residents and staff, Lebanon",
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
    role: "Computer Vision & Machine Learning Engineer",
    image: "/layth-ayache.jpeg",
  },
  {
    name: "Abu Baker Hussein El Khatib",
    role: "Mobile & Web Application Development",
    image: "/abubaker.jpeg",
  },
  {
    name: "Noor El Hariri",
    role: "Web Developer & Project Coordinator",
    image: "/noor-el-hariri.jpeg",
  },
  {
    name: "Rami Kronbi",
    role: "Computer Vision & Machine Learning Engineer",
    image: "/rami-kronbi.jpeg",
  },
  {
    name: "Dr. Oussama Mustapha",
    role: "Research Advisor and Consultant",
    image: "/oussama-mustapha.jpeg",
  },
];

// ── Footer ──────────────────────────────────

export const footerContent = {
  tagline: "OmniSign — AI-powered sign language translation for Lebanese Sign Language",
  links: [
    { label: "Features", href: "#intervention" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "/projects/omnisign/contact" },
  ],
  copyright: "\u00A9 2026 OmniSign. All rights reserved.",
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};
