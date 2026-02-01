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
  {
    slug: "public-budget-tracker",
    title: "Public Budget Tracker",
    status: "ongoing",
    kind: "mapping",
    system: "public-finance",
    ui_mode: "bureaucratic",
    updated_at: "2025-06-01",
    summary:
      "Mapping Lebanese municipal budget allocations against actual expenditure. Making public data legible.",
    links: {
      repo: "https://github.com/laythayache/budget-tracker",
    },
    friend_project: false,
    sections: {
      problem:
        "Municipal budgets in Lebanon are technically public but practically inaccessible. PDF-only, inconsistent formats, no historical comparison tools.",
      systemReality:
        "Data is scattered across municipal websites, some only in Arabic, some only as scanned documents. No API. No standard schema.",
      intervention:
        "Building a scraper + normalizer pipeline that extracts budget line items into a structured database. Frontend renders comparisons across years and municipalities.",
      worked:
        "Proof of concept covers 3 municipalities with 2 years of data. Normalization pipeline handles 80% of format variations.",
      didnt:
        "Scanned PDFs require OCR which introduces errors. Some municipalities have no digital records at all.",
      unsolved:
        "Scaling beyond proof of concept. Getting municipal cooperation. Handling Arabic OCR accurately.",
      challenges:
        "Is this the right approach to fiscal transparency? Should this be a tool for journalists, citizens, or municipal employees? Challenge the framing.",
    },
  },
  {
    slug: "grid-resilience-sim",
    title: "Grid Resilience Simulator",
    status: "paused",
    kind: "analysis",
    system: "energy",
    ui_mode: "lab",
    updated_at: "2025-01-20",
    summary:
      "Agent-based simulation of power grid failure cascades under different infrastructure investment scenarios.",
    friend_project: false,
    sections: {
      problem:
        "Lebanon's power grid fails unpredictably. Citizens and planners have no model to evaluate which infrastructure investments would reduce outage frequency.",
      systemReality:
        "Grid topology data is incomplete. Generator capacity varies by neighborhood. Political allocation of electricity complicates any purely technical model.",
      intervention:
        "Agent-based simulation where each node represents a transformer/generator with stochastic failure rates. Runs investment scenarios to compare outcomes.",
      worked:
        "Core simulation engine runs. Baseline failure patterns match anecdotal reports from 2 neighborhoods tested.",
      didnt:
        "Without real grid topology data, the model is speculative. Political allocation cannot be modeled technically.",
      unsolved:
        "Getting real infrastructure data. Modeling political decision-making. Validating against actual outage records.",
      challenges:
        "Is simulation the right tool here, or is this a data collection problem first? Challenge the methodology.",
    },
  },
  {
    slug: "supply-chain-mapper",
    title: "Supply Chain Mapper",
    status: "idea",
    kind: "infrastructure",
    system: "logistics",
    ui_mode: "fragmented",
    updated_at: "2025-08-10",
    summary:
      "Concept: map informal supply chains in Beirut to identify single points of failure before they break.",
    friend_project: false,
    sections: {
      problem:
        "Informal supply chains in Lebanon are invisible until they break. No one maps the dependencies between wholesalers, distributors, and retail.",
      systemReality:
        "Most transactions are cash-based and unrecorded. Trust networks replace contracts. Data collection would require field interviews.",
      intervention:
        "Proposed approach: structured interviews with key actors, mapped into a dependency graph. Identify critical nodes whose failure cascades.",
      worked: "Concept stage only. No implementation yet.",
      didnt: "Nothing has been tested.",
      unsolved:
        "Everything. This is an idea looking for collaborators and a viable data collection method.",
      challenges:
        "Is this even possible without violating trust? Is the graph model appropriate? Should this be a research project or a tool? I want to hear your take.",
    },
  },
  {
    slug: "clinic-queue-system",
    title: "Clinic Queue System",
    status: "completed",
    kind: "infrastructure",
    system: "healthcare",
    ui_mode: "bureaucratic",
    updated_at: "2024-09-05",
    summary:
      "Digital queue management for a walk-in clinic. Replaced a paper ledger with a tablet-based system.",
    links: {
      demo: "https://clinic-queue-demo.pages.dev",
    },
    friend_project: true,
    sections: {
      problem:
        "A community clinic in Beirut used a paper sign-in sheet. Patients had no visibility into wait times. Staff spent time managing the queue instead of patients.",
      systemReality:
        "Clinic has intermittent internet. Staff are not technical. Budget is zero. System must work offline and be dead simple.",
      intervention:
        "PWA that runs on a single tablet. Patients tap to join queue, staff tap to advance. Local-first storage with optional sync when online.",
      worked:
        "Adopted by clinic staff within one week. Wait time visibility reduced patient complaints. Offline-first architecture means no dependency on internet.",
      didnt:
        "No integration with medical records (out of scope). SMS notifications were planned but not implemented.",
      unsolved:
        "Multi-clinic coordination. Analytics for clinic management. Integration with appointment scheduling.",
      challenges:
        "Built with a friend who works at the clinic. Open to feedback on the offline-first architecture choices and the UX for non-technical users.",
    },
  },
  {
    slug: "water-quality-dashboard",
    title: "Water Quality Dashboard",
    status: "ongoing",
    kind: "mapping",
    system: "environment",
    ui_mode: "fragmented",
    updated_at: "2025-11-01",
    summary:
      "Aggregating scattered water quality test results into a single public dashboard for coastal Lebanon.",
    links: {
      repo: "https://github.com/laythayache/water-quality",
    },
    friend_project: true,
    sections: {
      problem:
        "Water quality data for Lebanon's coast exists but is fragmented across NGO reports, university studies, and government releases. No unified view.",
      systemReality:
        "Data formats vary wildly. Some is PDF, some is Excel, some is behind academic paywalls. Temporal coverage is inconsistent.",
      intervention:
        "Scraping and normalizing publicly available datasets into a time-series database. Frontend shows trends by location and parameter.",
      worked:
        "Dashboard covers 12 coastal locations with coliform and heavy metal readings from 3 data sources over 5 years.",
      didnt:
        "Real-time monitoring is not feasible without sensors. Historical data has gaps that are hard to interpolate responsibly.",
      unsolved:
        "Data quality validation. Getting government cooperation for official data. Communicating uncertainty to non-technical users.",
      challenges:
        "Collaborative project. Feedback welcome on data normalization methodology and how to communicate measurement uncertainty honestly.",
    },
  },
  {
    slug: "neighborhood-noise-map",
    title: "Neighborhood Noise Map",
    status: "idea",
    kind: "analysis",
    system: "urban",
    ui_mode: "conversational",
    updated_at: "2025-12-01",
    summary:
      "Concept: crowdsourced noise level mapping for Beirut neighborhoods using phone microphones.",
    friend_project: false,
    sections: {
      problem:
        "Noise pollution in Beirut is severe but unmeasured. No public data exists on which areas exceed safe levels or when.",
      systemReality:
        "Phone microphones are inaccurate for absolute dB measurement. Crowdsourced data has selection bias. Privacy concerns with audio recording.",
      intervention:
        "Proposed: app that records ambient dB level (not audio) at regular intervals with location. Aggregate into heat maps over time.",
      worked: "Concept only. Prototype app records dB levels accurately on iOS.",
      didnt: "No crowdsourcing tested. No validation against professional equipment.",
      unsolved:
        "Calibration across devices. Privacy framework. Getting enough participants for statistical validity.",
      challenges:
        "Is phone-based measurement accurate enough to be useful? What's the minimum viable sample size? Help me think through this.",
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
