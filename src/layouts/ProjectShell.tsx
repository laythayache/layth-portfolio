import type { Project, UIMode } from "@/content/types";

interface ProjectShellProps {
  project: Project;
  children: React.ReactNode;
}

function getShellClass(_mode: UIMode): string {
  // Scaffold: same base for now, diverge later per ui_mode
  switch (_mode) {
    case "bureaucratic":
      return "max-w-3xl mx-auto font-sans";
    case "fragmented":
      return "max-w-3xl mx-auto font-sans";
    case "conversational":
      return "max-w-3xl mx-auto font-sans";
    case "lab":
      return "max-w-3xl mx-auto font-mono";
    default:
      return "max-w-3xl mx-auto font-sans";
  }
}

export default function ProjectShell({ project, children }: ProjectShellProps) {
  return (
    <div className={getShellClass(project.ui_mode)}>
      {children}
    </div>
  );
}
