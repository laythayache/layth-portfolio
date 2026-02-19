import type { TeamMember } from "@/content/omnisign";

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {members.map((member) => (
        <div key={member.name} className="flex flex-col gap-2">
          <div className="aspect-square w-full overflow-hidden border border-border bg-surface-raised">
            <img
              src={member.image}
              alt={`Portrait of ${member.name}, ${member.role}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-sans text-sm font-medium text-text-primary">
              {member.name}
            </p>
            <p className="font-mono text-[11px] leading-snug text-text-muted">
              {member.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
