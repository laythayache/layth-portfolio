export type ProjectStatus = "completed" | "ongoing" | "paused" | "idea";

export type ProjectKind =
  | "mapping"
  | "intervention"
  | "analysis"
  | "infrastructure";

export type UIMode = "bureaucratic" | "fragmented" | "conversational" | "lab";

export interface ProjectLinks {
  demo?: string;
  repo?: string;
  video?: string;
}

export interface ProjectSections {
  problem: string;
  systemReality: string;
  intervention: string;
  worked: string;
  didnt: string;
  unsolved: string;
  challenges: string;
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
  links?: ProjectLinks;
  challenge_url?: string;
  friend_project?: boolean;
  sections: ProjectSections;
}

export interface ProjectFilters {
  status?: ProjectStatus;
  kind?: ProjectKind;
  system?: string;
  friendOnly?: boolean;
  search?: string;
}
