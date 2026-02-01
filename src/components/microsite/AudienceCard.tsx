import { Link } from "react-router-dom";
import Badge from "./Badge";
import type { Audience } from "@/content/omnisign";

interface AudienceCardProps {
  audience: Audience;
}

export default function AudienceCard({ audience }: AudienceCardProps) {
  const content = (
    <div className="flex flex-col gap-3 border border-border p-4 transition-colors hover:border-border-strong hover:bg-surface-raised">
      <div className="flex items-center justify-between">
        <h4 className="font-sans text-sm font-semibold text-text-primary">
          {audience.title}
        </h4>
        {audience.ndaRequired && <Badge variant="nda">NDA</Badge>}
      </div>
      <ul className="flex flex-col gap-1.5">
        {audience.points.map((point) => (
          <li
            key={point}
            className="text-[13px] leading-relaxed text-text-secondary before:mr-2 before:text-text-muted before:content-['—']"
          >
            {point}
          </li>
        ))}
      </ul>
      {audience.ndaRequired && (
        <span className="font-mono text-[11px] text-amber-400/70">
          Request access required
        </span>
      )}
    </div>
  );

  if (audience.ndaRequired) {
    return (
      <Link to="/projects/omnisign/contact" className="block">
        {content}
      </Link>
    );
  }

  return content;
}
