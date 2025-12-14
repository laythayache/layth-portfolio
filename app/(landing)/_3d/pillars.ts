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
    primaryColor: "#35FFB8",
    accentColor: "#C8FFF0",
    position: [0, 2, 0],
    personality: {
      driftSpeed: 0.3,
      driftAmp: 0.4,
      rotationSpeed: 0.5,
      hoverGlow: 1.5,
      mass: 1.0,
    },
    type: "core",
    description: "signal intake • anomaly detection",
  },
  {
    id: "execution",
    label: "EXECUTION",
    primaryColor: "#FFB020",
    accentColor: "#FFE1A6",
    position: [0, -2, 0],
    personality: {
      driftSpeed: 0.4,
      driftAmp: 0.3,
      rotationSpeed: 0.6,
      hoverGlow: 1.4,
      mass: 1.2,
    },
    type: "core",
    description: "action pipeline • task completion",
  },
  {
    id: "representation",
    label: "REPRESENTATION",
    primaryColor: "#7A5CFF",
    accentColor: "#D6CCFF",
    position: [-2.5, 0, 0],
    personality: {
      driftSpeed: 0.25,
      driftAmp: 0.5,
      rotationSpeed: 0.4,
      hoverGlow: 1.6,
      mass: 0.8,
    },
    type: "shards",
    description: "data structures • knowledge graphs",
  },
  {
    id: "coordination",
    label: "COORDINATION",
    primaryColor: "#2DA8FF",
    accentColor: "#A9DBFF",
    position: [2.5, 0, 0],
    personality: {
      driftSpeed: 0.35,
      driftAmp: 0.35,
      rotationSpeed: 0.7,
      hoverGlow: 1.3,
      mass: 0.9,
    },
    type: "swarm",
    description: "system sync • resource allocation",
  },
  {
    id: "failure",
    label: "FAILURE",
    primaryColor: "#FF2D2D",
    accentColor: "#FF7A7A",
    position: [0, 0, -2],
    personality: {
      driftSpeed: 0.2,
      driftAmp: 0.2,
      rotationSpeed: 0.3,
      hoverGlow: 1.8,
      mass: 1.5,
    },
    type: "singularity",
    description: "error tracking • resilience patterns",
  },
];
