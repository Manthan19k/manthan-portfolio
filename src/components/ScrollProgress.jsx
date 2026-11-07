import { motion, useScroll, useSpring } from "framer-motion";
import "./ScrollProgress.css";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="scroll-hairline-track" aria-hidden="true">
      <motion.div
        className="scroll-hairline-bar"
        style={{ scaleX, transformOrigin: "0%" }}
      />
    </div>
  );
}
