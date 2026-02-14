import type { Project, ProjectFilters } from "./types";

export const projects: Project[] = [
  {
    slug: "omnisign",
    title: "OmniSign",
    // kind: "intervention" — building a tool to intervene in the accessibility gap
    status: "ongoing",
    kind: "intervention",
    system: "accessibility",
    ui_mode: "lab",
    updated_at: "2026-02-01",
    summary:
      "AI-powered sign language translation for Lebanese Sign Language. Computer vision meets an underserved language where data barely exists.",
    links: {
      repo: "https://github.com/laythayache/omnisign",
    },
    challenge_url: "/submit?project=omnisign",
    friend_project: false,
    card: {
      accent: "teal",
      size: "lg",
      variant: "featured",
      tagline: "AI + Sign Language",
      highlight: "~89% accuracy · First-ever LSL dataset · Team of 6",
    },
    sections: {
      problem:
        "Lebanese Sign Language has no digital infrastructure. No standard dataset, no translation system, no unified reference. Deaf communities in Lebanon navigate daily life through a language invisible to technology.",
      systemReality:
        "LSL is not standardized across regions. No public datasets existed. Arabic Sign Language serves as the closest reference. Privacy constraints require on-device processing. Real-time translation demands sub-100ms latency.",
      intervention:
        "Built a CV pipeline: video capture, hand/pose landmark extraction via MediaPipe, classification model, mobile deployment. Federated learning keeps sign data on-device. Multi-modal output: text and speech simultaneously.",
      worked:
        "First-ever functional LSL dataset built. Alphabet-level recognition at ~89% accuracy. Real-time on-device inference. Privacy-first federated architecture operational. Team of 6 across CV, web, mobile, and linguistics.",
      didnt:
        "Word/sentence-level translation unsolved. Dataset too small for generalization. Regional LSL variation unaddressed. The 98% accuracy claim applies to controlled evaluation only — real-world performance is lower.",
      unsolved:
        "Scaling LSL data collection ethically. Community contribution pipeline. Handling dialectal variation. Moving from gesture recognition to conversational translation. Funding sustainability.",
      challenges:
        "Open to critique on dataset methodology, model architecture, federated learning necessity, and whether translation tech is the right intervention vs. LSL education investment.",
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
