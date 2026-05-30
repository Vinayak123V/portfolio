import React, { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function Magnetic({ children, strength = 0.5, className = "" }) {
  const ref = useRef(null);

  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const handleMouse = (e) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      
      x.set(middleX * strength);
      y.set(middleY * strength);
    };

    const reset = () => {
      x.set(0);
      y.set(0);
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouse);
      element.addEventListener("mouseleave", reset);
      return () => {
        element.removeEventListener("mousemove", handleMouse);
        element.removeEventListener("mouseleave", reset);
      };
    }
  }, [x, y, strength]);

  return (
    <motion.div ref={ref} style={{ position: "relative", x, y, display: "inline-flex", zIndex: 10 }} className={className}>
      {children}
    </motion.div>
  );
}
