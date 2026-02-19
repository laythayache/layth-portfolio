import { useEffect, useMemo, useState } from "react";

interface UseScrollSpyOptions {
  rootMargin?: string;
  threshold?: number | number[];
  initialActive?: string;
}

/**
 * Returns the id of the section most visible in the viewport.
 */
export default function useScrollSpy(
  ids: readonly string[],
  {
    rootMargin = "-35% 0px -55% 0px",
    threshold = [0.2, 0.4, 0.6, 0.8],
    initialActive = "",
  }: UseScrollSpyOptions = {}
) {
  const [activeId, setActiveId] = useState(initialActive);
  const idsKey = useMemo(() => ids.join("|"), [ids]);

  useEffect(() => {
    if (!ids.length) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin, threshold }
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [ids, idsKey, rootMargin, threshold]);

  return activeId;
}
