import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { HomeIcon, UserIcon, GraduationIcon, BoltIcon, BriefcaseIcon, TrophyIcon, EnvelopeIcon, NoteIcon, PaletteIcon } from "./SvgIcons";

const dockItems = [
  { id: "hero", label: "Home", icon: <HomeIcon /> },
  { id: "about-profile", label: "About", icon: <UserIcon /> },
  { id: "education", label: "Education", icon: <GraduationIcon /> },
  { id: "about", label: "Skills", icon: <BoltIcon /> },
  { id: "projects", label: "Projects", icon: <BriefcaseIcon /> },
  { id: "certificate", label: "Cert", icon: <TrophyIcon /> },
  { id: "contact", label: "Contact", icon: <EnvelopeIcon /> },
  { id: "/notes", label: "Notes", icon: <NoteIcon />, isLink: true },
];

export default function DockNavigation() {
  const { theme, cycleTheme } = useTheme();
  const location = useLocation();
  const [hoveredId, setHoveredId] = useState(null);
  const isHome = location.pathname === "/";

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleClick = (item) => {
    if (item.isLink) return;
    scrollToSection(item.id);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6, type: "spring", stiffness: 100 }}
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "8px 12px",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
      }}
    >
      {dockItems.map((item) => {
        const isActive = isHome
          ? false
          : item.isLink && location.pathname === item.id;
        const scale = hoveredId === item.id ? 1.35 : 1;

        return item.isLink ? (
          <Link key={item.id} to={item.id}>
            <motion.div
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              animate={{
                scale,
                y: hoveredId === item.id ? -8 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15
              }}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--accent-primary)",
                fontSize: "1.2rem",
                background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                position: "relative",
                transition: "background 0.2s"
              }}
            >
              {item.icon}
              <Tooltip visible={hoveredId === item.id} label={item.label} />
            </motion.div>
          </Link>
        ) : (
          <motion.div
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleClick(item)}
            animate={{
              scale,
              y: hoveredId === item.id ? -8 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15
            }}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--accent-primary)",
              fontSize: "1.2rem",
              position: "relative",
              transition: "background 0.2s"
            }}
          >
            {item.icon}
            <Tooltip visible={hoveredId === item.id} label={item.label} />
          </motion.div>
        );
      })}

      {/* Separator */}
      <div style={{
        width: "1px",
        height: "28px",
        background: "rgba(255,255,255,0.1)",
        margin: "0 4px"
      }} />

      {/* Theme Toggle */}
      <motion.div
        onClick={cycleTheme}
        onMouseEnter={() => setHoveredId("theme")}
        onMouseLeave={() => setHoveredId(null)}
        animate={{
          scale: hoveredId === "theme" ? 1.35 : 1,
          y: hoveredId === "theme" ? -8 : 0,
          rotate: hoveredId === "theme" ? 30 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15
        }}
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--accent-primary)",
          fontSize: "1.2rem",
          position: "relative"
        }}
      >
        <PaletteIcon />
        <Tooltip visible={hoveredId === "theme"} label="Theme" />
      </motion.div>
    </motion.div>
  );
}

function Tooltip({ visible, label }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.15 }}
      style={{
        position: "absolute",
        top: "-32px",
        padding: "4px 10px",
        borderRadius: "6px",
        fontSize: "0.75rem",
        fontWeight: 600,
        background: "rgba(0,0,0,0.8)",
        color: "#fff",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        backdropFilter: "blur(8px)"
      }}
    >
      {label}
    </motion.span>
  );
}
