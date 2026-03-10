import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import AboutProfile from "./components/AboutProfile";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Certificate from "./components/certificate";
import Contact from "./components/Contact";
import Navigation from "./components/Navigation";
import NotesPage from "./pages/NotesPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </Router>
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navigation activeSection={activeSection} />
      <Hero />
      <AboutProfile />
      <Education />
      <About />
      <Projects />
      <Certificate />
      <Contact />
    </>
  );
}

export default App;
