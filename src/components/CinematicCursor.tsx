import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMediaQuery } from "@/motion/useMediaQuery";

function asHTMLElement(value: EventTarget | null): HTMLElement | null {
  return value instanceof HTMLElement ? value : null;
}

function clampLabel(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length <= 28) return trimmed;
  return `${trimmed.slice(0, 27)}…`;
}

function resolveIntentLabel(element: HTMLElement): string {
  const explicit = element.dataset.cursorLabel;
  if (explicit) return clampLabel(explicit);

  const aria = element.getAttribute("aria-label")?.trim();
  if (aria) return clampLabel(aria);

  const text = element.textContent?.trim();
  if (text) return clampLabel(text);

  return "Interact";
}

export default function CinematicCursor() {
  const reduced = useReducedMotion();
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const enabled = !reduced && !coarsePointer;

  const [hovered, setHovered] = useState(false);
  const [magneticHover, setMagneticHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [intentLabel, setIntentLabel] = useState<string | null>(null);

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 580, damping: 36, mass: 0.22 });
  const y = useSpring(pointerY, { stiffness: 580, damping: 36, mass: 0.22 });

  useEffect(() => {
    document.documentElement.classList.toggle("cursor-cinematic-active", enabled);
    return () => document.documentElement.classList.remove("cursor-cinematic-active");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    let activeMagnet: HTMLElement | null = null;

    const clearMagnet = (element: HTMLElement) => {
      element.style.translate = "";
      element.style.willChange = "";
      element.style.transition = "";
    };

    const applyMagnet = (element: HTMLElement, event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      const moveX = offsetX * 0.28;
      const moveY = offsetY * 0.28;

      element.style.willChange = "translate";
      element.style.transition = "translate 180ms cubic-bezier(0.22, 1, 0.36, 1)";
      element.style.translate = `${moveX}px ${moveY}px`;
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);

      const target = asHTMLElement(event.target);
      if (!target) {
        setHovered(false);
        setMagneticHover(false);
        setIntentLabel(null);
        if (activeMagnet) {
          clearMagnet(activeMagnet);
          activeMagnet = null;
        }
        return;
      }

      const interactiveTarget = target.closest<HTMLElement>(
        "a, button, [role='button'], [data-cursor='interactive']",
      );
      const magneticTarget = target.closest<HTMLElement>("[data-magnetic]");

      setHovered(Boolean(interactiveTarget));
      setIntentLabel(interactiveTarget ? resolveIntentLabel(interactiveTarget) : null);

      if (magneticTarget) {
        if (activeMagnet && activeMagnet !== magneticTarget) {
          clearMagnet(activeMagnet);
        }
        applyMagnet(magneticTarget, event);
        activeMagnet = magneticTarget;
        setMagneticHover(true);
      } else if (activeMagnet) {
        const rect = activeMagnet.getBoundingClientRect();
        const pad = 28;
        const inRange =
          event.clientX >= rect.left - pad &&
          event.clientX <= rect.right + pad &&
          event.clientY >= rect.top - pad &&
          event.clientY <= rect.bottom + pad;

        if (inRange) {
          applyMagnet(activeMagnet, event);
        } else {
          clearMagnet(activeMagnet);
          activeMagnet = null;
          setMagneticHover(false);
        }
      } else {
        setMagneticHover(false);
      }
    };

    const onPointerLeaveWindow = (event: PointerEvent) => {
      if (event.relatedTarget === null) {
        pointerX.set(-100);
        pointerY.set(-100);
        setHovered(false);
        setMagneticHover(false);
        setVisible(false);
        setIntentLabel(null);
        if (activeMagnet) {
          clearMagnet(activeMagnet);
          activeMagnet = null;
        }
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerLeaveWindow);
      if (activeMagnet) {
        clearMagnet(activeMagnet);
      }
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) {
    return null;
  }

  const frameScale = magneticHover ? 1.62 : hovered ? 1.34 : 1;
  const frameColor = hovered
    ? "rgb(var(--accent) / 0.88)"
    : "rgb(var(--text-secondary) / 0.66)";

  return (
    <>
      <motion.div
        className="cinematic-cursor-halo pointer-events-none fixed left-0 top-0 z-[118]"
        style={{ x, y }}
        animate={{
          opacity: !visible ? 0 : hovered ? 0.34 : 0.16,
          scale: magneticHover ? 1.45 : hovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />

      <motion.div
        className="cinematic-cursor-frame pointer-events-none fixed left-0 top-0 z-[120]"
        style={{ x, y, color: frameColor }}
        animate={{
          scale: visible ? frameScale : 0.88,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <span className="cinematic-cursor-corner cinematic-cursor-corner--tl" />
        <span className="cinematic-cursor-corner cinematic-cursor-corner--tr" />
        <span className="cinematic-cursor-corner cinematic-cursor-corner--bl" />
        <span className="cinematic-cursor-corner cinematic-cursor-corner--br" />
      </motion.div>

      <motion.div
        className="cinematic-cursor-core pointer-events-none fixed left-0 top-0 z-[121]"
        style={{ x, y }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: magneticHover ? 0.72 : hovered ? 0.86 : 1,
        }}
        transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />

      <motion.div
        className="cinematic-cursor-chip pointer-events-none fixed left-0 top-0 z-[122]"
        style={{ x, y }}
        animate={{
          opacity: hovered && intentLabel && visible ? 0.96 : 0,
        }}
        transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        {intentLabel ?? "Interact"}
      </motion.div>
    </>
  );
}
