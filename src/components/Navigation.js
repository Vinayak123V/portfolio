import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navigation({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const sections = [
    { id: "hero", label: "Home", icon: "🏠" },
    { id: "about-profile", label: "About", icon: "👨‍💻" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "about", label: "Skills", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "💼" }
  ];

  const moreItems = [
    { name: "Certifications", id: "certificate", type: "scroll", icon: "🏆" },
    { name: "Contact", id: "contact", type: "scroll", icon: "📧" },
    { name: "Notes", id: "/notes", type: "link", icon: "📝" }
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
          ? "#fff" 
          : "linear-gradient(135deg, #F6E4E1, #EAF6EF, #E1F0FB )",
        backdropFilter: "blur(15px)",
        padding: scrolled ? "0.8rem 5%" : "1.2rem 5%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 100,
        borderBottom: scrolled ? "1px solid #00ff88" : "1px solid rgba(255, 255, 255, 0.1)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: scrolled 
          ? "0 8px 32px rgba(0, 255, 136, 0.1)" 
          : "0 4px 20px rgba(0, 0, 0, 0.3)"
      }}
    >
      {/* Logo */}
      <motion.div
       
        
      >
        <motion.span
          animate={{ 
            textShadow: [
              "0 0 5px rgba(0, 255, 136, 0.5)",
              "0 0 10px rgba(0, 255, 136, 0.8)",
              "0 0 5px rgba(0, 255, 136, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: "#00ff88" }}
        >
          
        
        </motion.span>
      
       
      </motion.div>

      {/* Navigation Items */}
      <div style={{
        display: "flex",
        gap: "2rem",
        alignItems: "center"
      }}>
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
                ? "linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 212, 255, 0.2) 100%)"
                : "transparent",
              border: activeSection === section.id 
                ? "1px solid rgba(0, 255, 136, 0.3)"
                : "1px solid transparent",
              padding: "0.6rem 1.2rem",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: "600",
              color: activeSection === section.id ? "#00ff88" : "#888",
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
              style={{ fontSize: "1rem" }}
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
                  background: "#00ff88",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px rgba(0, 255, 136, 0.8)"
                }}
              />
            )}
          </motion.button>
        ))}

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
                ? "linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 212, 255, 0.2) 100%)"
                : "transparent",
              border: openMore 
                ? "1px solid rgba(0, 255, 136, 0.3)"
                : "1px solid rgba(255, 255, 255, 0.1)",
              padding: "0.6rem 1.2rem",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: "600",
              color: openMore ? "#00ff88" : "#888",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <motion.span
              animate={{ rotate: openMore ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ⚡
            </motion.span>
            More
            <motion.span
              animate={{ rotate: openMore ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: "0.8rem" }}
            >
              ▼
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
                  background: "rgba(26, 26, 26, 0.95)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "15px",
                  minWidth: "220px",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 255, 136, 0.1)",
                  border: "1px solid rgba(0, 255, 136, 0.2)",
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
                        color: "#aaa",
                        textDecoration: "none",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        borderBottom: i < moreItems.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)";
                        e.target.style.color = "#00ff88";
                        e.target.style.transform = "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "#aaa";
                        e.target.style.transform = "translateX(0)";
                      }}
                    >
                      <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
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
                        color: "#aaa",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        borderBottom: i < moreItems.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)";
                        e.target.style.color = "#00ff88";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "#aaa";
                      }}
                    >
                      <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                      {item.name}
                    </motion.div>
                  )
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}

