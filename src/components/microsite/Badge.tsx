import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "nda" | "mode" | "status";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 border",
        variant === "nda" &&
          "border-amber-500/40 text-amber-400 bg-amber-500/5",
        variant === "mode" &&
          "border-sky-500/40 text-sky-400 bg-sky-500/5",
        variant === "status" &&
          "border-emerald-500/40 text-emerald-400 bg-emerald-500/5",
        variant === "default" &&
          "border-border text-text-muted",
        className
      )}
    >
      {variant === "nda" && <Lock size={10} />}
      {children}
    </span>
  );
}
