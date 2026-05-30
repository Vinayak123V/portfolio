import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import CustomCursor from "../components/CustomCursor";

export default function NotesPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedNote, setSelectedNote] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const notes = [
    {
      title: "C Programming Fundamentals",
      category: "C Programming",
      description: "Comprehensive introduction to C programming including variables, data types, loops, functions, pointers, and memory management used in system programming",
      date: "Jan 2025",
      color: "#5C6BC0",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      pdfUrl: "/C NOTES.pdf"
    },
    {
      title: "React Core Concepts",
      category: "React",
      description: "Learn React fundamentals including components, props, state management, hooks, routing, and performance optimization techniques.",
      date: "Dec 2024",
      color: "#61dafb",
      gradient: "linear-gradient(135deg, #61dafb 0%, #21a1c4 100%)",
      imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      pdfUrl: "/React.js.pdf"
    },
    {
      title: "Java Programming Basics",
      category: "Java",
      description: "Overview of Java programming concepts including OOP principles, classes, inheritance, polymorphism, exception handling, and collections.",
      date: "Nov 2024",
      color: "#f89820",
      gradient: "linear-gradient(135deg, #f89820 0%, #c74634 100%)",
      imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      pdfUrl: "/Java.pdf"
    },
    {
      title: "DSA Core Concepts",
      category: "DSA",
      description: "Important data structures and algorithm techniques used for coding interviews including arrays, linked lists, stacks, queues, trees, and sorting algorithms.",
      date: "Oct 2024",
      color: "#4db33d",
      gradient: "linear-gradient(135deg, #4db33d 0%, #2d7a1f 100%)",
      imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      pdfUrl: "/DSA.pdf"
    },
    {
      title: "CSS Grid & Flexbox",
      category: "CSS",
      description: "Explore CSS styling techniques including Flexbox, Grid, responsive design, animations, and layout best practices",
      date: "Sep 2024",
      color: "#264de4",
      gradient: "linear-gradient(135deg, #264de4 0%, #1a3bb3 100%)",
      imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      pdfUrl: "/CSS.pdf"
    },
    {
      title: "Python Programming Essentials",
      category: "Python",
      description: "Introduction to Python programming including variables, data types, loops, functions, object-oriented programming, and libraries used in data science and automation",
      date: "Aug 2024",
      color: "#3776ab",
      gradient: "linear-gradient(135deg, #3776ab 0%, #ffd343 100%)",
      imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      pdfUrl: "/Python.pdf"
    },
    {
      title: "Git Version Control Basics",
      category: "Git",
      description: "Learn Git fundamentals including repositories, commits, branches, merging, and collaboration using GitHub",
      date: "Jul 2024",
      color: "#f05032",
      gradient: "linear-gradient(135deg, #f05032 0%, #c9302c 100%)",
      imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      pdfUrl: "/Git Notes.pdf"
    },
    {
      title: "SQL Database Fundamentals",
      category: "SQL",
      description: "Learn SQL queries used for managing relational databases including SELECT, JOIN, filtering data, indexing, and optimization",
      date: "Jun 2024",
      color: "#00758f",
      gradient: "linear-gradient(135deg, #00758f 0%, #005f73 100%)",
      imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      pdfUrl: "/SQL Notes.pdf"
    },
    {
      title: "JavaScript ES6+ Features",
      category: "JavaScript",
      description: "Comprehensive guide to modern JavaScript features including arrow functions, destructuring, promises, modules, and async/await",
      date: "May 2024",
      color: "#f7df1e",
      gradient: "linear-gradient(135deg, #f7df1e 0%, #e6c200 100%)",
      imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      pdfUrl: "/JavaScript.pdf"
    }
  ];

  const categories = ["all", "JavaScript", "React", "Java", "DSA", "CSS", "Python", "Git", "SQL", "C Programming"];
  const filteredNotes = selectedCategory === "all" 
    ? notes 
    : notes.filter(note => note.category === selectedCategory);

  return (
    <>
      <CustomCursor />
      <div className="relative min-h-screen overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent-secondary/10 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px]" />
        </div>

        {/* Navigation */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 px-[5%] py-4 transition-all duration-300"
          style={{
            background: scrolled ? "var(--bg-nav)" : "transparent",
            backdropFilter: scrolled ? "blur(15px)" : "none",
            borderBottom: scrolled ? "1px solid var(--border-nav)" : "1px solid transparent",
            boxShadow: scrolled ? "var(--shadow-nav)" : "none"
          }}
        >
          <div className="max-w-[1400px] mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-foreground">Notes</span>
              <span className="text-accent ml-2">📚</span>
            </Link>
            
            <Link 
              to="/" 
              className="px-6 py-3 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-full text-foreground font-semibold transition-all duration-300 backdrop-blur-md hover:scale-105"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-[5%] z-10">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block px-6 py-2 mb-6 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md"
              >
                <span className="text-sm font-medium tracking-wide text-accent uppercase">
                  Knowledge Base
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-6">
                Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-secondary to-accent">Notes</span>
              </h1>
              
              <p className="text-lg md:text-xl text-text-muted max-w-[700px] mx-auto leading-relaxed">
                A curated collection of insights, tips, and best practices from my development journey.
                Explore comprehensive notes on various technologies and concepts.
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex justify-center gap-3 mb-16 flex-wrap"
            >
              {categories.map((cat, index) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 backdrop-blur-md"
                  style={{
                    background: selectedCategory === cat 
                      ? "var(--accent)" 
                      : "rgba(255, 255, 255, 0.05)",
                    color: selectedCategory === cat 
                      ? "var(--foreground)" 
                      : "var(--text-muted)",
                    border: `2px solid ${selectedCategory === cat ? "var(--accent)" : "var(--border-medium)"}`,
                    boxShadow: selectedCategory === cat 
                      ? "0 0 20px var(--accent)" 
                      : "none"
                  }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  {selectedCategory === cat && (
                    <span className="ml-2 opacity-70">
                      ({cat === "all" ? notes.length : notes.filter(n => n.category === cat).length})
                    </span>
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Notes Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredNotes.map((note, index) => (
                  <NoteCard 
                    key={note.title} 
                    note={note} 
                    index={index} 
                    inView={inView} 
                    onReadMore={() => setSelectedNote(note)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* PDF Modal */}
        <AnimatePresence>
          {selectedNote && (
            <PDFModal note={selectedNote} onClose={() => setSelectedNote(null)} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function NoteCard({ note, index, inView, onReadMore }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5,
        layout: { duration: 0.3 }
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onReadMore}
      className="relative group cursor-pointer flex flex-col"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        padding: "2rem",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
        overflow: "hidden"
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: note.gradient,
          filter: "blur(80px)",
          transform: "scale(1.5)"
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500"
        style={{
          background: note.color,
          filter: "blur(40px)"
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div>
          {/* Icon */}
          <motion.div
            animate={{ 
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.2 : 1
            }}
            transition={{ duration: 0.5 }}
            className="mb-6 h-14 flex items-center"
          >
            <img src={note.imageSrc} alt={note.title} className="h-12 w-12 object-contain drop-shadow-lg" />
          </motion.div>

          {/* Category & Date */}
          <div className="flex justify-between items-center mb-4">
            <span 
              className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300"
              style={{
                background: isHovered ? `${note.color}40` : `${note.color}20`,
                color: isHovered ? '#fff' : note.color,
                border: `1px solid ${note.color}40`
              }}
            >
              {note.category}
            </span>
            <span className="text-xs text-text-muted font-medium group-hover:text-white/80 transition-colors">
              {note.date}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-white transition-colors">
            {note.title}
          </h3>

          {/* Description */}
          <p className="text-text-muted leading-relaxed mb-6 line-clamp-3 group-hover:text-white/90 transition-colors">
            {note.description}
          </p>
        </div>

        {/* Read More Button */}
        <div className="mt-auto pt-4">
          <motion.button
            className="px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 w-fit"
            style={{
              background: isHovered ? note.color : 'rgba(255, 255, 255, 0.05)',
              color: isHovered ? '#fff' : note.color,
              border: `1px solid ${isHovered ? note.color : `${note.color}50`}`,
              boxShadow: isHovered ? `0 0 20px ${note.color}60` : 'none'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Read More</span>
            <motion.span
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* 3D Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${note.color}20, transparent)`,
          border: `1px solid ${note.color}60`
        }}
      />
    </motion.div>
  );
}

function PDFModal({ note, onClose }) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = () => {
    setDownloading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloading(false);
            setProgress(0);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    try {
      const link = document.createElement("a");
      link.href = note.pdfUrl;
      link.download = `${note.title.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      clearInterval(interval);
      setDownloading(false);
      setProgress(0);
    }
  };

  const handleViewPDF = () => {
    window.open(note.pdfUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)"
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full rounded-3xl overflow-hidden"
        style={{
          background: "var(--bg-card)",
          backdropFilter: "blur(40px)",
          border: "1px solid var(--border-medium)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-foreground text-xl"
        >
          ✕
        </button>

        {/* Header with gradient */}
        <div 
          className="relative p-12 text-center overflow-hidden"
          style={{ background: note.gradient }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-20"
            style={{
              background: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "30px 30px"
            }}
          />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6 flex justify-center"
          >
            <img src={note.imageSrc} alt={note.title} className="h-20 w-20 object-contain drop-shadow-2xl" />
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-2">
            {note.title}
          </h2>

          <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-semibold">
            {note.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-text-muted leading-relaxed mb-8 text-center">
            {note.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewPDF}
              className="flex-1 py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                background: note.gradient,
                boxShadow: `0 10px 30px ${note.color}40`
              }}
            >
              <span className="text-xl">👁️</span>
              View PDF
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
              style={{
                background: downloading ? "#666" : "transparent",
                border: `2px solid ${note.color}`,
                color: downloading ? "white" : note.color
              }}
            >
              {downloading && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="absolute left-0 top-0 bottom-0 z-0"
                  style={{ background: note.color }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-xl">📥</span>
                {downloading ? `${progress}%` : "Download"}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
