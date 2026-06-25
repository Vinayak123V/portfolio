import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./SvgIcons";
import Tilt from "react-parallax-tilt";

const projects = [
  {
    id: 1,
    title: "Stock Market Recommendation System",
    description: "AI-driven stock market recommendation platform analyzing real-time data for precise investment opportunities.",
    image: "/Stock.png",
    tech: ["Python", "Machine Learning", "React", "Node.js"],
    category: "fullstack",
    year: "2024",
    link: "#",
    github: "#"
  },
  {
    id: 5,
    title: "BMS APP",
    description: "Next-gen Battery Management System visualization via BLE. Built with Electron, React, and Zustand for real-time monitoring.",
    image: "/rclbms.png",
    tech: ["React", "TypeScript", "Electron", "BLE"],
    category: "fullstack",
    year: "2025",
    link: "https://rclpower.netlify.app/",
    github: "https://github.com/Vinayak123V/RCL-Power"
  },
  {
    id: 2,
    title: "AgriCare Platform",
    description: "Digital ecosystem empowering farmers with service bookings, secure payments, and real-time tracking.",
    image: "/Agri.png",
    tech: ["Flutter", "Firebase", "Google APIs"],
    category: "mobile",
    year: "2024",
    link: "https://agricare-c9542.web.app/",
    github: "https://github.com/Vinayak123V/AGRICARE-WEBSITE"
  },
  {
    id: 6,
    title: "Smart Attendance",
    description: "Real-time location verified attendance tracking using advanced geofencing and Supabase backend.",
    image: "/att app.jpeg",
    tech: ["Flutter", "Supabase", "Maps API"],
    category: "mobile",
    year: "2025",
    link: "https://attendifyhub.netlify.app/",
    github: "https://github.com/Vinayak123V/Attendance-App"
  },
  {
    id: 3,
    title: "VH Tour and Travels",
    description: "Responsive frontend website for displaying travel packages and services.",
    image: "/VH.webp",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "fullstack",
    year: "2024",
    link: "https://vhtourandtravel.netlify.app/",
    github: "https://github.com/Vinayak123V/VH-TOUR-TRAVEL"
  },
  {
    id: 4,
    title: "Student Result Management System",
    description: "A comprehensive system for managing student results, grades, and generating reports.",
    image: "/Student.png",
    tech: ["HTML", "PHP", "SQL"],
    category: "fullstack",
    year: "2023",
    link: "#",
    github: "#"
  },
  {
    id: 7,
    title: "PAC Portal",
    description: "A comprehensive portal application delivering centralized services.",
    image: "/PAC Portal.png",
    tech: ["React", "Node.js", "Express"],
    category: "fullstack",
    year: "2025",
    link: "https://pacportal.netlify.app/",
    github: "https://github.com/Vinayak123V/pac-portal"
  },
  {
    id: 8,
    title: "Free Education Hub",
    description: "An open platform providing free educational resources and learning materials.",
    image: "/educationhub.png",
    tech: ["React", "CSS", "Firebase"],
    category: "fullstack",
    year: "2025",
    link: "https://freeeducationhub.netlify.app/",
    github: "https://github.com/Vinayak123V/Free-Education-Hub"
  }
];

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [filter, setFilter] = useState("all");

  const categories = ["all", "fullstack", "mobile"];
  const filteredProjects = filter === "all" ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" ref={ref} className="py-32 px-6 lg:px-20 relative min-h-screen">
      {/* Cinematic Background Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[500px] bg-accent-secondary/10 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-7xl font-display font-bold mb-6 tracking-tight">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">Works</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-secondary mx-auto rounded-full mb-8" />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 mb-16 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all duration-300 backdrop-blur-md outline-none ${
                filter === cat
                  ? "bg-accent text-foreground shadow-[0_0_20px_rgba(108,92,231,0.4)] border-transparent"
                  : "bg-white/5 text-text-muted border border-white/10 hover:border-accent/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} inView={inView} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, inView }) {
  // Ensure image path is correct, use fallback if not found
  const imgSrc = project.image.startsWith('/') ? project.image : `/${project.image}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
      className="group perspective-1000"
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareEnable={true}
        glareMaxOpacity={0.2}
        glareColor="#a29bfe"
        glarePosition="all"
        transitionSpeed={2000}
        scale={1.02}
        className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm h-[500px] flex flex-col shadow-2xl"
      >
        {/* Image Section */}
        <div className="relative h-[60%] overflow-hidden bg-[#0a0a0f]">
          <motion.img
            src={imgSrc}
            alt={project.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700 ease-in-out opacity-90 group-hover:opacity-100"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
          
          <div className="absolute top-6 right-6 flex gap-3">
            {project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-accent transition-colors border border-white/20">
                <GithubIcon style={{ fontSize: 18 }} />
              </a>
            )}
            {project.link !== "#" && (
              <a href={project.link} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-accent-secondary transition-colors border border-white/20">
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative h-[40%] p-8 flex flex-col justify-between bg-gradient-to-b from-background to-background/95">
          <div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-accent-secondary transition-colors">
              {project.title}
            </h3>
            <p className="text-text-muted text-sm line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tech.slice(0, 4).map((tech) => (
              <span key={tech} className="px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-full bg-accent/10 text-accent-secondary border border-accent/20">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}
