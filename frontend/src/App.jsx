import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import Hero from "./components/Hero";
import Hero3DScene from "./components/Hero3DScene";
import SectionDivider from "./components/SectionDivider";
import Skills3D from "./components/Skills3D";
import AboutProfile from "./components/AboutProfile";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Certificate from "./components/certificate";
import Contact from "./components/Contact";
import CommandPalette from "./components/CommandPalette";
import AiWidget from "./components/AiWidget";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import NotesPage from "./pages/NotesPage";
import ProjectPage from "./pages/ProjectPage";
import io from "socket.io-client";
import "./App.css";
import Lenis from "lenis";

// Connect to backend immediately when portfolio loads - send browser info
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const ua = navigator.userAgent;
const browser = /Chrome/.test(ua) && !/Edg/.test(ua) ? "Chrome"
  : /Firefox/.test(ua) ? "Firefox"
  : /Safari/.test(ua) && !/Chrome/.test(ua) ? "Safari"
  : /Edg/.test(ua) ? "Edge" : "Other";

const os = /Windows/.test(ua) ? "Windows"
  : /Android/.test(ua) ? "Android"
  : /iPhone|iPad/.test(ua) ? "iOS"
  : /Mac/.test(ua) ? "MacOS"
  : /Linux/.test(ua) ? "Linux" : "Unknown";

// Fetch location then connect ONCE
fetch("https://ipapi.co/json/")
  .then(r => r.json())
  .then(d => {
    io(BACKEND_URL, {
      query: {
        browser, os,
        language: navigator.language || "Unknown",
        screenSize: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
        referrer: document.referrer || "Direct",
        city: d.city || "Unknown",
        country: d.country_name || "Unknown"
      }
    });
  })
  .catch(() => {
    io(BACKEND_URL, {
      query: {
        browser, os,
        language: navigator.language || "Unknown",
        screenSize: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
        referrer: document.referrer || "Direct",
        city: "Unknown",
        country: "Unknown"
      }
    });
  });

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/project/:id" element={<ProjectPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function HomePage() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about-profile",
        "education",
        "about",
        "projects",
        "certificate",
        "contact"
      ];

      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);

        if (element) {
          const { offsetTop, offsetHeight } = element;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  const scrollProgress = useMotionValue(0);
  const progressWidth = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.set(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, [scrollProgress]);

  return (
    <>
      <Hero3DScene />
      <motion.div style={{
        position: "fixed", top: 0, left: 0, height: "3px",
        background: "var(--gradient-accent-h)", zIndex: 1000,
        width: progressWidth, transformOrigin: "left"
      }} />
      <Navigation activeSection={activeSection} />
      <Hero />
      <SectionDivider />
      <AboutProfile />
      <SectionDivider />
      <Education />
      <SectionDivider />
      <Skills3D />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Certificate />
      <SectionDivider />
      <Contact />
      <CommandPalette />
      <AiWidget />
      <AnimatePresence>
        {activeSection !== "hero" && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              position: "fixed", bottom: "90px", right: "30px",
              width: "44px", height: "44px", borderRadius: "12px",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(24px)",
              color: "var(--accent-primary)", border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              fontSize: "1.2rem", zIndex: 99,
              boxShadow: "0 5px 20px rgba(0,0,0,0.3)"
            }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
