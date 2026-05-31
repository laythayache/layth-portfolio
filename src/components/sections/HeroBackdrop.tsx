import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Node = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  phaseX: number;
  phaseY: number;
  radiusX: number;
  radiusY: number;
  speed: number;
};

type Pulse = {
  connection: number;
  progress: number;
  speed: number;
  nextAt: number;
};

const NODE_POSITIONS: ReadonlyArray<readonly [number, number]> = [
  [0.12, 0.22],
  [0.28, 0.7],
  [0.45, 0.16],
  [0.58, 0.78],
  [0.74, 0.3],
  [0.88, 0.62],
  [0.36, 0.46],
  [0.66, 0.52],
];

const CONNECTIONS: ReadonlyArray<readonly [number, number]> = [
  [0, 6],
  [6, 1],
  [6, 2],
  [2, 4],
  [4, 7],
  [7, 5],
  [5, 3],
  [3, 1],
  [6, 7],
];

export default function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;

    const nodes: Node[] = NODE_POSITIONS.map(([nx, ny], i) => ({
      baseX: nx,
      baseY: ny,
      x: 0,
      y: 0,
      phaseX: i * 1.37,
      phaseY: i * 0.91 + 0.5,
      radiusX: 18 + (i % 3) * 7,
      radiusY: 14 + ((i + 1) % 3) * 6,
      speed: 0.00018 + (i % 4) * 0.00005,
    }));

    const pulses: Pulse[] = CONNECTIONS.map((_, i) => ({
      connection: i,
      progress: -1,
      speed: 0.00045 + Math.random() * 0.0003,
      nextAt: performance.now() + 1500 + i * 1100 + Math.random() * 2000,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        const time = reduced ? 0 : t * n.speed;
        n.x = n.baseX * width + Math.cos(time + n.phaseX) * n.radiusX;
        n.y = n.baseY * height + Math.sin(time + n.phaseY) * n.radiusY;
      }

      const pointer = pointerRef.current;
      if (pointer.active && !reduced) {
        for (const n of nodes) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d2 = dx * dx + dy * dy;
          const influence = Math.max(0, 1 - d2 / (240 * 240));
          if (influence > 0) {
            n.x += dx * influence * 0.05;
            n.y += dy * influence * 0.05;
          }
        }
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(145, 137, 122, 0.18)";
      for (const [aIdx, bIdx] of CONNECTIONS) {
        const a = nodes[aIdx];
        const b = nodes[bIdx];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      if (!reduced) {
        for (const p of pulses) {
          if (p.progress < 0) {
            if (t >= p.nextAt) {
              p.progress = 0;
            } else {
              continue;
            }
          }
          p.progress += p.speed * 16;
          if (p.progress > 1) {
            p.progress = -1;
            p.nextAt = t + 4200 + Math.random() * 5600;
            continue;
          }
          const [aIdx, bIdx] = CONNECTIONS[p.connection];
          const a = nodes[aIdx];
          const b = nodes[bIdx];
          const px = a.x + (b.x - a.x) * p.progress;
          const py = a.y + (b.y - a.y) * p.progress;
          const tailT = Math.max(0, p.progress - 0.1);
          const tx = a.x + (b.x - a.x) * tailT;
          const ty = a.y + (b.y - a.y) * tailT;

          const grad = ctx.createLinearGradient(tx, ty, px, py);
          grad.addColorStop(0, "rgba(75, 52, 38, 0)");
          grad.addColorStop(1, "rgba(75, 52, 38, 0.42)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(px, py);
          ctx.stroke();

          ctx.fillStyle = "rgba(75, 52, 38, 0.55)";
          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = "rgba(89, 97, 76, 0.42)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(89, 97, 76, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 5.2, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const tick = (t: number) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(tick);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
      pointerRef.current.active = true;
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
