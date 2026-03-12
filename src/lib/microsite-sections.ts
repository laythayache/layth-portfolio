import type { Project } from "@/content/types";
import type { TocItem } from "@/components/microsite/TableOfContents";

interface SectionDef {
  id: string;
  label: string;
  test: (p: Project) => boolean;
}

const SECTION_DEFS: SectionDef[] = [
  { id: "problem", label: "Problem", test: (p) => !!p.sections.problem },
  { id: "context", label: "Context", test: (p) => !!p.sections.systemReality },
  { id: "approach", label: "Approach", test: (p) => !!p.sections.intervention },
  { id: "architecture", label: "Architecture", test: (p) => !!p.sections.architecture },
  { id: "decisions", label: "Decisions", test: (p) => !!p.sections.tradeoffs },
  { id: "results", label: "Results", test: (p) => !!(p.sections.worked || p.sections.didnt) },
  { id: "reliability", label: "Reliability", test: (p) => !!p.sections.reliability },
  { id: "challenges", label: "Challenges", test: (p) => !!p.sections.challenges },
  { id: "open-questions", label: "Open Questions", test: (p) => !!p.sections.unsolved },
  { id: "contact", label: "Get in Touch", test: () => true },
];

export function buildTocItems(project: Project): TocItem[] {
  return SECTION_DEFS.filter((def) => def.test(project)).map((def) => ({
    id: def.id,
    label: def.label,
  }));
}
