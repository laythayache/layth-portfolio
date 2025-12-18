"use client";

import { useEffect, useMemo, useState } from "react";

type Phase = "blank" | "loading" | "expanding" | "reveal" | "idle";

export default function BrandComposition() {
  const [phase, setPhase] = useState<Phase>("blank");
  const [runId, setRunId] = useState(0);

  // Timeline (ms)
  const T_BLANK = 200;
  const T_SPIN = 1100;
  const T_EXPAND = 1400;
  const T_GAP = 120;
  const T_REVEAL = 550;

  const schedule = useMemo(() => {
    return {
      blankEnd: T_BLANK,
      loadingEnd: T_BLANK + T_SPIN,
      expandingEnd: T_BLANK + T_SPIN + T_EXPAND,
      revealStart: T_BLANK + T_SPIN + T_EXPAND + T_GAP,
      idle: T_BLANK + T_SPIN + T_EXPAND + T_GAP + T_REVEAL,
    };
  }, []);

  useEffect(() => {
    setPhase("blank");

    const t1 = window.setTimeout(() => setPhase("loading"), schedule.blankEnd);
    const t2 = window.setTimeout(() => setPhase("expanding"), schedule.loadingEnd);
    const t3 = window.setTimeout(() => setPhase("reveal"), schedule.revealStart);
    const t4 = window.setTimeout(() => setPhase("idle"), schedule.idle);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [runId, schedule]);

  const restart = () => setRunId((v) => v + 1);

  return (
    <section className="bc" onClick={restart} data-phase={phase}>
      <div className="bc__wrap">
        <div
          className="bc__emblem"
          onMouseEnter={restart}
          role="button"
          aria-label="Restart loading choreography"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              restart();
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            role="img"
            aria-label="Emblem"
            className="bc__svg"
          >
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="#6b7280"
              strokeWidth="10"
              strokeLinecap="butt"
              strokeDasharray="70 24 70 24"
              transform="rotate(20 50 50)"
            />
          </svg>
        </div>

        <div className="bc__text">
          <div className="bc__name bc__name--first">LAYTH</div>
          <div className="bc__name bc__name--last">AYACHE</div>
        </div>
      </div>
    </section>
  );
}
