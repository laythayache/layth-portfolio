export type ProjectStatus = "completed" | "ongoing" | "paused" | "idea";

export type ProjectKind =
  | "mapping"
  | "intervention"
  | "analysis"
  | "infrastructure"
  | "automation"
  | "pipeline"
  | "web"
  | "embedded-hardware"
  | "cloud";

export type UIMode = "bureaucratic" | "fragmented" | "conversational" | "lab";

export type CardVariant =
  | "featured"
  | "standard"
  | "minimal"
  | "highlight"
  | "conceptual";

export type CardAccent =
  | "teal"
  | "amber"
  | "emerald"
  | "sky"
  | "blue"
  | "violet"
  | "stone";

export interface CardConfig {
  accent: CardAccent;
  size: "sm" | "md" | "lg";
  variant: CardVariant;
  highlight?: string;
  tagline?: string;
}

export interface ProjectLinks {
  demo?: string;
  repo?: string;
  video?: string;
}

export interface ProjectDecision {
  id: string;
  title: string;
  chose: string;
  rejected?: string;
  why: string;
}

export interface ProjectSections {
  problem: string;
  systemReality: string;
  intervention: string;
  architecture?: string;
  tradeoffs: string;
  worked: string;
  didnt: string;
  unsolved: string;
  challenges: string;
  reliability?: string;
  /**
   * Optional structured decision log. When populated, renders as a
   * branded DecisionLog component instead of (or alongside) the
   * freeform `tradeoffs` prose.
   */
  decisions?: ProjectDecision[];
}

export interface Project {
  slug: string;
  title: string;
  status: ProjectStatus;
  kind: ProjectKind;
  system: string;
  ui_mode: UIMode;
  updated_at: string;
  summary: string;
  outcome?: string;
  role?: string;
  stack?: string;
  timeframe?: string;
  architectureDiagram?: string;
  links?: ProjectLinks;
  challenge_url?: string;
  friend_project?: boolean;
  tags?: string[];
  thumbnail?: string;
  featured?: boolean;
  sections: ProjectSections;
  card?: CardConfig;
  demoVideoUrl?: string;
}

export interface ProjectFilters {
  status?: ProjectStatus;
  kind?: ProjectKind;
  system?: string;
  friendOnly?: boolean;
  search?: string;
}
