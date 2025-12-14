export type PillarId = "perception" | "execution" | "representation" | "coordination" | "failure";
export type OrbType = "core" | "shards" | "swarm" | "singularity";

export interface PillarPersonality {
  driftSpeed: number;
  driftAmp: number;
  rotationSpeed: number;
  hoverGlow: number;
  mass: number;
}

export interface PillarDefinition {
  id: PillarId;
  label: string;
  primaryName: string; // Phoenician deity name
  subtitle: string; // Modern pillar function (same as label)
  primaryColor: string;
  accentColor: string;
  position: [number, number, number];
  personality: PillarPersonality;
  type: OrbType;
  description: string;
}

export const PILLARS: PillarDefinition[] = [
  {
    id: "perception",
    label: "PERCEPTION",
    primaryName: "EL",
    subtitle: "PERCEPTION",
    primaryColor: "#35FFB8",
    accentColor: "#C8FFF0",
    position: [0, 1.5, 1], // Closer to camera, above origin
    personality: {
      driftSpeed: 0.2,
      driftAmp: 0.25, // Reduced amplitude
      rotationSpeed: 0.35,
      hoverGlow: 1.5,
      mass: 1.0,
    },
    type: "core",
    description: "Signal precedes truth",
  },
  {
    id: "execution",
    label: "EXECUTION",
    primaryName: "BAʿAL",
    subtitle: "EXECUTION",
    primaryColor: "#FFB020",
    accentColor: "#FFE1A6",
    position: [0, -1.5, 1], // Closer to camera, below origin
    personality: {
      driftSpeed: 0.25,
      driftAmp: 0.2, // Reduced amplitude
      rotationSpeed: 0.4,
      hoverGlow: 1.4,
      mass: 1.2,
    },
    type: "core",
    description: "Action defines reality",
  },
  {
    id: "representation",
    label: "REPRESENTATION",
    primaryName: "KOTHAR",
    subtitle: "REPRESENTATION",
    primaryColor: "#7A5CFF",
    accentColor: "#D6CCFF",
    position: [-3, 0, -1], // Wider left, deeper
    personality: {
      driftSpeed: 0.18,
      driftAmp: 0.3, // Reduced amplitude
      rotationSpeed: 0.28,
      hoverGlow: 1.6,
      mass: 0.8,
    },
    type: "shards",
    description: "Structure precedes meaning",
  },
  {
    id: "coordination",
    label: "COORDINATION",
    primaryName: "YAM",
    subtitle: "COORDINATION",
    primaryColor: "#2DA8FF",
    accentColor: "#A9DBFF",
    position: [3, 0, -1], // Wider right, deeper
    personality: {
      driftSpeed: 0.22,
      driftAmp: 0.22, // Reduced amplitude
      rotationSpeed: 0.5,
      hoverGlow: 1.3,
      mass: 0.9,
    },
    type: "swarm",
    description: "Order emerges from chaos",
  },
  {
    id: "failure",
    label: "FAILURE",
    primaryName: "MOT",
    subtitle: "FAILURE",
    primaryColor: "#FF2D2D",
    accentColor: "#FF7A7A",
    position: [0, 0, -3], // Furthest back, center-aligned
    personality: {
      driftSpeed: 0.15,
      driftAmp: 0.12, // Minimal drift
      rotationSpeed: 0.2,
      hoverGlow: 1.8,
      mass: 1.5,
    },
    type: "singularity",
    description: "Entropy is inevitable",
  },
];

// Helper function to get pillar naming (single source of truth)
export function getPillarNaming(pillarId: PillarId): { primaryName: string; subtitle: string; asciiPrimaryName?: string } {
  const pillar = PILLARS.find((p) => p.id === pillarId);
  if (!pillar) {
    // Fallback (should never happen)
    return { primaryName: "UNKNOWN", subtitle: "UNKNOWN" };
  }
  // ASCII-safe fallback for BAʿAL (if Unicode causes issues)
  const asciiFallback = pillar.id === "execution" ? "BAAL" : undefined;
  return {
    primaryName: pillar.primaryName,
    subtitle: pillar.subtitle,
    asciiPrimaryName: asciiFallback,
  };
}
