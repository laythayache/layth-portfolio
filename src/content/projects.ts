import type { Project, ProjectFilters } from "./types";

export const projects: Project[] = [
  {
    slug: "omnisign",
    title: "OmniSign",
    status: "ongoing",
    kind: "infrastructure",
    system: "accessibility",
    ui_mode: "lab",
    updated_at: "2026-02-16",
    summary:
      "AI-powered Lebanese Sign Language translation system with privacy-first on-device inference and real-time interaction.",
    outcome:
      "50,000+ signs collected, 80,000+ processed samples, and strong internal recognition performance for daily-use vocabulary.",
    role: "AI and ML Lead (Team of 6)",
    stack: "TensorFlow, MediaPipe, React Native, Python, WebRTC",
    timeframe: "2024 - Present",
    architectureDiagram: "/diagrams/omnisign-architecture.svg",
    links: {
      repo: "https://github.com/laythayache/omnisign",
    },
    challenge_url: "/#contact",
    friend_project: false,
    tags: ["AI", "Accessibility", "Computer Vision"],
    thumbnail: "/omnisign-logo.png",
    featured: true,
    demoVideoUrl:
      "https://pub-f6654749f9534ed48b99cc5f4b614b9b.r2.dev/WhatsApp%20Video%202025-11-29%20at%2012.43.10%20PM.mp4",
    card: {
      accent: "teal",
      size: "lg",
      variant: "featured",
      tagline: "AI translation infrastructure for LSL",
      highlight: "Community-built dataset · Real-time translation · Privacy-first",
    },
    sections: {
      problem:
        "Lebanese Sign Language lacked usable digital infrastructure, limiting communication support in everyday and high-stakes settings.",
      systemReality:
        "No clean public dataset existed, dialects differed across regions, and the solution had to stay useful under constrained hardware and unstable connectivity.",
      intervention:
        "Designed and iterated an end-to-end pipeline from sign capture and dataset curation to model inference and multi-modal output.",
      architecture:
        "MediaPipe landmarks feed TensorFlow sequence models; inference runs on device where possible; outputs are translated to text and speech in real time.",
      tradeoffs:
        "Prioritized practical reliability and privacy over broad feature scope. Focused first on high-utility vocabulary and robust capture quality.",
      worked:
        "Established a real local dataset process, shipped repeatable inference flows, and built strong traction with communities and partners.",
      didnt:
        "Dialect variance and environment variability still impact robustness, and full conversational translation remains a longer research track.",
      reliability:
        "Added strong preprocessing and quality checks for image flows, with defensive fallbacks for low-confidence predictions.",
      unsolved:
        "Need broader vocabulary coverage, stronger real-world generalization, and sustainable long-term funding and partnerships.",
      challenges:
        "How to scale ethically with community trust while preserving quality, privacy, and regional representation.",
    },
  },
  {
    slug: "license-plate-recognition",
    title: "License Plate Recognition System",
    status: "completed",
    kind: "analysis",
    system: "security",
    ui_mode: "lab",
    updated_at: "2025-11-12",
    summary:
      "Real-time license plate detection and OCR pipeline for roadway and parking workflows.",
    outcome:
      "Delivered stable detection + text extraction under varied camera angles with post-processing to improve read quality.",
    role: "Computer Vision Engineer",
    stack: "YOLOv8, OpenCV, OCR, Python",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["AI", "Security", "Computer Vision"],
    featured: true,
    sections: {
      problem:
        "Manual plate logging and low-quality camera feeds caused delays and inconsistent records.",
      systemReality:
        "Low-light frames, motion blur, and variable plate formatting reduced OCR reliability.",
      intervention:
        "Built a two-stage detector + OCR flow with filtering, correction heuristics, and confidence thresholds.",
      architecture:
        "YOLOv8 for vehicle/plate localization followed by OCR extraction and post-processing normalization.",
      tradeoffs:
        "Balanced speed and precision by tuning detection thresholds and introducing fallback retries.",
      worked:
        "Improved operational accuracy for common camera setups and reduced manual correction effort.",
      didnt:
        "Extreme blur and severe occlusion still degrade extraction quality.",
      unsolved:
        "Future improvements include temporal frame aggregation and stronger multilingual OCR adaptation.",
      challenges:
        "How to keep latency low while increasing robustness in unpredictable field conditions.",
    },
  },
  {
    slug: "face-recognition",
    title: "Face Recognition System",
    status: "completed",
    kind: "analysis",
    system: "security",
    ui_mode: "lab",
    updated_at: "2025-08-20",
    summary:
      "Real-time face recognition workflow for identity matching and access scenarios.",
    outcome:
      "Shipped a practical recognition pipeline with controllable thresholds and improved false-positive handling.",
    role: "ML Engineer",
    stack: "OpenCV, Haar Cascades, Eigenfaces, Python",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["AI", "Security", "Computer Vision"],
    featured: true,
    sections: {
      problem:
        "Needed a low-overhead face identification system that could run in constrained environments.",
      systemReality:
        "Lighting changes, camera quality, and expression variance made matching unstable.",
      intervention:
        "Combined face detection, aligned preprocessing, and confidence-based recognition thresholds.",
      architecture:
        "OpenCV detection pipeline with feature extraction and identity scoring for real-time matching.",
      tradeoffs:
        "Chose lightweight methods for speed and compatibility instead of heavier deep models.",
      worked:
        "System performed well in controlled environments and small-to-medium identity sets.",
      didnt:
        "Accuracy dropped in poor lighting and with significant angle variance.",
      unsolved:
        "Future work includes embedding-based models and adaptive thresholding per environment.",
      challenges:
        "Balancing privacy considerations with identity verification requirements.",
    },
  },
  {
    slug: "breast-cancer-detection",
    title: "Breast Cancer Detection Model",
    status: "completed",
    kind: "analysis",
    system: "medical-ai",
    ui_mode: "lab",
    updated_at: "2025-07-18",
    summary:
      "Supervised machine learning classification model for early-stage breast cancer risk detection.",
    outcome:
      "Built a reliable baseline classifier with transparent feature engineering and evaluation strategy.",
    role: "Data Scientist",
    stack: "TensorFlow, Scikit-learn, Python",
    timeframe: "2025",
    challenge_url: "/#contact",
    tags: ["AI", "Medical", "Predictive Modeling"],
    featured: true,
    sections: {
      problem:
        "Clinicians needed interpretable predictive support to prioritize follow-up decisions.",
      systemReality:
        "Medical datasets were imbalanced and required strict preprocessing to avoid misleading results.",
      intervention:
        "Designed a supervised classification pipeline with feature normalization, evaluation guards, and model comparison.",
      architecture:
        "Preprocessing and feature engineering feed into ensemble and neural baselines with metric-focused validation.",
      tradeoffs:
        "Prioritized interpretability and calibration over marginal metric gains from opaque models.",
      worked:
        "Produced stable validation performance and clearer risk stratification than naive baselines.",
      didnt:
        "Generalization depends on dataset diversity and external clinical validation.",
      unsolved:
        "Needs broader multi-center data and explainability-first deployment pathways.",
      challenges:
        "How to operationalize clinical AI safely without overpromising certainty.",
    },
  },
  {
    slug: "home-security-system",
    title: "Home Security Embedded System",
    status: "completed",
    kind: "intervention",
    system: "embedded",
    ui_mode: "lab",
    updated_at: "2025-06-02",
    summary:
      "IoT security system using embedded sensors, Bluetooth presence logic, and app-based controls.",
    outcome:
      "Created a modular prototype with responsive alerts and practical rule-based activation.",
    role: "Embedded Systems Engineer",
    stack: "Arduino, PIR Sensors, Bluetooth, Mobile App",
    timeframe: "2024 - 2025",
    challenge_url: "/#contact",
    tags: ["Embedded", "Security", "IoT"],
    featured: true,
    sections: {
      problem:
        "Required a lightweight home monitoring setup that could respond quickly to intrusion events.",
      systemReality:
        "False positives from ambient motion and occupancy changes were common failure points.",
      intervention:
        "Combined sensor events with Bluetooth device detection to improve arming/disarming logic.",
      architecture:
        "Arduino sensor network triggers event rules and transmits alerts to a companion mobile interface.",
      tradeoffs:
        "Chose deterministic rule logic for reliability before introducing ML-based anomaly detection.",
      worked:
        "Reduced noisy alerts and improved operator trust in event notifications.",
      didnt:
        "Complex multi-occupant scenarios still require more advanced context awareness.",
      unsolved:
        "Potential next step is hybrid edge inference for richer false-alarm filtering.",
      challenges:
        "How to keep the system simple to maintain while increasing intelligence over time.",
    },
  },
  {
    slug: "network-infrastructure",
    title: "Network Security Infrastructure",
    status: "completed",
    kind: "infrastructure",
    system: "networking",
    ui_mode: "lab",
    updated_at: "2025-05-22",
    summary:
      "Enterprise network design with segmented VLAN architecture, hardened perimeter controls, and remote access policies.",
    outcome:
      "Delivered a secure baseline architecture with clearer segmentation and improved maintainability.",
    role: "Network Engineer",
    stack: "Cisco, VLANs, ASA Firewall, VPN, SSH, DHCP",
    timeframe: "2024 - 2025",
    challenge_url: "/#contact",
    tags: ["Infrastructure", "Security", "Networking"],
    featured: true,
    sections: {
      problem:
        "Needed a secure and maintainable network layout across mixed operational zones.",
      systemReality:
        "Legacy flat-network practices increased blast radius and operational risk.",
      intervention:
        "Introduced segmented VLANs, strict ACL patterns, secured remote access, and layered firewall policy.",
      architecture:
        "Core switching with segmented VLANs, edge firewall controls, VPN entry points, and controlled DHCP scopes.",
      tradeoffs:
        "Accepted additional configuration complexity to gain clearer security boundaries and observability.",
      worked:
        "Improved segmentation discipline and reduced cross-zone exposure risk.",
      didnt:
        "Legacy hardware constraints limited some policy automation workflows.",
      unsolved:
        "Future work includes stronger infrastructure-as-code patterns and richer telemetry.",
      challenges:
        "How to evolve security posture without disrupting critical day-to-day operations.",
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
