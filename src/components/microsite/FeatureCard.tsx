import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Badge from "./Badge";
import type { Feature } from "@/content/omnisign";

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const card = (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15 }}
      className="group flex flex-col gap-2 border border-border p-4 transition-colors hover:border-border-strong hover:bg-surface-raised"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-sans text-sm font-semibold text-text-primary">
          {feature.title}
        </h4>
        {feature.ndaRequired && <Badge variant="nda">NDA</Badge>}
      </div>
      <p className="text-[13px] leading-relaxed text-text-secondary">
        {feature.description}
      </p>
      {feature.ndaRequired && (
        <span className="mt-1 font-mono text-[11px] text-amber-400/70">
          Request access to learn more
        </span>
      )}
    </motion.div>
  );

  if (feature.ndaRequired) {
    return (
      <Link to="/projects/omnisign/contact" className="block">
        {card}
      </Link>
    );
  }

  return card;
}
