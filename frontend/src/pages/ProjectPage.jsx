import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { GithubIcon } from "../components/SvgIcons";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Stock Market Recommendation System",
    description: "Developed a web-based platform that analyzed stock market data to recommend investment opportunities.",
    longDescription: "A comprehensive stock market analysis platform that leverages historical data and technical indicators to generate investment recommendations. The system processes real-time market data and provides actionable insights for investors.",
    image: "Stock.png",
    tech: ["HTML", "CSS", "PHP", "PYTHON", "SQL"],
    category: "FULLSTACK",
    link: "#",
    github: "#",
    features: ["Stock data analysis", "Investment recommendations", "Real-time market tracking", "Historical data visualization"]
  },
  {
    id: 2,
    title: "AGRICARE App",
    description: "AgriCare is a digital platform that helps farmers easily book services, make secure payments, and track providers online.",
    longDescription: "A mobile-first platform connecting farmers with agricultural service providers. AgriCare simplifies the process of booking farming services, processing payments, and tracking service delivery through an intuitive interface.",
    image: "Agri.png",
    tech: ["Flutter Framework", "Firebase", "Google Maps and Weather API"],
    category: "mobile",
    link: "https://agricare-c9542.web.app/",
    github: "https://github.com/Vinayak123V/AGRICARE-WEBSITE",
    features: ["Service booking system", "Secure payment processing", "Provider tracking", "Weather integration"]
  },
  {
    id: 3,
    title: "VH Tour and Travels",
    description: "VH Tour and Travel is a responsive frontend website for displaying travel packages and services.",
    longDescription: "A visually engaging travel website showcasing tour packages, destinations, and travel services with a focus on responsive design and smooth user experience across all devices.",
    image: "/VH.webp",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "fullstack",
    link: "https://vhtourandtravel.netlify.app/",
    github: "https://github.com/Vinayak123V/VH-TOUR-TRAVEL",
    features: ["Travel package showcase", "Responsive design", "Interactive UI", "Destination gallery"]
  },
  {
    id: 4,
    title: "Student Result Management System",
    description: "A system for managing student results and grades with reporting capabilities",
    longDescription: "An efficient system for educational institutions to manage student academic records, calculate grades, generate report cards, and track academic performance over time.",
    image: "Student.png",
    tech: ["HTML", "PHP"],
    category: "fullstack",
    link: "#",
    github: "#",
    features: ["Grade management", "Report generation", "Student record tracking", "Performance analytics"]
  },
  {
    id: 5,
    title: "RCL BMS APP",
    description: "Battery Management System data visualization via BLE Bluetooth. Built with React + TypeScript + Tailwind CSS + Recharts + Zustand, Electron desktop shell, and Express + Socket.IO + PostgreSQL backend.",
    longDescription: "A cross-platform Battery Management System application that connects to BMS devices via BLE Bluetooth to monitor and visualize battery data in real-time. Features interactive charts, data logging, and remote monitoring capabilities.",
    image: "rclbms.png",
    tech: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Zustand", "Electron", "BLE", "Express", "Socket.IO", "PostgreSQL"],
    category: "fullstack",
    link: "https://rclpower.netlify.app/",
    github: "https://github.com/Vinayak123V/RCL-Power",
    features: ["BLE Bluetooth connectivity", "Real-time BMS data visualization", "Interactive Recharts dashboards", "Electron desktop shell", "Express + Socket.IO backend", "PostgreSQL data persistence"]
  },
  {
    id: 6,
    title: "Attendance APP",
    description: "Mobile attendance tracking application with real-time location verification using Google Maps API and Supabase backend for data persistence and authentication.",
    longDescription: "A mobile attendance tracking solution that uses GPS location verification to ensure accurate attendance logging. Built with Flutter for cross-platform compatibility, Supabase for authentication and data storage, and Google Maps API for location services.",
    image: "att app.jpeg",
    tech: ["Flutter", "Supabase", "Google Maps API"],
    category: "mobile",
    link: "https://attendifyhub.netlify.app/",
    github: "https://github.com/Vinayak123V/Attendance-App",
    features: ["GPS location verification", "Real-time attendance tracking", "Supabase authentication", "Google Maps integration", "Cross-platform Flutter app"]
  },
  {
    id: 7,
    title: "PAC Portal",
    description: "A comprehensive portal application delivering centralized services.",
    longDescription: "An integrated portal designed to centralize various services and provide seamless access to users. Features include user authentication, robust data management, and an intuitive dashboard interface.",
    image: "PAC Portal.png",
    tech: ["React", "Node.js", "Express"],
    category: "fullstack",
    link: "https://pacportal.netlify.app/",
    github: "https://github.com/Vinayak123V/pac-portal",
    features: ["Centralized dashboard", "User authentication", "Service integration", "Responsive design"]
  },
  {
    id: 8,
    title: "Free Education Hub",
    description: "An open platform providing free educational resources and learning materials.",
    longDescription: "A platform dedicated to democratizing education by providing open access to learning resources, courses, and interactive materials for students worldwide.",
    image: "educationhub.png",
    tech: ["React", "CSS", "Firebase"],
    category: "fullstack",
    link: "https://freeeducationhub.netlify.app/",
    github: "https://github.com/Vinayak123V/Free-Education-Hub",
    features: ["Resource catalog", "Interactive learning", "Open access", "Progress tracking"]
  }
];

export default function ProjectPage() {
  const { id } = useParams();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const project = projects.find(p => p.id === Number(id));

  if (!project) {
    return (
      <div style={{ padding: "100px 5%", textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "var(--text-primary)" }}>Project Not Found</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "1.2rem" }}>The project you're looking for doesn't exist.</p>
        <Link to="/" style={{ padding: "14px 35px", background: "var(--gradient-btn-primary)", color: "#fff", borderRadius: "12px", textDecoration: "none", fontWeight: "700" }}>← Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "var(--bg-nav)",
          backdropFilter: "blur(15px)",
          padding: "1rem 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 100,
          borderBottom: "1px solid var(--border-medium)"
        }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "var(--accent-primary)"
          }}
        >
          <Link to="/" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>
            Vinayak Hosur
          </Link>
        </motion.span>

        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Link to="/" style={{
            padding: "10px 25px",
            background: "var(--gradient-btn-primary)",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "0.95rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            ← Back to Portfolio
          </Link>
        </motion.span>
      </motion.nav>

      {/* Project Detail Content */}
      <section ref={ref} style={{ padding: "120px 5% 80px", color: "var(--text-primary)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Image */}
            <div style={{
              width: "100%",
              height: "400px",
              background: "var(--gradient-project-header)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8rem",
              overflow: "hidden",
              marginBottom: "3rem"
            }}>
              {project.image.match(/\.(png|webp|jpg|jpeg)$/i) ? (
                <img src={project.image.startsWith('/') ? project.image : '/' + project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "contain", background: "var(--bg-primary)" }} />
              ) : (
                <span style={{ fontSize: "8rem", lineHeight: 1 }}>{project.image}</span>
              )}
            </div>

            {/* Title & Category */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <h1 style={{ fontSize: "2.8rem", fontWeight: "700", color: "var(--text-primary)" }}>
                {project.title}
              </h1>
              <span style={{
                padding: "8px 20px",
                background: "var(--gradient-tag-bg)",
                color: "#fff",
                borderRadius: "25px",
                fontSize: "0.85rem",
                fontWeight: "700",
                textTransform: "uppercase"
              }}>
                {project.category}
              </span>
            </div>

            {/* Description */}
            <p style={{
              color: "var(--text-secondary)",
              fontSize: "1.2rem",
              lineHeight: "1.8",
              marginBottom: "3rem"
            }}>
              {project.longDescription}
            </p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{ marginBottom: "3rem" }}
            >
              <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem", color: "var(--text-card-title)" }}>
                Tech Stack
              </h3>
              <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                    whileHover={{ y: -3, scale: 1.08, borderColor: "var(--accent-secondary)" }}
                    style={{
                      padding: "8px 20px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-medium)",
                      borderRadius: "20px",
                      fontSize: "0.95rem",
                      color: "var(--accent-primary)",
                      fontWeight: "600"
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <div style={{ marginBottom: "3rem" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem", color: "var(--text-card-title)" }}>Key Features</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {project.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem 1.5rem",
                      background: "var(--bg-card)",
                      borderRadius: "12px",
                      border: "1px solid var(--border-light)"
                    }}
                  >
                    <span style={{ color: "var(--accent-secondary)", fontSize: "1.2rem" }}>▹</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ display: "flex", gap: "1.5rem", marginTop: "2rem" }}
            >
              <motion.a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  flex: 1,
                  padding: "16px 30px",
                  background: "var(--gradient-btn-primary)",
                  color: "#fff",
                  textAlign: "center",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "1.1rem"
                }}
              >
                View Live Project
              </motion.a>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03, background: "var(--gradient-btn-hover)", color: "#fff", borderColor: "transparent" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  flex: 1,
                  padding: "16px 30px",
                  background: "transparent",
                  color: "var(--accent-secondary)",
                  textAlign: "center",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  border: "2px solid var(--accent-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem"
                }}
              >
                <GithubIcon /> View Code
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
