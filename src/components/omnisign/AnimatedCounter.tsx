import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
  caveat?: string;
  index?: number;
}

function parseValue(value: string): { num: number; suffix: string; prefix: string } {
  // Handle values like "50,000+", "98%", "80,000+"
  const prefix = value.match(/^[^\d]*/)?.[0] || "";
  const suffix = value.match(/[^\d]*$/)?.[0] || "";
  const numStr = value.replace(/[^\d]/g, "");
  const num = parseInt(numStr, 10) || 0;
  return { num, suffix, prefix };
}

function formatNumber(n: number, originalValue: string): string {
  // Preserve original formatting style
  if (originalValue.includes(",")) {
    return n.toLocaleString();
  }
  return n.toString();
}

export default function AnimatedCounter({
  value,
  label,
  caveat,
  index = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [displayNum, setDisplayNum] = useState(0);

  const { num, suffix, prefix } = parseValue(value);

  useEffect(() => {
    if (!isInView || reduced) {
      setDisplayNum(num);
      return;
    }

    const duration = 1500; // ms
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setDisplayNum(Math.floor(eased * num));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, num, reduced]);

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col items-center p-6 text-center"
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: reduced ? 0 : index * 0.1,
        duration: reduced ? 0.15 : 0.5,
        ease: [0, 0, 0.2, 1],
      }}
    >
      {/* Decorative hand icon - subtle */}
      <div className="absolute -top-2 right-2 text-teal-200 opacity-0 transition-opacity group-hover:opacity-100">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
          <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
          <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
          <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
        </svg>
      </div>

      {/* Number */}
      <span className="font-sans text-4xl font-bold text-teal-600 md:text-5xl">
        {prefix}
        {formatNumber(displayNum, value)}
        {suffix}
      </span>

      {/* Label */}
      <span className="mt-2 font-mono text-xs uppercase tracking-wider text-slate-500">
        {label}
      </span>

      {/* Caveat tooltip */}
      {caveat && (
        <div className="mt-2 max-w-[200px] text-center text-[11px] leading-relaxed text-slate-400">
          {caveat}
        </div>
      )}
    </motion.div>
  );
}
