import Link from "next/link";
import Tag from "./Tag";

interface CardProps {
  title: string;
  outcome: string;
  tags: string[];
  href?: string;
  className?: string;
}

export default function Card({ title, outcome, tags, href = "#", className = "" }: CardProps) {
  const content = (
    <div
      className={`p-6 border rounded-lg transition-all ${className}`}
      style={{
        borderColor: "var(--text)",
        backgroundColor: "var(--bg)",
        opacity: 0.95,
      }}
    >
      <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>
        {title}
      </h3>
      <p className="text-sm mb-4" style={{ color: "var(--text)", opacity: 0.7 }}>
        {outcome}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div 
        className="text-sm font-medium inline-block"
        style={{ 
          color: "var(--text)",
          borderBottom: "1px solid var(--accent)",
          paddingBottom: "1px"
        }}
      >
        Case study →
      </div>
    </div>
  );

  if (href === "#") {
    return content;
  }

  return (
    <Link href={href} className="block focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
      {content}
    </Link>
  );
}
