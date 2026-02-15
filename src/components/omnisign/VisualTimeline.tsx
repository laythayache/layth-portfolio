import { motion, useReducedMotion } from "framer-motion";
import { Check, Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimelineItem } from "@/content/omnisign";

interface VisualTimelineProps {
  items: TimelineItem[];
}

function TimelineNode({
  item,
  index,
  isLast,
}: {
  item: TimelineItem;
  index: number;
  isLast: boolean;
}) {
  const reduced = useReducedMotion();

  const statusStyles = {
    completed: {
      node: "bg-teal-500 text-white",
      line: "bg-teal-300",
      card: "border-teal-200 bg-teal-50/50",
      date: "text-teal-600",
    },
    current: {
      node: "bg-teal-600 text-white ring-4 ring-teal-100",
      line: "bg-gradient-to-b from-teal-300 to-slate-200",
      card: "border-teal-300 bg-white shadow-md",
      date: "text-teal-700 font-semibold",
    },
    upcoming: {
      node: "bg-slate-200 text-slate-400",
      line: "bg-slate-200 border-l-2 border-dashed border-slate-300 bg-transparent",
      card: "border-slate-200 bg-slate-50/50",
      date: "text-slate-400",
    },
  };

  const styles = statusStyles[item.status];

  return (
    <motion.div
      className="relative flex gap-4"
      initial={{ opacity: 0, x: reduced ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        delay: reduced ? 0 : index * 0.12,
        duration: reduced ? 0.15 : 0.5,
        ease: [0, 0, 0.2, 1],
      }}
    >
      {/* Timeline line and node */}
      <div className="flex flex-col items-center">
        {/* Node */}
        <motion.div
          className={cn(
            "relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all",
            styles.node
          )}
          initial={
            item.status === "current" && !reduced
              ? { scale: 0.8 }
              : {}
          }
          whileInView={
            item.status === "current" && !reduced
              ? { scale: 1 }
              : {}
          }
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4, ease: [0, 0, 0.2, 1] }}
        >
          {item.status === "completed" ? (
            <Check size={18} strokeWidth={2.5} />
          ) : item.status === "current" ? (
            <motion.div
              animate={reduced ? {} : { scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Circle size={12} fill="currentColor" />
            </motion.div>
          ) : (
            <ArrowRight size={16} />
          )}
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <div
            className={cn(
              "w-0.5 flex-1",
              item.status === "upcoming"
                ? "border-l-2 border-dashed border-slate-300"
                : styles.line
            )}
            style={{ minHeight: "40px" }}
          />
        )}
      </div>

      {/* Content card */}
      <div
        className={cn(
          "mb-6 flex-1 rounded-lg border p-4 transition-colors",
          styles.card
        )}
      >
        <span
          className={cn(
            "mb-1 block font-mono text-xs uppercase tracking-wider",
            styles.date
          )}
        >
          {item.date}
        </span>
        <h4 className="mb-2 font-sans text-base font-semibold text-slate-800">
          {item.title}
        </h4>
        <p className="text-sm leading-relaxed text-slate-600">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function VisualTimeline({ items }: VisualTimelineProps) {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <TimelineNode
          key={index}
          item={item}
          index={index}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}
