/**
 * Tech stack display with categories
 * Spacious layout with staggered fade-in animations
 */

import { motion } from 'framer-motion';

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.15 }}
            className="space-y-6"
          >
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#1A1A1A]/40">
              {cat.name}
            </h3>
            <ul className="space-y-4">
              {cat.items.map((tech) => (
                <li key={tech} className="text-base text-[#1A1A1A]/80">
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
