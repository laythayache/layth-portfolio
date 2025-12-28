import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const SignWaveProgress = () => {
  const prefersReducedMotion = useReducedMotion();
  const [wavePath, setWavePath] = useState("M 0 2 L 100 2");
  
  const { scrollYProgress } = useScroll();

  const progressWidth = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Update wave path based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (prefersReducedMotion) {
      setWavePath("M 0 2 L 100 2");
      return;
    }

    const amp = 1.5 * (1 - latest); // Amplitude decreases as we scroll
    const freq = 0.02 + (latest * 0.08); // Frequency increases
    const points: string[] = [];
    
    for (let x = 0; x <= 100; x += 0.5) {
      const y = 2 + amp * Math.sin(x * freq * Math.PI * 2);
      points.push(`${x} ${y}`);
    }
    
    setWavePath(`M ${points.join(' L ')}`);
  });

  if (prefersReducedMotion) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-background/50 backdrop-blur-sm">
        <motion.div
          className="h-full bg-accent"
          style={{ 
            width: useTransform(progressWidth, (v) => `${v}%`)
          } as React.CSSProperties}
        />
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-background/50 backdrop-blur-sm">
      <svg 
        className="w-full h-full" 
        viewBox="0 0 100 4" 
        preserveAspectRatio="none"
      >
        <motion.path
          d={wavePath}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="0.3"
          strokeLinecap="round"
        />
        {/* Progress fill */}
        <motion.rect
          x="0"
          y="0"
          width={progressWidth}
          height="4"
          fill="hsl(var(--accent))"
          opacity={0.3}
        />
      </svg>
    </div>
  );
};

export default SignWaveProgress;

