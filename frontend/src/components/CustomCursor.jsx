import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Outer circle (trail)
  const trailX = useSpring(cursorX, { stiffness: 100, damping: 20, mass: 0.5 });
  const trailY = useSpring(cursorY, { stiffness: 100, damping: 20, mass: 0.5 });
  
  // Second trailing element for extra cinematic effect
  const trailX2 = useSpring(cursorX, { stiffness: 50, damping: 25, mass: 1 });
  const trailY2 = useSpring(cursorY, { stiffness: 50, damping: 25, mass: 1 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('data-cursor') === 'pointer'
      ) {
        setIsHovering(true);
        setCursorType(target.getAttribute('data-cursor-type') || "pointer");
      } else {
        setIsHovering(false);
        setCursorType("default");
      }
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "var(--accent-primary)",
          boxShadow: "0 0 10px var(--accent-primary), 0 0 20px var(--accent-secondary)",
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
          transition: "scale 0.2s, opacity 0.2s"
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          border: isHovering ? "1px solid rgba(162, 155, 254, 0.8)" : "1px solid rgba(108, 92, 231, 0.4)",
          backgroundColor: isHovering ? "rgba(162, 155, 254, 0.1)" : "transparent",
          backdropFilter: isHovering ? "blur(4px)" : "none",
          transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), border 0.3s, background-color 0.3s"
        }}
      >
        {isHovering && cursorType === 'view' && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] uppercase font-bold tracking-widest text-foreground">View</span>
        )}
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997] blur-[8px]"
        style={{
          x: trailX2,
          y: trailY2,
          translateX: "-50%",
          translateY: "-50%",
          width: 80,
          height: 80,
          backgroundColor: "rgba(108, 92, 231, 0.05)",
        }}
      />
    </>
  );
}
