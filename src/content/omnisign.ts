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
  detail: string;
  image: string;
}

export interface Partner {
  name: string;
  note: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
}

export interface CTACard {
  icon: "hand" | "heart" | "users";
  title: string;
  description: string;
  action: string;
  email: string;
  subject: string;
}

// ── Video ───────────────────────────────────
export const VIDEO_URL =
  "https://pub-f6654749f9534ed48b99cc5f4b614b9b.r2.dev/WhatsApp%20Video%202025-11-29%20at%2012.43.10%20PM.mp4";

// ── Hero ────────────────────────────────────
export const tagline =
  "AI-powered sign language translation — built from scratch for a language that technology forgot.";

// ── Quick facts ─────────────────────────────
export const quickFacts: QuickFact[] = [
  {
    label: "Signs Collected",
    value: "50,000+",
    caveat: "Raw data from campaigns across Lebanon",
  },
  {
    label: "Processed Dataset",
    value: "80,000+",
    caveat: "After augmentation and cleaning",
  },
  {
    label: "Accuracy",
    value: "98%",
    caveat: "Internal evaluation, controlled conditions",
  },
  {
    label: "Funding",
    value: "Self-funded",
    caveat: "No institutional or grant backing",
  },
];

// ── Origin story ────────────────────────────
export const originHook =
  "It started with a joke nobody laughed at.";

export const originStory = [
  "During COVID, I met a deaf man at a clinic. He wasn't struggling to be understood — the staff eventually figured out what he needed through context and gestures.",
  "What I noticed was different. He was trying to tell a joke. You could see it in his face, his timing, the way he paused for a reaction that never came. Nobody understood him enough to laugh with him.",
  "He had every right to share that moment with the people around him — easier than that. That was when OmniSign became more than an idea.",
  "Our university gave us the option to choose from faculty-approved projects. We chose to find our own challenge instead. It felt overwhelming. But it felt right.",
];

// ── The Discovery ───────────────────────────
export const discoveryTitle = "A language with no map";

export const discoveryNarrative = [
  "We entered this project assuming data existed. It didn't. We assumed sign language was universal across all spoken languages. It wasn't.",
  "Arabic sign language in Saudi Arabia is completely different from Lebanon. And Lebanon — in a way that surprised no one who knows the country — didn't have a unified sign language at all.",
  "Beqaa was different from the South. The South was different from Beirut. Even different sign language schools within Beirut signed differently from each other.",
  "We spent three months traveling the country trying to find common ground. We couldn't. We were close to giving up.",
  "Then the team got stubborn. All of us, by nature. We decided this was the step we had to take ourselves — not wait for someone else to take it.",
];

// ── The Dataset ─────────────────────────────
export const datasetTitle = "50,000 signs, built by hand";

export const datasetStory = [
  "We held data collection campaigns across Lebanon. Volunteers signed at our homes — family members we taught ourselves. We partnered with NGOs and deaf communities who opened their doors to us.",
  "We collected over 50,000 signs in total. After processing, cleaning, and augmenting the data, we ended up with over 80,000 image flows — covering the full Arabic alphabet and around 30 words and expressions used in daily life.",
  "It was a messy process. If it wasn't for the team's chemistry, it never would have happened.",
];

export const partners: Partner[] = [
  {
    name: "Aaramoun Orphanage Center",
    note: "Data collection and community engagement",
  },
  {
    name: "Sin El Fil Church",
    note: "Data collection with deaf community members",
  },
  {
    name: "SignWithNaila",
    note: "Instagram educator and leader in Lebanon's sign language community",
  },
  {
    name: "Rafik Hariri University",
    note: "Booth space at every campus event for data collection",
  },
];

// ── The Problem (concise) ───────────────────
export const problemSummary =
  "Lebanese Sign Language has no digital infrastructure. No standard dataset, no translation system, no unified reference. Deaf communities in Lebanon navigate daily life through a language that is invisible to technology — and largely invisible to policy.";

export const problemDetail =
  "Before this project, there were no publicly available LSL datasets. The language existed only in person-to-person transmission. Multiple attempts to document and digitize LSL have collapsed due to lack of funding, institutional support, or community involvement. Without translation tools, LSL speakers face barriers to education, employment, healthcare, and social inclusion. This is not a convenience problem — it is a civil rights gap.";

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

// ── Community ───────────────────────────────
export const communityQuote =
  "This isn't a final year project to them. This is a new life.";

export const communityStory = [
  "Deaf individuals in Lebanon reach out at least once a month asking how they can help. They don't see a university assignment — they see the beginning of something that could change their daily life.",
  "The community has been requesting clinical and medical phrases as a priority — the situations where miscommunication carries the highest cost.",
  "Lebanon's sign language translators are rare and expensive. Many deaf people can't afford consistent access. Even among translators, differences in regional signing mean understanding isn't guaranteed. OmniSign exists because this gap shouldn't depend on who you can afford to hire.",
];

// ── Roadmap ─────────────────────────────────
export const roadmapItems = [
  {
    label: "Now",
    title: "MVP stage",
    description:
      "Functional model with full alphabet and 30+ daily expressions. Self-funded, team-maintained.",
  },
  {
    label: "Next 6 months",
    title: "Clinical vocabulary",
    description:
      "New dataset focused on medical and clinical phrases — the most requested addition from the community.",
  },
  {
    label: "In progress",
    title: "ML redesign",
    description:
      "Restructuring the model architecture for faster inference and better real-world performance.",
  },
  {
    label: "Goal",
    title: "MVP to product",
    description:
      "Moving from proof-of-concept to a tool deaf communities in Lebanon can actually depend on.",
  },
];

// ── Team ────────────────────────────────────
export const team: TeamMember[] = [
  {
    name: "Layth Ayache",
    role: "AI & ML Lead",
    detail:
      "Computer vision, model training, data pipeline, dataset cleaning & augmentation, community outreach, event planning",
    image: "/layth-ayache.jpeg",
  },
  {
    name: "Tayseer Laz",
    role: "Web & PR Lead",
    detail:
      "Website development, model integration into mobile app, data collection, community communications, event coordination",
    image: "/tayseer-laz.jpeg",
  },
  {
    name: "Abu Baker Hussein El Khatib",
    role: "App Developer",
    detail:
      "Flutter mobile app, web app development, data collection at campus events and community booths",
    image: "/abubaker.jpeg",
  },
  {
    name: "Noor El Hariri",
    role: "Project Coordinator",
    detail:
      "Flutter app development, academic documentation, project reports, research coordination",
    image: "/noor-el-hariri.jpeg",
  },
  {
    name: "Rami Kronbi",
    role: "Computer Vision Engineer",
    detail:
      "ML engineering, CV pipeline development, data collection, next-phase technical lead",
    image: "/rami-kronbi.jpeg",
  },
  {
    name: "Dr. Oussama Mustapha",
    role: "Research Advisor",
    detail: "Academic guidance, research methodology, project oversight",
    image: "/oussama-mustapha.jpeg",
  },
];

// ── FAQ ─────────────────────────────────────
export const faqItems: FAQItem[] = [
  {
    question: "Which sign languages do you support?",
    answer:
      "We currently support Lebanese Sign Language (LSL) and basic American Sign Language (ASL). LSL is our primary focus — we built the first dataset for it from scratch. We handle dialect variation by collecting data from multiple regions across Lebanon: Beqaa, South Lebanon, and Beirut.",
  },
  {
    question: "Is this real-time translation or batch processing?",
    answer:
      "Real-time. Our computer vision pipeline processes video frames as they come in, with sub-100ms latency. You sign, it translates — instantly.",
  },
  {
    question: "How accurate is it?",
    answer:
      "98% accuracy in our internal evaluations. We were surprised too. In controlled conditions with good lighting and clear signing, we've yet to encounter accuracy issues. Real-world performance may vary with lighting, camera quality, and signing speed.",
  },
  {
    question: "How are you collecting and labeling sign data?",
    answer:
      "In-house collection through events, community collaboration, and partnerships with deaf organizations. We record volunteers signing, extract landmark features using MediaPipe, and label everything manually. The deaf community helps us learn proper form and validates our labels. Want to help? Get in touch.",
  },
  {
    question: "What model architecture are you using?",
    answer:
      "Currently an LSTM (Long Short-Term Memory) network for sequence recognition. Our technical lead Rami is deep in research mode with Layth, exploring more scalable architectures like Transformers for the next iteration.",
  },
  {
    question: "Who is this for?",
    answer:
      "Everyone. If you're deaf, OmniSign helps you communicate. If you want to speak with a deaf person, it bridges that gap. Our next focus is clinical vocabulary — helping doctors and healthcare workers communicate with deaf patients where miscommunication carries the highest cost.",
  },
];

// ── Timeline ────────────────────────────────
export const timelineItems: TimelineItem[] = [
  {
    date: "Early 2025",
    title: "Started as FYP",
    description:
      "OmniSign began as a Final Year Project at Rafik Hariri University. Six students chose to find their own challenge instead of picking from faculty-approved projects.",
    status: "completed",
  },
  {
    date: "Mid 2025",
    title: "50,000 signs collected",
    description:
      "Data collection campaigns across Lebanon. Partnerships with Aaramoun Orphanage, Sin El Fil Church, and SignWithNaila. 80,000+ processed samples after augmentation.",
    status: "completed",
  },
  {
    date: "Late 2025",
    title: "98% accuracy achieved",
    description:
      "LSTM model trained on full Arabic alphabet plus 30+ daily expressions. Internal evaluation shows 98% accuracy in controlled conditions.",
    status: "completed",
  },
  {
    date: "Now",
    title: "Weekly development",
    description:
      "Fresh graduates with jobs, putting in weekly one-hour meetings plus coding sessions. Self-funded, community-supported, still building.",
    status: "current",
  },
  {
    date: "Next",
    title: "Clinical vocabulary",
    description:
      "Medical and clinical phrases — the most requested addition from the deaf community. Where miscommunication carries the highest cost.",
    status: "upcoming",
  },
  {
    date: "Future",
    title: "Scalable architecture",
    description:
      "Researching Transformer-based models for better real-world performance and easier scaling to new sign languages.",
    status: "upcoming",
  },
];

// ── CTA Cards ───────────────────────────────
export const ctaCards: CTACard[] = [
  {
    icon: "hand",
    title: "Contribute Signs",
    description:
      "Help us grow the dataset. We'll set you up with our data collector app — completely free. Record signs from your community.",
    action: "Get the app",
    email: "laythayache5@gmail.com",
    subject: "OmniSign - I want to contribute sign data",
  },
  {
    icon: "heart",
    title: "Fund the Mission",
    description:
      "We're self-funded and not doing this for profit. Donations go directly to events, data collection, and development.",
    action: "Support us",
    email: "laythayache5@gmail.com",
    subject: "OmniSign - I want to support/donate",
  },
  {
    icon: "users",
    title: "Connect Your Community",
    description:
      "Know a deaf community, school, or organization in Lebanon? Connect us. We need as much help as we can get.",
    action: "Make an intro",
    email: "laythayache5@gmail.com",
    subject: "OmniSign - Community connection",
  },
];
