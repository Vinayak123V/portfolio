import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import io from "socket.io-client";

export default function VisitorCounter() {
  const [visitors, setVisitors] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
  const springCount = useSpring(count, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("visitor-count", (val) => {
      setVisitors(val);
      count.set(val);
    });

    socket.on("online-users", setOnlineUsers);

    return () => socket.close();
  }, [count]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ x: -5, scale: 1.02 }}
      style={{
        position: "fixed",
        top: "90px",
        right: "20px",
        background: "var(--bg-card-solid)",
        padding: "1.2rem",
        borderRadius: "15px",
        border: "1px solid var(--border-medium)",
        zIndex: 99,
        minWidth: "160px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        style={{ marginBottom: "1rem" }}
      >
        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
          Total Visitors
        </div>
        <motion.div style={{
          fontSize: "1.8rem",
          fontWeight: "700",
          color: "var(--accent-primary)"
        }}>
          {rounded}
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
          Online Now
        </div>
        <div style={{
          fontSize: "1.4rem",
          fontWeight: "700",
          color: "var(--accent-secondary)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "8px",
              height: "8px",
              background: "var(--accent-secondary)",
              borderRadius: "50%",
              display: "inline-block"
            }}
          />
          {onlineUsers}
        </div>
      </motion.div>
    </motion.div>
  );
}
