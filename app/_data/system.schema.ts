export type SystemStatus = "operational" | "degraded" | "failed" | "maintenance";

export type PillarType = "perception" | "representation" | "coordination" | "execution" | "failure";

export interface SystemPillar {
  id: PillarType;
  label: string;
  status: SystemStatus;
  position: {
    x: number;
    y: number;
  };
  substructure: Subsystem[];
  failures?: FailureAnnotation[];
}

export interface Subsystem {
  id: string;
  label: string;
  status: SystemStatus;
  evidence: Evidence[];
}

export interface Artifact {
  type: "code" | "paper" | "demo" | "documentation" | "data" | "other";
  url: string;
  label?: string;
}

export interface Evidence {
  id: string;
  type: "project" | "achievement" | "research" | "leadership" | "other";
  claim: string;
  constraints: string[];
  tradeoffs: string[];
  failureLink?: string; // ID of related failure
  artifacts: Artifact[];
}

export interface FailureAnnotation {
  id: string;
  severity: "minor" | "moderate" | "critical";
  description: string;
  affected: string[];
  timestamp?: string;
}

export interface SystemState {
  name: string;
  status: SystemStatus;
  activePillar: PillarType | null;
  pillars: SystemPillar[];
}

