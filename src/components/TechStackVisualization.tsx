/**
 * Technical stack visualization showing how technologies relate
 * to different architectural concerns
 */

interface TechCategory {
  category: string;
  color: string;
  items: string[];
}

const categories: TechCategory[] = [
  {
    category: "Data Layer",
    color: "#94a3b8",
    items: ["PostgreSQL", "Redis", "Elasticsearch"],
  },
  {
    category: "Compute",
    color: "#64748b",
    items: ["Node.js", "TypeScript", "Python"],
  },
  {
    category: "ML/AI",
    color: "#475569",
    items: ["TensorFlow", "MediaPipe", "PyTorch"],
  },
  {
    category: "Ops/Deploy",
    color: "#334155",
    items: ["Docker", "Kubernetes", "CI/CD"],
  },
];

export default function TechStackVisualization() {
  return (
    <div className="relative w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.category}
            className="border border-[#1A1A1A]/10 p-4 rounded"
          >
            {/* Category header with color indicator */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#1A1A1A]/50">
                {cat.category}
              </h4>
            </div>

            {/* Tech items */}
            <div className="space-y-2">
              {cat.items.map((tech) => (
                <div
                  key={tech}
                  className="text-sm text-[#1A1A1A]/70 flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[#1A1A1A]/30" />
                  {tech}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-xs text-[#1A1A1A]/40 font-mono mt-6 text-center">
        All tools chosen for production reliability + real-world constraints
      </p>
    </div>
  );
}
