import { useEffect } from "react";
import type { ProjectConfig } from "@/lib/projectConfig";

const useProjectTheme = (project: ProjectConfig | undefined) => {
  useEffect(() => {
    if (!project) return;

    const root = document.documentElement;
    root.style.setProperty("--background", project.background);
    root.style.setProperty("--foreground", project.foreground);
    if (project.accent) {
      root.style.setProperty("--accent", project.accent);
    }

    return () => {
      root.style.removeProperty("--background");
      root.style.removeProperty("--foreground");
      root.style.removeProperty("--accent");
    };
  }, [project?.slug]);
};

export default useProjectTheme;
