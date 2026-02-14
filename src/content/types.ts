export type ProjectStatus = "completed" | "ongoing" | "paused" | "idea";

export type ProjectKind =
  | "mapping"
  | "intervention"
  | "analysis"
  | "infrastructure";

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
  sections: ProjectSections;
  card?: CardConfig;
}

export interface ProjectFilters {
  status?: ProjectStatus;
  kind?: ProjectKind;
  system?: string;
  friendOnly?: boolean;
  search?: string;
}
