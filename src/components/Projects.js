import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Stock Market Recommendation System",
      description: "Developed a web-based platform that analyzed stock market data to recommend investment opportunities.",
      image: "Stock.png",
      tech: ["HTML", "CSS", "PHP", "PYTHON","SQL"],
      category: "FULLSTACK",
      link: "#",
      github: "#"
    },
    {
      id: 2,
      title: "AGRICARE App",
      description: "AgriCare is a digital platform that helps farmers easily book services, make secure payments, and track providers online.",
      image: "Agri.png",
      tech: ["Flutter Framework", "Firebase", "Google Maps and Weather API"],
      category: "mobile",
      link: "https://agricare-c9542.web.app/",
      github: "#"
    },
    {
  id: 3,
  title: "VH Tour and Travels",
  description: "VH Tour and Travel is a responsive frontend website for displaying travel packages and services.",
  image:  "/VH.webp",
  tech: ["HTML", "CSS", "JavaScript"],
  category: "fullstack",
  link: "#",
  github: "#"
},
    {
      id: 4,
      title: "Student Result Management System",
      description: "A system for managing student results and grades with reporting capabilities",
      image: "Student.png",
      tech: ["HTML", "PHP", ],
      category: "fullstack",
      link: "#",
      github: "#"
    },
    
    
  ];

  const categories = ["all", "web", "fullstack"];
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" ref={ref} style={{
      padding: "100px 5%",
      background: "linear-gradient(135deg, #F6E4E1, #EAF6EF, #E1F0FB )",
      color: "black"
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
  style={{ textAlign: "center", marginBottom: "4rem" }}
>
  <h2 style={{
    fontSize: "3rem",
    fontWeight: "700",
    color: "black",
    marginBottom: "1.5rem"
  }}>
    Featured Projects
  </h2>

  <p style={{
    color: "black",
    fontSize: "1.1rem",
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: "1.8"
  }}>
    Here are some of my recent projects that showcase my skills and experience
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
              onClick={() => setFilter(cat)}
              style={{
                padding: "10px 25px",
                background: filter === cat ? "#00ff88" : "transparent",
                color: filter === cat ? "#0a0a0a" : "#888",
                border: `2px solid ${filter === cat ? "#00ff88" : "#333"}`,
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: "600",
                textTransform: "uppercase",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                if (filter !== cat) {
                  e.target.style.borderColor = "#00ff88";
                  e.target.style.color = "#00ff88";
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== cat) {
                  e.target.style.borderColor = "#333";
                  e.target.style.color = "#888";
                }
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "2rem"
        }}>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              inView={inView}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}

function ProjectCard({ project, index, inView, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        background: "white",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        border: `2px solid ${isHovered ? "#00ff88" : "#222"}`,
        transition: "all 0.3s"
      }}
    >
      <div style={{
        height: "200px",
        background: "linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "5rem",
        position: "relative",
        overflow: "hidden"
      }}>
        {project.image.endsWith(".webp") || project.image.endsWith(".jpg") || project.image.endsWith(".png") ? (
  <img
    src={project.image}
    alt={project.title}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }}
  />
) : (
  project.image
)}
      </div>
      
      <div style={{ padding: "2rem" }}>
        <h3 style={{
          fontSize: "1.5rem",
          marginBottom: "1rem",
          color: "black"
        }}>
          {project.title}
        </h3>
        <p style={{
          color: "#888",
          marginBottom: "1.5rem",
          lineHeight: "1.6"
        }}>
          {project.description}
        </p>
        <div style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem"
        }}>
          {project.tech.map(tech => (
            <span key={tech} style={{
              padding: "5px 15px",
              background: "lightgray",
              border: "1px solid #333",
              borderRadius: "15px",
              fontSize: "0.85rem",
              color: "black"
            }}>
              {tech}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a
            href={project.link}
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              padding: "10px",
              background: "#00ff88",
              color: "#0a0a0a",
              textAlign: "center",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            View Live
          </a>
          <a
            href={project.github}
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              padding: "10px",
              background: "transparent",
              color: "#00ff88",
              textAlign: "center",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              border: "2px solid #00ff88",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#00ff88";
              e.target.style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#00ff88";
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
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
        background: "rgba(0, 0, 0, 0.9)",
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
          background: "#1a1a1a",
          borderRadius: "20px",
          padding: "3rem",
          maxWidth: "600px",
          width: "100%",
          position: "relative",
          border: "2px solid #00ff88",
          color: "#fff"
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
            color: "#888",
            transition: "color 0.3s"
          }}
          onMouseEnter={(e) => e.target.style.color = "#00ff88"}
          onMouseLeave={(e) => e.target.style.color = "#888"}
        >
          ✕
        </button>
        <div style={{
          fontSize: "5rem",
          marginBottom: "1.5rem",
          textAlign: "center"
        }}>
          {project.image}
        </div>
        <h2 style={{
          fontSize: "2rem",
          marginBottom: "1rem",
          color: "#00ff88"
        }}>
          {project.title}
        </h2>
        <p style={{
          marginBottom: "2rem",
          lineHeight: "1.8",
          color: "#aaa"
        }}>
          {project.description}
        </p>
        <div style={{ marginBottom: "2rem" }}>
          <strong style={{ color: "#fff" }}>Technologies:</strong>
          <div style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginTop: "1rem"
          }}>
            {project.tech.map(tech => (
              <span key={tech} style={{
                padding: "8px 20px",
                background: "#00ff88",
                color: "#0a0a0a",
                borderRadius: "20px",
                fontSize: "0.9rem",
                fontWeight: "600"
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a
            href={project.link}
            style={{
              flex: 1,
              padding: "15px",
              background: "#00ff88",
              color: "#0a0a0a",
              textAlign: "center",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "1rem"
            }}
          >
            View Live Project
          </a>
          <a
            href={project.github}
            style={{
              flex: 1,
              padding: "15px",
              background: "transparent",
              color: "#00ff88",
              textAlign: "center",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "1rem",
              border: "2px solid #00ff88"
            }}
          >
            View Code
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
