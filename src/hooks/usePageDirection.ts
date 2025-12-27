import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Route ordering for timeline navigation (Past → Present → Future)
const ROUTE_ORDER = ["/completed", "/", "/ongoing", "/friends"];

export const usePageDirection = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = location.pathname;

    if (prevPath !== currentPath) {
      const prevIndex = ROUTE_ORDER.indexOf(prevPath);
      const currentIndex = ROUTE_ORDER.indexOf(currentPath);

      // Handle project routes - treat as forward navigation
      if (currentPath.startsWith("/projects/")) {
        setDirection(1);
      } else if (prevPath.startsWith("/projects/")) {
        setDirection(-1);
      } else if (prevIndex !== -1 && currentIndex !== -1) {
        setDirection(currentIndex > prevIndex ? 1 : -1);
      } else {
        // Default to forward for unknown routes
        setDirection(1);
      }

      prevPathRef.current = currentPath;
    }
  }, [location.pathname]);

  return { direction, pathname: location.pathname };
};

export default usePageDirection;
