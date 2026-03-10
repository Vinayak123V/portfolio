import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NotesPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedNote, setSelectedNote] = useState(null);

  const notes = [
    {
      title: "C Programming Fundamentals",
      category: "C Programming",
      description: "Comprehensive introduction to C programming including variables, data types, loops, functions, pointers, and memory management used in system programming",
      date: "Jan 2025",
      color: "#f7df1e",
      pdfUrl: "/C NOTES.pdf"
    },
    {
      title: "React Core Concepts",
      category: "React",
      description: "Learn React fundamentals including components, props, state management, hooks, routing, and performance optimization techniques.",
      date: "Dec 2024",
      color: "#61dafb",
      pdfUrl: "/React.js.pdf"
    },
    {
      title: "Java Programming Basics",
      category: "Java",
      description: "Overview of Java programming concepts including OOP principles, classes, inheritance, polymorphism, exception handling, and collections.",
      date: "Nov 2024",
      color: "#68a063",
      pdfUrl: "/Java.pdf"
    },
    {
      title: "DSA Core Concepts",
      category: "DSA",
      description: "Important data structures and algorithm techniques used for coding interviews including arrays, linked lists, stacks, queues, trees, and sorting algorithms.",
      date: "Oct 2024",
      color: "#4db33d",
      pdfUrl: "/DSA.pdf"
    },
    {
      title: "CSS Grid & Flexbox",
      category: "CSS",
      description: "Explore CSS styling techniques including Flexbox, Grid, responsive design, animations, and layout best practices",
      date: "Sep 2024",
      color: "#264de4",
      pdfUrl: "/CSS.pdf"
    },
    {
      title: "Python Programming Essentials",
      category: "Python",
      description: "Introduction to Python programming including variables, data types, loops, functions, object-oriented programming, and libraries used in data science and automation",
      date: "Aug 2024",
      color: "#68a063",
      pdfUrl: "/Python.pdf"
    },
    {
      title: "Git Version Control Basics",
      category: "Git",
      description: "Learn Git fundamentals including repositories, commits, branches, merging, and collaboration using GitHub",
      date: "Jul 2024",
      color: "#3178c6",
      pdfUrl: "/Git Notes.pdf"
    },
    {
      title: "SQL Database Fundamentals",
      category: "SQL",
      description: "Learn SQL queries used for managing relational databases including SELECT, JOIN, filtering data, indexing, and optimization",
      date: "Jun 2024",
      color: "#2496ed",
      pdfUrl: "/SQL Notes.pdf"
    },
    {
      title: "JavaScript ES6+ Features",
      category: "JavaScript",
      description: "Comprehensive guide to modern JavaScript features including arrow functions, destructuring, promises, modules, and async/await",
      date: "Jun 2024",
      color: "#2496ed",
      pdfUrl: "/JavaScript.pdf"
    }
  ];

  const categories = ["all", "JavaScript", "React", "Java", "DSA", "CSS", "Python", "Git"];
  const filteredNotes = selectedCategory === "all" 
    ? notes 
    : notes.filter(note => note.category === selectedCategory);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #fce4ec 0%, #e0f2f1 100%)" }}>
      {/* Navigation */}
      <nav style={{
        padding: "1.5rem 5%",
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Link to="/" style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#222",
            textDecoration: "none"
          }}>
           
          </Link>
          
          <Link to="/" style={{
            padding: "10px 25px",
            background: "#4a90e2",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "0.95rem",
            transition: "all 0.3s"
          }}>
            ← Back to Portfolio
          </Link>
        </div>
      </nav>

      {/* Notes Content */}
      <section ref={ref} style={{ padding: "80px 5%", color: "#333" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <h1 style={{
              fontSize: "3.5rem",
              fontWeight: "700",
              color: "#222",
              marginBottom: "1rem"
            }}>
              Learning Notes
            </h1>
            <div style={{
              width: "80px",
              height: "4px",
              background: "#4a90e2",
              margin: "0 auto 1.5rem",
              borderRadius: "2px"
            }} />
            <p style={{
              color: "#666",
              fontSize: "1.2rem",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.8"
            }}>
              My personal notes and learnings from various technologies and concepts. 
              A collection of insights, tips, and best practices I've gathered along my development journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "3rem",
              flexWrap: "wrap"
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "12px 25px",
                  background: selectedCategory === cat ? "#4a90e2" : "rgba(255, 255, 255, 0.8)",
                  color: selectedCategory === cat ? "#fff" : "#666",
                  border: `2px solid ${selectedCategory === cat ? "#4a90e2" : "#ddd"}`,
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== cat) {
                    e.target.style.borderColor = "#4a90e2";
                    e.target.style.color = "#4a90e2";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== cat) {
                    e.target.style.borderColor = "#ddd";
                    e.target.style.color = "#666";
                  }
                }}
              >
                {cat} {selectedCategory === cat && `(${cat === "all" ? notes.length : notes.filter(n => n.category === cat).length})`}
              </button>
            ))}
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "2rem"
          }}>
            {filteredNotes.map((note, index) => (
              <NoteCard 
                key={index} 
                note={note} 
                index={index} 
                inView={inView} 
                onReadMore={() => setSelectedNote(note)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PDF Modal */}
      {selectedNote && (
        <PDFModal note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
    </div>
  );
}

function NoteCard({ note, index, inView, onReadMore }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "20px",
        padding: "2.5rem",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "all 0.3s",
        borderLeft: `5px solid ${note.color}`,
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "100px",
        height: "100px",
        background: `${note.color}15`,
        borderRadius: "50%",
        transform: "translate(30px, -30px)"
      }} />
      
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem"
      }}>
        <span style={{
          padding: "8px 20px",
          background: `${note.color}20`,
          color: note.color,
          borderRadius: "25px",
          fontSize: "0.85rem",
          fontWeight: "700"
        }}>
          {note.category}
        </span>
        <span style={{ color: "#999", fontSize: "0.9rem", fontWeight: "500" }}>
          {note.date}
        </span>
      </div>
      
      <h3 style={{
        fontSize: "1.5rem",
        fontWeight: "700",
        color: "#222",
        marginBottom: "1rem",
        lineHeight: "1.3"
      }}>
        {note.title}
      </h3>
      
      <p style={{
        color: "#666",
        lineHeight: "1.7",
        marginBottom: "1.5rem",
        fontSize: "1rem"
      }}>
        {note.description}
      </p>
      
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "1.5rem",
        borderTop: "1px solid #eee"
      }}>
        <span style={{ 
          color: "#999", 
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          📖 {note.readTime}
        </span>
        <button
          onClick={onReadMore}
          style={{
            background: "none",
            border: "none",
            color: note.color,
            fontWeight: "700",
            fontSize: "0.95rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => e.target.style.transform = "translateX(5px)"}
          onMouseLeave={(e) => e.target.style.transform = "translateX(0)"}
        >
          Read More →
        </button>
      </div>
    </motion.div>
  );
}

function PDFModal({ note, onClose }) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = () => {
    setDownloading(true);
    setProgress(0);

    // Simulate download progress
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

    // Actual download
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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "2rem"
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "25px",
          padding: "3rem",
          maxWidth: "600px",
          width: "100%",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            background: "none",
            border: "none",
            fontSize: "2rem",
            cursor: "pointer",
            color: "#666",
            transition: "color 0.3s"
          }}
          onMouseEnter={(e) => e.target.style.color = "#333"}
          onMouseLeave={(e) => e.target.style.color = "#666"}
        >
          ✕
        </button>

        <div style={{
          width: "80px",
          height: "80px",
          background: note.color,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 2rem",
          fontSize: "2rem"
        }}>
          📄
        </div>

        <h2 style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#222",
          marginBottom: "1rem",
          textAlign: "center"
        }}>
          {note.title}
        </h2>

        <div style={{
          textAlign: "center",
          marginBottom: "1rem"
        }}>
          <span style={{
            padding: "8px 20px",
            background: `${note.color}20`,
            color: note.color,
            borderRadius: "25px",
            fontSize: "0.9rem",
            fontWeight: "600"
          }}>
            {note.category}
          </span>
        </div>

        <p style={{
          color: "#666",
          lineHeight: "1.8",
          marginBottom: "2rem",
          textAlign: "center"
        }}>
          {note.description}
        </p>

        <div style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center"
        }}>
          <button
            onClick={handleViewPDF}
            style={{
              padding: "15px 30px",
              background: note.color,
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "1rem",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            👁️ View PDF
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            style={{
              padding: "15px 30px",
              background: downloading ? "#666" : "transparent",
              color: downloading ? "white" : note.color,
              border: `2px solid ${note.color}`,
              borderRadius: "12px",
              cursor: downloading ? "not-allowed" : "pointer",
              fontWeight: "700",
              fontSize: "1rem",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {downloading && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  background: note.color,
                  zIndex: 0
                }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>
              {downloading ? `📥 ${progress}%` : "📥 Download"}
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}