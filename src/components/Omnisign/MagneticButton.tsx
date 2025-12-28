import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, ReactNode, useEffect, useState } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const MagneticButton = ({ children, href, className = "", onClick }: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Disable on touch devices or reduced motion
    if (prefersReducedMotion || isTouchDevice || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
    if (distance < 80) {
      const strength = (80 - distance) / 80;
      x.set(distanceX * strength * 0.3);
      y.set(distanceY * strength * 0.3);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? 'a' : 'button';
  const props = href ? { href } : { onClick, type: 'button' as const };

  // Disable magnetic effect on touch devices
  const shouldDisableMagnetic = prefersReducedMotion || isTouchDevice;

  return (
    <motion.div
      style={{
        x: shouldDisableMagnetic ? 0 : xSpring,
        y: shouldDisableMagnetic ? 0 : ySpring,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Component
        ref={ref as any}
        className={className}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
};

export default MagneticButton;

