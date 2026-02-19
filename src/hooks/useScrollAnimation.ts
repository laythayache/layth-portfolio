import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollAnimationFactory<T extends Element> = (context: {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  scope: T;
}) => void | (() => void);

export function useScrollAnimation<T extends Element>(
  scopeRef: RefObject<T>,
  createAnimation: ScrollAnimationFactory<T>,
  enabled = true
): void {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!enabled || !scope) {
      return;
    }

    let cleanup: void | (() => void);

    const context = gsap.context(() => {
      cleanup = createAnimation({ gsap, ScrollTrigger, scope });
    }, scope);

    ScrollTrigger.refresh();

    return () => {
      cleanup?.();
      context.revert();
    };
  }, [enabled, scopeRef, createAnimation]);
}
