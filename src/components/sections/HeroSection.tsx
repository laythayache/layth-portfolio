import { useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useMediaQuery } from "@/motion/useMediaQuery";
import { useLenis } from "@/motion/LenisProvider";

const WALL_PATHS = [
  "M 16 46 L 58 34 L 92 58 L 124 38 L 178 66",
  "M 18 96 L 64 80 L 96 108 L 142 82 L 194 120",
  "M 24 144 L 70 130 L 108 156 L 154 132 L 202 168",
  "M 16 198 L 52 176 L 94 212 L 130 184 L 180 214",
  "M 24 250 L 68 236 L 112 260 L 146 236 L 198 270",
  "M 20 298 L 58 280 L 94 312 L 132 288 L 180 322",
  "M 22 344 L 74 330 L 114 358 L 160 336 L 206 372",
  "M 14 396 L 52 372 L 88 402 L 130 380 L 170 412",
] as const;

const WALL_NODES = [
  { x: 16, y: 46 },
  { x: 58, y: 34 },
  { x: 92, y: 58 },
  { x: 124, y: 38 },
  { x: 178, y: 66 },
  { x: 18, y: 96 },
  { x: 64, y: 80 },
  { x: 96, y: 108 },
  { x: 142, y: 82 },
  { x: 194, y: 120 },
  { x: 24, y: 144 },
  { x: 70, y: 130 },
  { x: 108, y: 156 },
  { x: 154, y: 132 },
  { x: 202, y: 168 },
  { x: 16, y: 198 },
  { x: 52, y: 176 },
  { x: 94, y: 212 },
  { x: 130, y: 184 },
  { x: 180, y: 214 },
  { x: 24, y: 250 },
  { x: 68, y: 236 },
  { x: 112, y: 260 },
  { x: 146, y: 236 },
  { x: 198, y: 270 },
  { x: 20, y: 298 },
  { x: 58, y: 280 },
  { x: 94, y: 312 },
  { x: 132, y: 288 },
  { x: 180, y: 322 },
  { x: 22, y: 344 },
  { x: 74, y: 330 },
  { x: 114, y: 358 },
  { x: 160, y: 336 },
  { x: 206, y: 372 },
  { x: 14, y: 396 },
  { x: 52, y: 372 },
  { x: 88, y: 402 },
  { x: 130, y: 380 },
  { x: 170, y: 412 },
] as const;

const EMBLEM_PATHS = [
  {
    d: "m0 0h9l-4 3-19 10-19 12-14 10-14 11-12 11-10 10-11 14-11 15-11 19-11 22-12 33-5 18-8 39-6 39-6 25-8 24-11 25-10 18-15 22-11 13-7 8-11 12-16 15-17 14-17 12-17 11-27 14-20 9-24 9-31 9-39 8-4-1 21-12 16-10 16-12 13-10 16-15 8-7 13-15 11-14 11-16 12-21 9-20 9-24 5-17 6-31 4-35 3-38 5-30 5-19 5-15 11-24 12-19 13-16 11-12 10-9 16-13 21-13 23-12 27-11 28-9 25-6 25-4 24-3z",
    transform: "translate(819 147)",
  },
  {
    d: "m0 0h32l23 1 3 1v2l-20 10-22 12-14 8-20 13-11 8-20 16-17 17-9 11-10 14-8 13-9 16-8 19-7 19-7 23-6 28-5 30-5 27-6 23-10 28-12 25-9 15-8 12-14 18-12 13-7 8-9 9-8 7-11 10-11 8-15 11-18 11-16 9-17 9-27 11-34 11-36 8-29 4-21 2h-23l4-4 21-10 23-13 20-12 16-11 17-13 10-9 8-7 19-19 11-14 13-18 10-17 8-16 9-23 7-23 6-30 3-25 3-40 3-26 5-24 6-20 9-22 9-17 12-18 12-14 9-10 8-8 11-9 13-10 25-15 16-8 18-8 28-10 22-6 23-5 29-4zm6 12-22 2-37 5-22 5-24 7-17 6-22 9-20 10-19 12-11 8-13 11-15 14-9 11-9 12-12 20-11 25-7 24-5 27-3 30-3 36-5 32-5 21-8 24-11 26-12 22-8 12-12 16-12 14-9 10-12 11-10 9-16 12-20 14-25 14-3 3 9-1 34-7 31-9 19-7 23-10 24-12 21-13 16-12 14-11 24-22 14-15 11-14 8-11 12-19 9-17 10-25 7-21 6-27 7-45 7-32 5-16 11-31 14-28 12-19 12-15 9-11 15-15 14-11 15-11 16-10 17-10 12-6v-1z",
    transform: "translate(813 135)",
  },
] as const;

type HeroScrollFactory = Parameters<
  typeof useScrollAnimation<HTMLElement>
>[1];

export default function HeroSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const cameraRigRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const leftWallRef = useRef<HTMLDivElement>(null);
  const leftWallCoreRef = useRef<HTMLDivElement>(null);
  const rightWallRef = useRef<HTMLDivElement>(null);
  const rightWallCoreRef = useRef<HTMLDivElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const emblemShellRef = useRef<HTMLDivElement>(null);
  const emblemCoreRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const laythRef = useRef<HTMLParagraphElement>(null);
  const ayacheRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const wallStrokeRefs = useRef<Array<SVGPathElement | null>>([]);
  const wallNodeRefs = useRef<Array<SVGCircleElement | null>>([]);
  const emblemPathRefs = useRef<Array<SVGPathElement | null>>([]);
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const mobileViewport = useMediaQuery("(max-width: 767px)");
  const mobileTuned = coarsePointer || mobileViewport;
  const timelineDistance = mobileTuned ? 2500 : 3800;

  const lenis = useLenis();

  const buildHeroTimeline = useCallback<HeroScrollFactory>(
    ({ gsap }) => {
      const section = sectionRef.current;
      const cameraRig = cameraRigRef.current;
      const grid = gridRef.current;
      const leftWall = leftWallRef.current;
      const leftWallCore = leftWallCoreRef.current;
      const rightWall = rightWallRef.current;
      const rightWallCore = rightWallCoreRef.current;
      const composition = compositionRef.current;
      const frame = frameRef.current;
      const emblemShell = emblemShellRef.current;
      const emblemCore = emblemCoreRef.current;
      const scanLine = scanLineRef.current;
      const layth = laythRef.current;
      const ayache = ayacheRef.current;
      const subtitle = subtitleRef.current;
      const cta = ctaRef.current;
      const wallStrokes = wallStrokeRefs.current.filter(
        Boolean
      ) as SVGPathElement[];
      const wallNodes = wallNodeRefs.current.filter(Boolean) as SVGCircleElement[];
      const emblemStrokes = emblemPathRefs.current.filter(
        Boolean
      ) as SVGPathElement[];

      if (
        !section
        || !cameraRig
        || !grid
        || !leftWall
        || !leftWallCore
        || !rightWall
        || !rightWallCore
        || !composition
        || !frame
        || !emblemShell
        || !emblemCore
        || !scanLine
        || !layth
        || !ayache
        || !subtitle
        || !cta
        || wallStrokes.length === 0
        || wallNodes.length === 0
        || emblemStrokes.length === 0
      ) {
        return;
      }

      for (const stroke of wallStrokes) {
        const pathLength = stroke.getTotalLength();
        gsap.set(stroke, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 0.16,
        });
      }

      gsap.set([cameraRig, grid, leftWall, rightWall, composition, emblemShell], {
        willChange: "transform, opacity",
        force3D: true,
      });
      gsap.set([layth, ayache, scanLine, frame, subtitle, cta], {
        willChange: "transform, opacity",
      });
      gsap.set(grid, { opacity: 0, scale: 1.04 });
      gsap.set([leftWall, rightWall], {
        xPercent: (index: number) => (index === 0 ? -74 : 74),
        opacity: 0.24,
        filter: "blur(7px)",
      });
      gsap.set(wallNodes, {
        opacity: 0.22,
        scale: 0.68,
        transformOrigin: "50% 50%",
      });
      gsap.set(emblemStrokes, {
        opacity: 0.14,
        strokeWidth: mobileTuned ? 0.95 : 0.9,
      });
      gsap.set(composition, { scale: 0.97, y: 10 });
      gsap.set(scanLine, { opacity: 0, yPercent: -110 });
      gsap.set(frame, { opacity: 0, scale: 0.94 });
      gsap.set([layth, ayache], { opacity: 0 });
      gsap.set(layth, { x: -96, y: -72 });
      gsap.set(ayache, { x: 96, y: 72 });
      gsap.set([subtitle, cta], { opacity: 0, y: 16 });

      const jitterTimeline = gsap.timeline({
        repeat: -1,
        defaults: { ease: "sine.inOut" },
      });

      jitterTimeline
        .to([leftWallCore, rightWallCore], {
          x: 0.9,
          y: -1.1,
          rotation: 0.2,
          duration: 0.8,
          stagger: 0.12,
        })
        .to([leftWallCore, rightWallCore], {
          x: -1.2,
          y: 0.9,
          rotation: -0.26,
          duration: 0.78,
          stagger: 0.12,
        })
        .to([leftWallCore, rightWallCore], {
          x: 0.5,
          y: -0.35,
          rotation: 0.1,
          duration: 0.66,
          stagger: 0.12,
        })
        .to([leftWallCore, rightWallCore], {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.94,
          stagger: 0.12,
        });

      const emblemJitter = gsap.to(emblemCore, {
        y: -0.8,
        rotation: 0.72,
        duration: 2.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${timelineDistance}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      timeline
        .addLabel("phase1", 0)
        .to([leftWall, rightWall], {
          xPercent: (index: number) => (index === 0 ? -38 : 38),
          opacity: 0.48,
          filter: "blur(2.8px)",
          duration: 0.88,
        }, "phase1")
        .to(wallStrokes, {
          strokeDashoffset: 0,
          opacity: 0.58,
          duration: 0.9,
          stagger: 0.018,
        }, "phase1")
        .to(wallNodes, {
          opacity: 0.45,
          scale: 0.92,
          duration: 0.78,
          stagger: 0.01,
        }, "phase1+=0.1")
        .to(emblemStrokes, {
          opacity: 0.46,
          strokeWidth: mobileTuned ? 1.35 : 1.55,
          duration: 0.86,
          stagger: 0.04,
        }, "phase1+=0.06")
        .to(composition, { scale: 1, y: 0, duration: 0.86 }, "phase1")
        .addLabel("phase2", "phase1+=0.98")
        .to(cameraRig, {
          scale: mobileTuned ? 1.08 : 1.16,
          z: mobileTuned ? 48 : 95,
          duration: 1.05,
          transformOrigin: "50% 50%",
        }, "phase2")
        .to(grid, {
          opacity: 0.3,
          yPercent: -18,
          duration: 1.05,
        }, "phase2")
        .to([leftWall, rightWall], {
          xPercent: (index: number) => (index === 0 ? -92 : 92),
          opacity: 0.8,
          filter: "blur(0.5px)",
          duration: 1.05,
        }, "phase2")
        .to(wallNodes, {
          opacity: 0.9,
          scale: 1.08,
          duration: 0.78,
          stagger: 0.008,
        }, "phase2+=0.1")
        .to(emblemShell, { scale: 1.05, duration: 1.03 }, "phase2")
        .addLabel("phase3", "phase2+=1.06")
        .to([leftWall, rightWall], {
          xPercent: (index: number) => (index === 0 ? -17 : 17),
          duration: 1.35,
          ease: "power2.inOut",
        }, "phase3")
        .to(
          cameraRig,
          {
            scale: mobileTuned ? 1.11 : 1.22,
            duration: 1.35,
            ease: "power2.inOut",
          },
          "phase3"
        )
        .to(
          emblemShell,
          {
            scale: 1.09,
            y: -6,
            rotation: mobileTuned ? 4 : 7,
            duration: 1.24,
            ease: "power2.inOut",
          },
          "phase3+=0.06"
        )
        .fromTo(
          scanLine,
          { opacity: 0, yPercent: -110 },
          {
            opacity: 0.64,
            yPercent: 112,
            duration: 0.42,
            ease: "power2.inOut",
          },
          "phase3+=0.38"
        )
        .to(scanLine, { opacity: 0, duration: 0.12 }, "phase3+=0.82")
        .addLabel("phase4", "phase3+=1.2")
        .to([leftWall, rightWall], {
          xPercent: (index: number) => (index === 0 ? -30 : 30),
          duration: 0.36,
          ease: "power3.out",
        }, "phase4")
        .to(frame, {
          opacity: 0.9,
          scale: 1,
          duration: 0.36,
          ease: "power2.out",
        }, "phase4")
        .to(
          layth,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.56,
            ease: "power3.out",
          },
          "phase4+=0.08"
        )
        .to(
          ayache,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.56,
            ease: "power3.out",
          },
          "phase4+=0.16"
        )
        .to(
          subtitle,
          { opacity: 1, y: 0, duration: 0.42, ease: "power2.out" },
          "phase4+=0.38"
        )
        .to(
          emblemShell,
          { rotation: 0, scale: 1.03, y: 0, duration: 0.52, ease: "power2.out" },
          "phase4+=0.32"
        )
        .addLabel("settle", "phase4+=0.72")
        .to([leftWall, rightWall], {
          xPercent: (index: number) => (index === 0 ? -31.6 : 31.6),
          duration: 0.22,
        }, "settle")
        .to(
          composition,
          {
            x: -3,
            y: 2,
            scale: 1.01,
            duration: 0.22,
            ease: "power1.inOut",
          },
          "settle"
        )
        .to([leftWall, rightWall], {
          xPercent: (index: number) => (index === 0 ? -30 : 30),
          duration: 0.3,
        }, "settle+=0.22")
        .to(
          composition,
          { x: 0, y: 0, scale: 1, duration: 0.34, ease: "power1.out" },
          "settle+=0.24"
        )
        .to(cta, { opacity: 1, y: 0, duration: 0.34, ease: "power2.out" }, "settle+=0.28");

      return () => {
        jitterTimeline.kill();
        emblemJitter.kill();
      };
    },
    [mobileTuned, timelineDistance]
  );

  useScrollAnimation(sectionRef, buildHeroTimeline, !reduced);

  function handleScrollToProjects() {
    if (lenis) {
      lenis.scrollTo("#projects", { offset: -64 });
    } else {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-cinematic hero-blueprint relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgb(148_163_184_/_0.12),transparent_62%)]" />
      <div ref={gridRef} className="hero-blueprint-grid pointer-events-none absolute inset-0" />

      <div
        ref={cameraRigRef}
        className="relative z-10 h-full w-full"
      >
        <div
          ref={leftWallRef}
          className="hero-neural-wall absolute left-0 top-1/2 h-[62vh] w-[min(24vw,320px)] -translate-y-1/2"
          aria-hidden
        >
          <div ref={leftWallCoreRef} className="h-full w-full">
            <svg viewBox="0 0 220 430" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
              {WALL_PATHS.map((d, index) => (
                <path
                  key={`left-stroke-${index}`}
                  ref={(element) => {
                    wallStrokeRefs.current[index] = element;
                  }}
                  d={d}
                  className="hero-wall-stroke"
                />
              ))}
              {WALL_NODES.map((node, index) => (
                <circle
                  key={`left-node-${index}`}
                  ref={(element) => {
                    wallNodeRefs.current[index] = element;
                  }}
                  cx={node.x}
                  cy={node.y}
                  r="2.7"
                  className="hero-wall-node"
                />
              ))}
            </svg>
          </div>
        </div>

        <div
          ref={rightWallRef}
          className="hero-neural-wall absolute right-0 top-1/2 h-[62vh] w-[min(24vw,320px)] -translate-y-1/2"
          aria-hidden
        >
          <div ref={rightWallCoreRef} className="h-full w-full">
            <svg viewBox="0 0 220 430" className="h-full w-full -scale-x-100" preserveAspectRatio="xMidYMid meet">
              {WALL_PATHS.map((d, index) => (
                <path
                  key={`right-stroke-${index}`}
                  ref={(element) => {
                    wallStrokeRefs.current[index + WALL_PATHS.length] = element;
                  }}
                  d={d}
                  className="hero-wall-stroke"
                />
              ))}
              {WALL_NODES.map((node, index) => (
                <circle
                  key={`right-node-${index}`}
                  ref={(element) => {
                    wallNodeRefs.current[index + WALL_NODES.length] = element;
                  }}
                  cx={node.x}
                  cy={node.y}
                  r="2.7"
                  className="hero-wall-node"
                />
              ))}
            </svg>
          </div>
        </div>

        <div
          ref={scanLineRef}
          className="hero-scan-line pointer-events-none absolute left-0 right-0 top-0 h-[1px]"
          aria-hidden
        />

        <div
          ref={compositionRef}
          className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center text-center"
        >
          <div
            ref={frameRef}
            className="pointer-events-none absolute inset-x-8 top-1/2 h-[300px] -translate-y-1/2 rounded-[28px] border border-slate-500/35"
            aria-hidden
          />

          <div
            ref={emblemShellRef}
            className="relative flex h-[288px] w-[220px] items-center justify-center sm:h-[360px] sm:w-[280px]"
          >
            <div ref={emblemCoreRef} className="w-full">
              <svg viewBox="760 120 320 560" className="h-auto w-full" role="img" aria-label="Layth emblem">
                {EMBLEM_PATHS.map((path, index) => (
                  <path
                    key={`emblem-stroke-${index}`}
                    ref={(element) => {
                      emblemPathRefs.current[index] = element;
                    }}
                    d={path.d}
                    transform={path.transform}
                    className="hero-emblem-path"
                  />
                ))}
              </svg>
            </div>
          </div>

          <p
            ref={laythRef}
            className="hero-name hero-name-layth"
          >
            LAYTH
          </p>
          <p
            ref={ayacheRef}
            className="hero-name hero-name-ayache"
          >
            AYACHE
          </p>

          <p
            ref={subtitleRef}
            className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 sm:text-xs"
          >
            AI Systems Engineer / Technical Consultant
          </p>

          <div ref={ctaRef} className="mt-12">
            <button
              type="button"
              onClick={handleScrollToProjects}
              data-magnetic
              data-cursor-label="Reveal Projects"
              className={cn(
                "inline-flex items-center gap-2 border border-accent px-6 py-3",
                "font-mono text-sm uppercase tracking-wider text-accent",
                "transition-colors hover:bg-accent hover:text-white",
                "shadow-[0_14px_34px_rgb(37_99_235_/_0.12)]"
              )}
            >
              Enter Portfolio
              <ArrowDown size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

