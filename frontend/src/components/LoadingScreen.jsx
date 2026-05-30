import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    let frame = 0;
    const total = 60;
    const interval = setInterval(() => {
      frame++;
      const p = Math.min((frame / total) * 100, 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setPhase("reveal");
        setTimeout(() => {
          setPhase("done");
          setTimeout(() => setIsLoading(false), 600);
        }, 400);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "var(--bg-primary)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{
              opacity: phase === "done" ? 0 : 1,
              y: phase === "reveal" ? -10 : 0,
              scale: 1
            }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center" }}
          >
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                fontSize: "3rem",
                fontWeight: 700,
                color: "var(--accent-primary)",
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem"
              }}
            >
              Vinayak Hosur
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                color: "var(--text-muted)",
                fontSize: "1rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase"
              }}
            >
              Portfolio
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.1 }}
            style={{
              width: "200px",
              height: "2px",
              background: "var(--gradient-accent-h)",
              marginTop: "3rem",
              transformOrigin: "left",
              borderRadius: "2px",
              opacity: phase === "done" ? 0 : 1
            }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: "1rem",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              fontFamily: "monospace",
              opacity: phase === "done" ? 0 : 1
            }}
          >
            {Math.round(progress)}%
          </motion.p>

          {phase === "reveal" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute",
                width: 300,
                height: 300,
                background: "var(--accent-secondary)",
                filter: "blur(120px)",
                opacity: 0.15,
                borderRadius: "50%"
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
