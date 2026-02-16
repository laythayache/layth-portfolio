import type { Project, ProjectFilters } from "./types";

export const projects: Project[] = [
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
