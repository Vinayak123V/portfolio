import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { HomeIcon, UserIcon, GraduationIcon, BoltIcon, BriefcaseIcon, TrophyIcon, EnvelopeIcon, NoteIcon, ChevronDownIcon, PaletteIcon } from "./SvgIcons";

export default function Navigation({ activeSection }) {
  const { theme, cycleTheme, themes } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    { id: "hero", label: "Home", icon: <HomeIcon /> },
    { id: "about-profile", label: "About", icon: <UserIcon /> },
    { id: "education", label: "Education", icon: <GraduationIcon /> },
    { id: "about", label: "Skills", icon: <BoltIcon /> },
    { id: "projects", label: "Projects", icon: <BriefcaseIcon /> }
  ];

  const moreItems = [
    { name: "Certifications", id: "certificate", type: "scroll", icon: <TrophyIcon /> },
    { name: "Contact", id: "contact", type: "scroll", icon: <EnvelopeIcon /> },
    { name: "Notes", id: "/notes", type: "link", icon: <NoteIcon /> }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest('.more-dropdown')) {
        setOpenMore(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setOpenMore(false);
  };

  const handleMoreItemClick = (item) => {
    if (item.type === "scroll") {
      scrollToSection(item.id);
    }
    setOpenMore(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: scrolled 
          ? "var(--bg-nav)" 
          : "transparent",
        backdropFilter: "blur(15px)",
        padding: scrolled ? "0.8rem 5%" : "1.2rem 5%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 100,
        borderBottom: scrolled ? "1px solid var(--border-nav)" : "1px solid var(--border-medium)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: scrolled 
          ? "var(--shadow-nav)" 
          : "var(--shadow-default)"
      }}
    >
      {/* Logo */}
      <motion.div
       
        
      >
        <motion.span
          animate={{ 
            textShadow: [
              "0 0 5px var(--gradient-modal-shadow)",
              "0 0 10px var(--shadow-hero-glow)",
              "0 0 5px var(--gradient-modal-shadow)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: "var(--accent-primary)" }}
        >
          
        
        </motion.span>
      
       
      </motion.div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center gap-4">
        <motion.button
          onClick={cycleTheme}
          whileHover={{ scale: 1.05, rotate: 30 }}
          whileTap={{ scale: 0.9 }}
          title={`Theme: ${themes.find(t => t.id === theme)?.label || theme}`}
          style={{
            background: "transparent",
            border: "1px solid var(--border-medium)",
            padding: "0.5rem",
            borderRadius: "50%",
            color: "var(--accent-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          <PaletteIcon />
        </motion.button>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-foreground"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Desktop Navigation Items */}
      <div className="hidden md:flex items-center" style={{ gap: "2rem" }}>
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
            onClick={() => scrollToSection(section.id)}
            onMouseEnter={() => setHoveredItem(section.id)}
            onMouseLeave={() => setHoveredItem(null)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: activeSection === section.id 
                ? "var(--gradient-nav-active)"
                : "transparent",
              border: activeSection === section.id 
                ? "1px solid var(--border-nav)"
                : "1px solid transparent",
              padding: "0.6rem 1.2rem",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: "600",
              color: activeSection === section.id ? "var(--accent-primary)" : "var(--text-nav)",
              position: "relative",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <motion.span
              animate={{ 
                rotate: hoveredItem === section.id ? 360 : 0,
                scale: hoveredItem === section.id ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: "1rem", display: "flex", alignItems: "center" }}
            >
              {section.icon}
            </motion.span>
            {section.label}
            
            {activeSection === section.id && (
              <motion.div
                layoutId="activeIndicator"
                style={{
                  position: "absolute",
                  bottom: "-2px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "6px",
                  height: "6px",
                  background: "var(--accent-primary)",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px var(--accent-primary)"
                }}
              />
            )}
          </motion.button>
        ))}

        {/* Theme Toggle */}
        <motion.button
          onClick={cycleTheme}
          whileHover={{ scale: 1.05, rotate: 30 }}
          whileTap={{ scale: 0.9 }}
          title={`Theme: ${themes.find(t => t.id === theme)?.label || theme}`}
          style={{
            background: "transparent",
            border: "1px solid var(--border-medium)",
            padding: "0.6rem",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1.1rem",
            color: "var(--accent-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          <PaletteIcon />
        </motion.button>

        {/* More Dropdown */}
        <div className="more-dropdown" style={{ position: "relative" }}>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMore(!openMore);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: openMore 
                ? "var(--gradient-nav-active)"
                : "transparent",
              border: openMore 
                ? "1px solid var(--border-nav)"
                : "1px solid var(--border-medium)",
              padding: "0.6rem 1.2rem",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: "600",
              color: openMore ? "var(--accent-primary)" : "var(--text-nav)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <motion.span
              animate={{ rotate: openMore ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <BoltIcon />
            </motion.span>
            More
            <motion.span
              animate={{ rotate: openMore ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}
            >
              <ChevronDownIcon />
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {openMore && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  top: "60px",
                  right: 0,
                  background: "var(--bg-dropdown)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "15px",
                  minWidth: "220px",
                  boxShadow: "var(--shadow-nav), 0 0 0 1px var(--gradient-modal-border)",
                  border: "1px solid var(--border-nav)",
                  overflow: "hidden"
                }}
              >
                {moreItems.map((item, i) => (
                  item.type === "link" ? (
                    <Link
                      key={i}
                      to={item.id}
                      onClick={() => setOpenMore(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "1rem 1.5rem",
                        color: "var(--text-muted-light)",
                        textDecoration: "none",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        borderBottom: i < moreItems.length - 1 ? "1px solid var(--border-light)" : "none"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "var(--gradient-nav-active)";
                        e.target.style.color = "var(--accent-primary)";
                        e.target.style.transform = "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "var(--text-muted-light)";
                        e.target.style.transform = "translateX(0)";
                      }}
                    >
                      <span style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", color: "var(--accent-primary)" }}>{item.icon}</span>
                      {item.name}
                    </Link>
                  ) : (
                    <motion.div
                      key={i}
                      onClick={() => handleMoreItemClick(item)}
                      whileHover={{ x: 5 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "1rem 1.5rem",
                        cursor: "pointer",
                        color: "var(--text-muted-light)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        borderBottom: i < moreItems.length - 1 ? "1px solid var(--border-light)" : "none"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "var(--gradient-nav-active)";
                        e.target.style.color = "var(--accent-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "var(--text-muted-light)";
                      }}
                    >
                      <span style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", color: "var(--accent-primary)" }}>{item.icon}</span>
                      {item.name}
                    </motion.div>
                  )
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "var(--bg-nav)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border-nav)",
              padding: "1rem 5%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}
            className="md:hidden"
          >
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => { scrollToSection(section.id); setMobileMenuOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.8rem 1rem",
                  borderRadius: "15px",
                  background: activeSection === section.id ? "var(--gradient-nav-active)" : "transparent",
                  color: activeSection === section.id ? "var(--accent-primary)" : "var(--text-nav)",
                  border: activeSection === section.id ? "1px solid var(--border-nav)" : "1px solid transparent",
                  fontSize: "1rem",
                  fontWeight: "600"
                }}
              >
                <span style={{ fontSize: "1.2rem", display: "flex", alignItems: "center" }}>{section.icon}</span>
                {section.label}
              </button>
            ))}
            <div style={{ height: "1px", background: "var(--border-medium)", margin: "0.5rem 0" }} />
            {moreItems.map((item, i) => (
              item.type === "link" ? (
                <Link
                  key={i}
                  to={item.id}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.8rem 1rem",
                    color: "var(--text-muted-light)",
                    textDecoration: "none",
                    fontWeight: "500"
                  }}
                >
                  <span style={{ fontSize: "1.2rem", color: "var(--accent-primary)", display: "flex", alignItems: "center" }}>{item.icon}</span>
                  {item.name}
                </Link>
              ) : (
                <button
                  key={i}
                  onClick={() => { handleMoreItemClick(item); setMobileMenuOpen(false); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.8rem 1rem",
                    color: "var(--text-muted-light)",
                    background: "transparent",
                    border: "none",
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    fontWeight: "500",
                    fontFamily: "inherit"
                  }}
                >
                  <span style={{ fontSize: "1.2rem", color: "var(--accent-primary)", display: "flex", alignItems: "center" }}>{item.icon}</span>
                  {item.name}
                </button>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

