import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAProps {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
}

export default function CTA({
  to,
  children,
  variant = "primary",
  external = false,
  className,
}: CTAProps) {
  const classes = cn(
    "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-5 py-2.5 border transition-colors",
    variant === "primary" &&
      "border-text-primary text-text-primary hover:bg-text-primary hover:text-surface",
    variant === "secondary" &&
      "border-border text-text-secondary hover:border-border-strong hover:text-text-primary",
    className
  );

  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer">
        <motion.span whileHover={{ x: 2 }} className={classes}>
          {children}
          <ArrowRight size={14} />
        </motion.span>
      </a>
    );
  }

  return (
    <Link to={to}>
      <motion.span whileHover={{ x: 2 }} className={classes}>
        {children}
        <ArrowRight size={14} />
      </motion.span>
    </Link>
  );
}
