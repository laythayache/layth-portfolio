import type { Project, ProjectFilters } from "./types";

export const projects: Project[] = [
  {
    slug: "public-information-infrastructure",
    title: "Public Information Infrastructure",
    status: "ongoing",
    kind: "infrastructure",
    system: "public data",
    ui_mode: "bureaucratic",
    updated_at: "2026-02-14",
    summary:
      "Production-grade infrastructure for collecting, normalizing, and serving public media data. Tracks changes, ensures provenance, provides structured API access to information that matters.",
    outcome:
      "Infrastructure for tracking media edits, content changes, and source accountability at scale",
    role: "Technical Architect & Lead Engineer",
    stack: "TypeScript, Node.js, PostgreSQL, Redis, Docker, Python",
    timeframe: "2023 - Present",
    architectureDiagram: "/diagrams/pub-info-architecture.svg",
    card: {
      accent: "blue",
      size: "lg",
      variant: "featured",
      tagline: "Infrastructure that others rely on",
      highlight: "Change detection · Versioned data · Production APIs",
    },
    sections: {
      problem:
        "Public information (media announcements, policy changes, official statements) is scattered, ephemeral, and unstructured. No unified system tracks what was published, when it changed, or what the source actually said. Researchers, journalists, and citizens rely on manual archive.org snapshots or institutional memory.",
      systemReality:
        "Media outlets use dynamic CMS systems. Content changes without version history exposed. No standard schema for information structure. Rate limiting and anti-scraping measures protect servers. Ethical boundaries around web scraping. Storage costs scale with retention requirements. Quality vs. cost trade-offs for long-term archives.",
      intervention:
        "Building infrastructure from the ground up: distributed scraping framework with change detection, normalization layer that transforms heterogeneous sources into unified schema, versioned storage with diff tracking, RESTful API layer with query capabilities, monitoring and alerting for pipeline health.",
      architecture:
        "Distributed scraping framework with rate limiting and retry logic. Normalization pipeline transforming heterogeneous sources into unified schema. Versioned PostgreSQL storage with diff-tracking for change detection. Redis cache for query performance. RESTful API layer with query DSL. Prometheus + Grafana monitoring stack.",
      tradeoffs: `**Centralized vs Federated:** Chose centralized architecture for consistency and query performance. Federated model would improve regional resilience but complicate change detection synchronization.

**Scraping frequency vs cost:** 15-minute intervals balance freshness with infrastructure costs. Real-time would require 10x budget for marginal value.

**Schema flexibility vs performance:** Strict schema enforces data quality but limits source diversity. Chose quality over breadth—better to track 50 sources reliably than 500 inconsistently.`,
      worked:
        "System in active development. Change detection architecture operational. Normalization pipeline processing multiple source formats. Versioned storage with diff capabilities. Monitoring infrastructure tracking pipeline health.",
      didnt:
        "Scale vs. cost trade-offs still being evaluated. Handling dynamic paywalled content remains unsolved. Ethical boundaries of public data collection require ongoing assessment. API rate limiting and abuse prevention strategies under development.",
      reliability:
        "Automated scraping with retry logic and error handling. Change detection diffs stored for auditability. Pipeline monitoring with alerting for failures. Rate limiting respect to avoid blocking. Data validation at ingestion. Graceful degradation when sources become unavailable.",
      unsolved:
        "Optimal storage architecture for long-term retention. Ethical framework for scraping decisions. Federated vs. centralized data model. Schema normalization across vastly different source types. Sustainable funding model. Community contribution mechanisms.",
      challenges:
        "Open to critique on: web scraping ethics, data retention policies, schema design decisions, API design choices, whether centralized infrastructure is the right model vs. federated approaches, and the trade-offs between completeness and resource constraints.",
    },
  },
  {
    slug: "omnisign",
    title: "OmniSign",
    status: "ongoing",
    kind: "infrastructure",
    system: "accessibility",
    ui_mode: "lab",
    updated_at: "2026-02-01",
    summary:
      "Production sign language translation system for Lebanese Sign Language. Real-time on-device CV pipeline with federated learning architecture for privacy preservation.",
    outcome:
      "Privacy-first sign language translation: 89% alphabet accuracy, <100ms latency, federated learning operational across distributed nodes",
    role: "Federated Learning Architect (team of 6)",
    stack: "TensorFlow, MediaPipe, React Native, Python, WebRTC",
    timeframe: "2024 - 2025",
    architectureDiagram: "/diagrams/omnisign-architecture.svg",
    links: {
      repo: "https://github.com/laythayache/omnisign",
    },
    challenge_url: "/contact?project=omnisign",
    friend_project: false,
    card: {
      accent: "teal",
      size: "lg",
      variant: "featured",
      tagline: "Privacy-first translation infrastructure",
      highlight: "89% alphabet accuracy · On-device inference · Federated learning",
    },
    sections: {
      problem:
        "Lebanese Sign Language has no digital infrastructure. No standard dataset, no translation system, no unified reference. Deaf communities in Lebanon navigate daily life through a language invisible to technology.",
      systemReality:
        "LSL is not standardized across regions. No public datasets existed. Arabic Sign Language serves as the closest reference. Privacy constraints require on-device processing. Real-time translation demands sub-100ms latency for usable interaction.",
      intervention:
        "Multi-stage CV pipeline architecture: video capture → MediaPipe landmark extraction → classification model → multi-modal output (text + speech). Federated learning framework keeps sign data on-device, eliminating privacy risks of centralized collection. Mobile deployment via React Native + TensorFlow Lite.",
      architecture:
        "MediaPipe Pose for hand/body landmark extraction. TensorFlow Lite classification models running on-device. Federated learning coordinator managing model updates across contributors without centralizing sign data. React Native cross-platform SDK. WebRTC signaling for real-time video capture. Multi-modal output: text transcription + synthetic speech.",
      tradeoffs: `**Federated vs Centralized Learning:** Chose federated to preserve privacy, but increased complexity 3x. Centralized would reach production faster but violates core privacy principle and creates institutional dependency.

**Alphabet vs Full Translation:** Started with alphabet recognition (smaller scope, faster validation). Full sentence translation requires 100x more data and grammatical modeling—premature at this stage.

**On-device vs Cloud Inference:** On-device keeps data private and works offline, but constrains model size to <50MB. Cloud inference would enable larger models (500MB+) and better accuracy but creates privacy risk and requires connectivity.`,
      worked:
        "First functional LSL dataset created (initial 800 signs). Alphabet-level recognition at 89% accuracy in controlled evaluation. Real-time inference <100ms on mid-range mobile devices (Snapdragon 750G). Federated learning operational across 6 distributed contributors. Cross-platform SDK functional on iOS and Android. Multi-modal output (text + speech synthesis) working.",
      didnt:
        "Word/sentence-level translation unsolved. Dataset too small for generalization beyond alphabet (89% accuracy only in controlled studio conditions). Regional LSL variation unaddressed (Northern vs Southern dialect differences). Real-world performance degradation in natural lighting and hand-occlusion scenarios. Grammar modeling not attempted.",
      reliability:
        "On-device processing prevents data leakage. Federated model updates validated before deployment. Graceful fallback to manual input if inference fails. Real-time latency monitoring per-device. Dataset versioning tracks contribution provenance. Error logs sanitized to exclude sign imagery.",
      unsolved:
        "Scaling data collection ethically while maintaining federated privacy (incentivizing contributor participation without personal tracking). Community contribution pipeline for dataset expansion (governance, approval workflows, attribution). Handling dialectal variation across LSL regions (Northern/Southern/Bekaa differences). Transition from gesture recognition to conversational translation (requires grammar + semantic models). Sustainable funding model beyond initial development.",
      challenges:
        "Open to critique on: dataset collection methodology (consent and privacy at scale), federated learning necessity vs complexity cost (could simpler approaches work?), model architecture decisions (why MediaPipe over custom pose estimation?), whether translation technology is the right intervention vs LSL education investment in schools, whether centralized infrastructure could serve this better than federated model, and the trade-offs between respecting regional variation and building unified standard.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function filterProjects(filters: ProjectFilters): Project[] {
  return projects.filter((p) => {
    if (filters.status && p.status !== filters.status) return false;
    if (filters.kind && p.kind !== filters.kind) return false;
    if (filters.system && p.system !== filters.system) return false;
    if (filters.friendOnly && !p.friend_project) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack = `${p.title} ${p.summary} ${p.system}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function listSystems(): { system: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of projects) {
    map.set(p.system, (map.get(p.system) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([system, count]) => ({ system, count }))
    .sort((a, b) => b.count - a.count);
}
