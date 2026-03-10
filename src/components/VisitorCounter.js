import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import io from "socket.io-client";

export default function VisitorCounter() {
  const [visitors, setVisitors] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("visitor-count", (count) => {
      setVisitors(count);
    });

    socket.on("online-users", (count) => {
      setOnlineUsers(count);
    });

    return () => socket.close();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      style={{
        position: "fixed",
        top: "90px",
        right: "20px",
        background: "#1a1a1a",
        padding: "1.2rem",
        borderRadius: "15px",
        border: "1px solid #222",
        zIndex: 99,
        minWidth: "160px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)"
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.3rem" }}>
          Total Visitors
        </div>
        <div style={{
          fontSize: "1.8rem",
          fontWeight: "700",
          color: "#00ff88"
        }}>
          {visitors.toLocaleString()}
        </div>
      </div>
      <div>
        <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.3rem" }}>
          Online Now
        </div>
        <div style={{
          fontSize: "1.4rem",
          fontWeight: "700",
          color: "#00d4ff",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <span style={{
            width: "8px",
            height: "8px",
            background: "#00d4ff",
            borderRadius: "50%",
            animation: "pulse 2s infinite"
          }} />
          {onlineUsers}
        </div>
      </div>
    </motion.div>
  );
}
