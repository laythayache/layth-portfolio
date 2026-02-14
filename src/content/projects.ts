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
      worked:
        "System in active development. Change detection architecture operational. Normalization pipeline processing multiple source formats. Versioned storage with diff capabilities. Monitoring infrastructure tracking pipeline health.",
      didnt:
        "Scale vs. cost trade-offs still being evaluated. Handling dynamic paywalled content remains unsolved. Ethical boundaries of public data collection require ongoing assessment. API rate limiting and abuse prevention strategies under development.",
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
      worked:
        "First functional LSL dataset created. Alphabet-level recognition at 89% accuracy in controlled evaluation. Real-time inference <100ms on mid-range mobile devices. Federated learning operational across distributed nodes. Cross-platform coordination across 6 contributors (CV, web, mobile, linguistics).",
      didnt:
        "Word/sentence-level translation unsolved. Dataset too small for generalization beyond alphabet. Regional LSL variation unaddressed. Real-world performance significantly lower than controlled evaluation accuracy.",
      unsolved:
        "Scaling data collection ethically while maintaining federated privacy. Community contribution pipeline for dataset expansion. Handling dialectal variation across LSL regions. Transition from gesture recognition to conversational translation. Funding sustainability for ongoing development.",
      challenges:
        "Open to critique on: dataset collection methodology, federated learning necessity vs. complexity cost, model architecture decisions, whether translation technology is the right intervention vs. LSL education investment, and whether centralized infrastructure could serve this better.",
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
