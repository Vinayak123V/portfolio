import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FadeUp({ children, delay = 0, duration = 0.5, y = 40, style, ...props }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: "easeOut" }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
