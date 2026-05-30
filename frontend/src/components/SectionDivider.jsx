import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export default function SectionDivider() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll tracking to draw the line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 10%"]
  });

  // Spring animation for smooth drawing
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div 
      ref={containerRef} 
      className="w-full flex justify-center items-center py-10 relative z-10 overflow-hidden"
    >
      {/* The background faint line */}
      <div className="absolute left-0 right-0 h-[1px] bg-white/5" />

      {/* The animated scroll-drawn line */}
      <motion.div 
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-secondary to-transparent shadow-[0_0_15px_rgba(162,155,254,0.5)] origin-center"
        style={{ scaleX }}
      />

      {/* Interactive Center Node */}
      <motion.div
        className="relative z-20 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.5, rotate: 180 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {/* Core Diamond */}
        <div className="w-4 h-4 rotate-45 bg-background border border-accent/50 flex items-center justify-center relative shadow-[0_0_20px_rgba(108,92,231,0.4)]">
          {/* Inner Glowing Dot */}
          <motion.div 
            className="w-1.5 h-1.5 bg-accent-secondary rounded-full"
            animate={{ 
              scale: isHovered ? [1, 2, 1] : 1,
              opacity: isHovered ? [1, 0.5, 1] : 1 
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        {/* Hover Flare Effect */}
        <motion.div 
          className="absolute inset-[-20px] bg-accent/20 blur-[15px] rounded-full mix-blend-screen pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
