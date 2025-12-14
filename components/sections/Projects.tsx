import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="End-to-end ML systems and product builds"
      className="bg-gray-50 dark:bg-gray-900"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </Section>
  );
}

