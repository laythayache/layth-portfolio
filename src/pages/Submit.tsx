import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getProjectBySlug } from "@/content/projects";

const EMAIL = "hello@laythayache.com";

function getDoors(projectSlug: string | null) {
  const project = projectSlug ? getProjectBySlug(projectSlug) : null;
  const projectName = project?.title ?? projectSlug ?? "";
  const challengeSubject = project
    ? `Challenge%3A%20${encodeURIComponent(projectName)}`
    : "Project%20Challenge";
  const challengeBody = project
    ? `I%27m%20challenging%20the%20${encodeURIComponent(projectName)}%20project.%0A%0ASpecifically%3A%0A`
    : "Which%20project%20are%20you%20challenging%2C%20and%20what%20specifically%20do%20you%20think%20is%20wrong%3F";

  return [
    {
      title: "Submit a system or problem",
      description:
        "You've identified a system in Lebanon that's broken, opaque, or underserved. You want someone to look at it seriously — map it, prototype an intervention, document the findings publicly.",
      cta: "Describe the system",
      href: `mailto:${EMAIL}?subject=System%20Submission&body=Describe%20the%20system%20or%20problem%20you%27d%20like%20me%20to%20investigate.`,
      highlighted: false,
    },
    {
      title: project
        ? `Challenge: ${projectName}`
        : "Challenge a project",
      description: project
        ? `You've looked at ${projectName} and found a flaw — in the methodology, the assumptions, the implementation, or the framing. Good. That's what this space is for.`
        : "You've looked at one of the projects here and found a flaw — in the methodology, the assumptions, the implementation, or the framing. Good. That's what this space is for.",
      cta: "Submit your challenge",
      href: `mailto:${EMAIL}?subject=${challengeSubject}&body=${challengeBody}`,
      highlighted: !!project,
    },
    {
      title: "Request a private discussion",
      description:
        "Some things don't belong in public yet. If you want to discuss a collaboration, a sensitive system, or something that requires discretion before it's documented — reach out directly.",
      cta: "Start a conversation",
      href: `mailto:${EMAIL}?subject=Private%20Discussion`,
      highlighted: false,
    },
  ];
}

export default function Submit() {
  const [searchParams] = useSearchParams();
  const projectSlug = searchParams.get("project");
  const doors = getDoors(projectSlug);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="font-sans text-2xl font-semibold text-text-primary">
          Submit
        </h1>
        <p className="text-sm text-text-secondary">
          Three doors. Pick the one that fits.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {doors.map((door) => (
          <a key={door.title} href={door.href} target="_blank" rel="noreferrer">
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className={`group flex flex-col gap-3 border p-6 transition-colors hover:border-border-strong hover:bg-surface-raised ${
                door.highlighted
                  ? "border-border-strong bg-surface-raised"
                  : "border-border"
              }`}
            >
              <div className="flex items-start justify-between">
                <h2 className="font-sans text-lg font-semibold text-text-primary">
                  {door.title}
                </h2>
                <ArrowUpRight
                  size={16}
                  className="text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                {door.description}
              </p>
              <span className="mt-1 font-mono text-xs uppercase tracking-wider text-text-muted group-hover:text-text-secondary">
                {door.cta}
              </span>
            </motion.div>
          </a>
        ))}
      </div>
    </div>
  );
}
