export type ProjectConfig = {
    slug: string;
    title: string;
    description: string;
    status: "completed" | "ongoing";
    year: string;
    background: string;
    foreground: string;
    accent?: string;
    font?: string;
  };
  
  export const projects: ProjectConfig[] = [
    {
      slug: "omnisign",
      title: "Omnisign",
      description: "AI-powered sign language translation system focused on Lebanese Sign Language (LSL). A research-oriented project combining computer vision, NLP, and mobile development to address an underserved language in accessibility technology. Unfinished but meaningful—exploring the intersection of engineering and social impact where data scarcity meets real-world complexity.",
      status: "completed",
      year: "2024",
      background: "210 40% 96%",
      foreground: "220 35% 18%",
      accent: "190 95% 45%",
    },
    {
      slug: "project-beta",
      title: "Project Beta",
      description: "Building infrastructure for distributed thinking.",
      status: "ongoing",
      year: "2025",
      background: "36 23% 90%",
      foreground: "220 10% 18%",
      accent: "200 80% 50%",
    },
    {
      slug: "project-gamma",
      title: "Project Gamma",
      description: "Temporal interfaces and memory architecture.",
      status: "completed",
      year: "2023",
      background: "0 0% 8%",
      foreground: "0 0% 95%",
      accent: "350 80% 60%",
    },
  ];
  
  export const getProjectBySlug = (slug: string): ProjectConfig | undefined => {
    return projects.find((p) => p.slug === slug);
  };
  
  export const getCompletedProjects = (): ProjectConfig[] => {
    return projects.filter((p) => p.status === "completed");
  };
  
  export const getOngoingProjects = (): ProjectConfig[] => {
    return projects.filter((p) => p.status === "ongoing");
  };
  