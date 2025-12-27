import { motion, useScroll, useTransform } from "framer-motion";
import Emblem from "@/components/UI/Emblem";

const TravelingLogo = () => {
  const { scrollY } = useScroll();

  // Map scroll position to logo position and scale
  const top = useTransform(scrollY, [0, 300], ["50%", "36px"]);
  const left = useTransform(scrollY, [0, 300], ["50%", "24px"]);
  const x = useTransform(scrollY, [0, 300], ["-50%", "0%"]);
  const y = useTransform(scrollY, [0, 300], ["-50%", "0%"]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.35]);
  const opacity = useTransform(scrollY, [200, 300], [1, 0]);

  return (
    <motion.div
      className="fixed z-40 pointer-events-none"
      style={{
        top,
        left,
        x,
        y,
        scale,
        opacity,
      }}
    >
      <Emblem size="centered" />
    </motion.div>
  );
};

export default TravelingLogo;
