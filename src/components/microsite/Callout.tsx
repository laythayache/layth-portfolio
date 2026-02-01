import { cn } from "@/lib/utils";

interface CalloutProps {
  children: React.ReactNode;
  variant?: "default" | "warn" | "note";
  className?: string;
}

export default function Callout({
  children,
  variant = "default",
  className,
}: CalloutProps) {
  return (
    <div
      className={cn(
        "border-l-2 pl-4 py-3 text-sm leading-relaxed",
        variant === "default" && "border-text-muted/30 text-text-secondary",
        variant === "warn" && "border-amber-500/50 text-amber-200/80",
        variant === "note" && "border-sky-500/50 text-sky-200/80",
        className
      )}
    >
      {children}
    </div>
  );
}
