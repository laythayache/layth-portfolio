import { motion, useReducedMotion } from "framer-motion";

interface HandLandmarksProps {
  className?: string;
  animate?: boolean;
}

// MediaPipe-style hand landmark positions (normalized 0-100)
const landmarks = [
  // Wrist
  { x: 50, y: 95 },
  // Thumb
  { x: 35, y: 80 },
  { x: 25, y: 70 },
  { x: 18, y: 58 },
  { x: 12, y: 48 },
  // Index
  { x: 38, y: 55 },
  { x: 35, y: 38 },
  { x: 33, y: 25 },
  { x: 32, y: 12 },
  // Middle
  { x: 50, y: 52 },
  { x: 50, y: 32 },
  { x: 50, y: 18 },
  { x: 50, y: 5 },
  // Ring
  { x: 62, y: 55 },
  { x: 65, y: 38 },
  { x: 67, y: 25 },
  { x: 68, y: 14 },
  // Pinky
  { x: 73, y: 62 },
  { x: 78, y: 50 },
  { x: 82, y: 42 },
  { x: 85, y: 35 },
];

// Connections between landmarks (MediaPipe style)
const connections = [
  // Wrist to finger bases
  [0, 1], [0, 5], [0, 9], [0, 13], [0, 17],
  // Thumb
  [1, 2], [2, 3], [3, 4],
  // Index
  [5, 6], [6, 7], [7, 8],
  // Middle
  [9, 10], [10, 11], [11, 12],
  // Ring
  [13, 14], [14, 15], [15, 16],
  // Pinky
  [17, 18], [18, 19], [19, 20],
  // Palm connections
  [5, 9], [9, 13], [13, 17],
];

export default function HandLandmarks({
  className = "",
  animate = true,
}: HandLandmarksProps) {
  const reduced = useReducedMotion();
  const shouldAnimate = animate && !reduced;

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Connection lines */}
      {connections.map(([from, to], index) => {
        const fromPoint = landmarks[from];
        const toPoint = landmarks[to];
        return (
          <motion.line
            key={`line-${index}`}
            x1={fromPoint.x}
            y1={fromPoint.y}
            x2={toPoint.x}
            y2={toPoint.y}
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            className="text-teal-300"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : {}}
            whileInView={
              shouldAnimate
                ? { pathLength: 1, opacity: 0.6 }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              delay: index * 0.03,
              duration: 0.5,
              ease: [0, 0, 0.2, 1],
            }}
          />
        );
      })}

      {/* Landmark dots */}
      {landmarks.map((point, index) => (
        <motion.circle
          key={`point-${index}`}
          cx={point.x}
          cy={point.y}
          r={index === 0 ? 3 : index % 4 === 0 ? 2.5 : 2}
          className={index === 0 ? "fill-teal-500" : "fill-teal-400"}
          initial={shouldAnimate ? { scale: 0, opacity: 0 } : {}}
          whileInView={shouldAnimate ? { scale: 1, opacity: 1 } : {}}
          viewport={{ once: true }}
          transition={{
            delay: 0.5 + index * 0.03,
            duration: 0.3,
            ease: [0, 0, 0.2, 1],
          }}
        />
      ))}

      {/* Fingertip highlights */}
      {[4, 8, 12, 16, 20].map((tipIndex) => (
        <motion.circle
          key={`tip-${tipIndex}`}
          cx={landmarks[tipIndex].x}
          cy={landmarks[tipIndex].y}
          r="4"
          className="fill-teal-200"
          style={{ opacity: 0.3 }}
          initial={shouldAnimate ? { scale: 0 } : {}}
          whileInView={shouldAnimate ? { scale: 1 } : {}}
          viewport={{ once: true }}
          transition={{
            delay: 1 + tipIndex * 0.05,
            duration: 0.4,
            ease: [0, 0, 0.2, 1],
          }}
        />
      ))}
    </svg>
  );
}
