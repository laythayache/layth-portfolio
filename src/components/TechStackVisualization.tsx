/**
 * Simple, elegant tech stack display
 */

const categories = [
  {
    name: "Data",
    items: ["PostgreSQL", "Redis"],
  },
  {
    name: "Backend",
    items: ["Node.js", "TypeScript"],
  },
  {
    name: "ML",
    items: ["TensorFlow", "MediaPipe"],
  },
  {
    name: "Ops",
    items: ["Docker", "Kubernetes"],
  },
];

export default function TechStackVisualization() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div key={cat.name} className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#1A1A1A]/40">
              {cat.name}
            </div>
            <div className="space-y-2">
              {cat.items.map((tech) => (
                <div key={tech} className="text-sm text-[#1A1A1A]/70">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
